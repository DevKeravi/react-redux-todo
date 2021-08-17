package app

import (
	"log"
	"net/http"
	"react-redux-todo/backend/model"
	"strconv"

	"github.com/gin-gonic/gin"
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
	router.Run(addr)
}
