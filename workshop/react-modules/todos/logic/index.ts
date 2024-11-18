import { ToDo, ToDos } from './types'


class TodosLogic {

    isTodoAlreadyExist(todos: ToDos, title: ToDo['title'] ) {
        return todos.some(todo => todo.title === title)
    }

    addTodo(todos: ToDos, todo: ToDo): ToDo[] {
        const isTodoExist = this.isTodoAlreadyExist([], 'name')
        return isTodoExist ? [...todos, todo] : todos
    }

    createTodo(title: ToDo['title']): ToDo {
        return {
            title,
            id: Math.random().toString(),
            done: false,
            createdAt: new Date()
        }
    }

    deleteToDo(todos: ToDos, id: ToDo['id'] ): ToDo[] {
        return todos.filter(item => item.id !== id)
    }

    setToDoStatus(todos: ToDos, id: ToDo['id'], todoStatus: ToDo['done']){
        return todos.map(item => {
            if(item.id === id) return item.done === todoStatus
            return item
        })
    }

}
