package app

import (
	"log"
	"net/http"
	"react-redux-todo/backend/model"
	"strconv"

	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"
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

func Run(addr string) {
	router := gin.Default()
	router.Use(GinMiddleware("http://localhost:3000"))
	model.New()

	socketServer := socketio.NewServer(nil)

	todo := router.Group("/api")
	{
		todo.GET("/todos", getTodosHandler)
		todo.POST("/todos", createTodoHandler)
		todo.POST("todos/:id", doneTodoHandler)
		todo.DELETE("/todos/:id", delTodoHandler)
	}

	//socket.Io
	socketServer.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		log.Println("Connected:", s.ID())
		return nil
	})
	go socketServer.Serve()
	defer socketServer.Close()

	router.GET("/socket.io/", gin.WrapH(socketServer))

	router.Run(addr)
}
