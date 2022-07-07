import { useState, useEffect } from "react"
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs"

const API = 'http://localhost:5500'

function Main() {

    const [task, setTask] = useState("")
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
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
        return <p>carregando...</p>
    }

    return (

        <div>
            <h2>Lista de tarefas</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="task">Tarefa:</label>
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
                <h2>Lista de tarefas</h2>
                {todos.length === 0 && <p>Não há tarefas</p>}
                {todos.map(todo => (
                    <div className="todo" key={todo.id}>
                        <h3 className={todo.done ? "todo-done" : ""}>{todo.task}</h3>
                        <div className="actions">
                            <span>
                                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Main;