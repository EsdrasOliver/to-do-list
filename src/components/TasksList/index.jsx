import { useState, useEffect } from "react"
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs"

import Loading from "../Loading"

import "./index.css"

const API = 'http://localhost:5500'

function TasksList() {

    const [task, setTask] = useState("")
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)

    const handleAddTask = async (e) => {
        e.preventDefault()

        const todo = {
            id: Math.random(),
            task,
            done: false
        }

        await fetch(API + "/todos", {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        setTodos((prevState) => [...prevState, todo])
        setTask("")

        await fetch(API + "/todos")
            .then(res => res.json())
            .then(data => {
                const tasks = data
                const task = JSON.stringify(tasks.map(t => t.task))
                localStorage.setItem("todo", task)
                console.log(todo);
            })
            .catch(e => console.log(e))
    }

    const handleEdit = async (todo) => {

        todo.done = !todo.done

        const data = await fetch(API + "/todos/" + todo.id, {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json"
            }
        })

        setTodos((prevState) => prevState.map((todo) => (todo.id === data.id ? (todo = data) : (todo)) ))
    }

    const handleDelete = async (id) => {
        await fetch(API + "/todos/" + id, {
            method: "DELETE"
        })

        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))

        localStorage.removeItem("todo")
    }

    useEffect(() => {
        setLoading(true)

        const load = async () => {
            const res = await fetch(API + "/todos")
                .then((res) => res.json())
                .then((data) => data)
                .catch((e) => console.log(e))

            setLoading(false)
            setTodos(res)
        }

        load()

    }, [])

    if(loading) {
        return <Loading />
    }

    return (
        <div className="container-todo">
            <h2>Insira suas tarefas</h2>
            <form onSubmit={handleAddTask}>
                <label htmlFor="task">O que você vai fazer:</label>
                <input 
                    type="text"
                    className="add-task-input" 
                    placeholder="Digite aqui sua tarefa" 
                    required  
                    value={task || ""}
                    onChange={(e) => setTask(e.target.value)}
                />
                <input type="submit" value="Adicionar" />
            </form>
            <div className="list-todo">
                <h3>Lista de tarefas</h3>
                {todos.length === 0 && <p>Não há tarefas</p>}
                {todos.map((todo) => (
                    <div className="todo" key={todo.id}>
                        <h4 className={todo.done ? "todo-done" : ""}>
                            {todo.task}
                        </h4>
                        <div className="actions">
                            <span onClick={() => handleEdit(todo)}>
                                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
                            </span>
                            <BsTrash onClick={() => handleDelete(todo.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TasksList;