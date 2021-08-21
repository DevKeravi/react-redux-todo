package app

import (
	"log"
	"net/http"
	"react-redux-todo/backend/model"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func getTodosHandler(c *gin.Context) {
	list := model.Read()
	log.Println("getTodosHandler: list :", list)
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

// websocket
var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Failed to set websocket upgrade: %+v", err)
		return
	}
	for {
		t, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		conn.WriteMessage(t, msg)
	}
}

func Run(addr string) {
	router := gin.Default()
	model.New()

	todo := router.Group("/api")
	{
		todo.GET("/todos", getTodosHandler)
		todo.POST("/todos", createTodoHandler)
		todo.POST("todos/:id", doneTodoHandler)
		todo.DELETE("/todos/:id", delTodoHandler)
	}

	router.GET("/socket.io/", func(c *gin.Context) {
		wsHandler(c.Writer, c.Request)
	})
	router.Run(addr)
}
