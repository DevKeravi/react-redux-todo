package model

import (
	"log"
	"time"
)

type TodoData struct {
	Id        int       `json:"id"`
	Msg       string    `json:"message"`
	IsDone    bool      `json:"isdone"`
	CreatedAt time.Time `json:"createdat"`
}

// key : id
var TodoList map[int]TodoData

func logSize() {
	log.Println(len(TodoList))
}

//CRUD
func Create(value string) bool {
	index := len(TodoList)
	todo := TodoData{
		Id:        index,
		Msg:       value,
		IsDone:    false,
		CreatedAt: time.Now(),
	}
	TodoList[index] = todo
	logSize()
	return true
}
func Read() []TodoData {
	if len(TodoList) == 0 {
		return []TodoData{}
	} else {
		list := []TodoData{}
		for i, v := range TodoList {
			list[i] = v
		}
		return list
	}
}
func Update(id int) bool {
	if todo, ok := TodoList[id]; ok {
		todo.IsDone = !todo.IsDone
		return true
	}
	return false
}
func Delete(id int) bool {
	if _, ok := TodoList[id]; ok {
		delete(TodoList, id)
		logSize()
		return true
	}
	return false
}

func New() {
	TodoList = make(map[int]TodoData)
}
