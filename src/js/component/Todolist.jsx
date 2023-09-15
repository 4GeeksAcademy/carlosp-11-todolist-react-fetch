//Importamos React y Hooks.
import React, { useState, useEffect } from "react";

//Construimos el componente
const TodoList = () => {
    //Definimos las funciones y variables
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);


    const addTask = (event) => {
        event.preventDefault();
       if (task.trim() != ''){
            let newTask = {label: task, 
                           done: false, 
                           id: taskList.length + 1}
            let newList = [...taskList, newTask] 
            updateTodos(newList);
            setTaskList(newList);
            setTask('');
        }
    }
    
    const deleteTask = (pendingTask) => {
        setTaskList(taskList.filter((item, id) => pendingTask !== item));
    }

    let base_url = "https://playground.4geeks.com/apis/fake";
    let user_name = "carlosp-11";

    const getTodos = async () => {
        const url = base_url + '/todos/user/' + user_name;
        const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            console.log('data', data);
            // hacer algo para que lo q tiene data lo pueda ver afuera de la fx
            setTaskList(data);
        } else {
            console.log("error");
        }

    }

    const updateTodos = async (updateList) => {
        const url = base_url + '/todos/user/' + user_name;
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateList)
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            // hacer algo para que lo q tiene data lo pueda ver afuera de la fx
            // setTaskList(data); esto es de la copia del codigo anterion, aquí no hace falta
        } else {
            console.log("error");
        }

    }


    useEffect(() => {
        getTodos();
    }, [])



    //Diseñamos el elemento HTML a devolver
    return (
        <div className="container p-5 fw-lighter ">
            {/*Titulo*/}
            <div className="header text-center">
                <h1 className="fw-lighter big-title"> To do's  </h1>
            </div>

            {/*Lista de tareas por hacer*/}
            <div className="card mx-5 fs-4">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        {/*Campo fijo dentro de la lista para insertar nueva tarea*/}
                        <form onSubmit={addTask}>
                            <input type="text"
                                onChange={(e) => { setTask(e.target.value) }}
                                value={task}
                                className="form-control fw-lighter fs-4 ps-4"
                                placeholder="Write here your task"
                            />
                        </form>
                    </li>

                    {/*Función para renderizar todos los elementos de la lista*/}
                    {taskList.map((item, index) => (
                        <li className="list-group-item text-body d-flex justify-content-between ps-5 box">
                            {item.label}
                            {/*
                            <span className="">
                                <i className="fas fa-trash-alt ms-5" onClick={() => deleteTask(item)}></i>
                            </span>
                            */}
                        </li>
                    ))}
                </ul>

                {/*Footer que indica cuántas tareas quedan pendientes por realizar*/}
                <div className="card-footer fs-6">
                    {taskList.length == 0 ? 'There are no tasks left to do. Add a new one' : taskList.length + ' tasks left to do'}
                </div>
            </div>
        </div >
    );
}

export default TodoList;