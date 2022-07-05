function Main() {

    function handleSubmit(e){
        e.preventDefault()
        console.log(e);

        let inputValue = document.querySelector('input').value

        console.log(inputValue);
    }
    return (

        <div>
            <h2>Lista de tarefas</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Tarefa:</label>
                <input type="text" placeholder="Digite aqui sua tarefa" />
                <input type="submit" value="Adicionar" />
            </form>
            <div className="res"></div>
        </div>
    );
}

export default Main;