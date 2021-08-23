package app

import (
	"encoding/json"
	"log"
	"net/http"
	"react-redux-todo/backend/model"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func getTodosHandler(c *gin.Context) {
	list := model.Read()
	c.JSON(http.StatusOK, list)
}

func createTodoHandler(c *gin.Context) {
	err := c.Request.ParseForm()
	if err != nil {
		log.Println("error : createTodoHandler : ParseForm()", err)
	}

	text := c.PostForm("payload")
	log.Println("createTodoHandler: FormData : ", text)

	if model.Create(text) {
		c.JSON(http.StatusCreated, gin.H{"success": true})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"success": false})
	}
}

func doneTodoHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))
	if err != nil {
		log.Println("doneTodoHandler error : ", err)
	}

	if model.Update(id) {
		c.JSON(http.StatusCreated, gin.H{"success": true})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"success": false})
	}

}
func delTodoHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))
	if err != nil {
		log.Println("delTodoHandler error : ", err)
	}

	if model.Delete(id) {
		c.JSON(http.StatusCreated, gin.H{"success": true})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"success": false})
	}
}

//CORS 처리
func GinMiddleware(allowOrigin string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST,OPTIONS,GET,PUT,DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, X-CSRF-Token, Token, session, Origin, Host, Connection, Accept-Encoding, Accept-Language, X-Requested-With")
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Request.Header.Del("Origin")
		c.Next()
	}
}

// websocket
var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Failed to set websocket upgrader:", err)
		return
	}
	log.Println("Connected websocket")
	for {
		t, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		data := make(map[string]interface{})
		data["type"] = string(msg)
		doc, _ := json.Marshal(data)
		conn.WriteMessage(t, doc)
	}
}

func Run(addr string) {
	router := gin.Default()
	router.Use(GinMiddleware("http://localhost:3000"))
	model.New()

	todo := router.Group("/api")
	{
		todo.GET("/todos", getTodosHandler)
		todo.POST("/todos", createTodoHandler)
		todo.POST("todos/:id", doneTodoHandler)
		todo.DELETE("/todos/:id", delTodoHandler)
	}

	router.GET("/ws", func(c *gin.Context) {
		wsHandler(c.Writer, c.Request)
	})

	router.Run(addr)
}
