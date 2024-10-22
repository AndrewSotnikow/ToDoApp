type ToDo = {
    title: string // li, input, textarea
    id: string
    done: boolean // checkbox
    createdAt: Date
}

//helpers button
type ToDoStore = {
    todos: ToDo[] // ul
    filter: Partial<ToDo>
}

type ToDoDeletedStore = ToDoStore

//li
type ToDoListItem = ToDo

type ToDoList = ToDo[]

//button create, delete, edit, change

type CreateToDoButton = {
    title: ToDo['title']
}

type DeleteToDoButton = {
    id: ToDo['id']
}

type EditToDoButton = {
    toDoData: Partial<ToDo>
    id: ToDo['id']
}

type IsToDoDone = {
    id: ToDo['id']
    done: Partial<ToDo>
}

// TODO done else


