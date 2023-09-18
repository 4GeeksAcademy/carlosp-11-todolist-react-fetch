//Importamos React y Hooks.
import React, { useState, useEffect } from "react";

//Construimos el componente
const TodoList = () => {

    //Definimos las funciones y variables
    let base_url = "https://playground.4geeks.com/apis/fake";
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [userName, setUserName] = useState("h1z2");

    //Funcion para añadir una nueva tarea al array con las tareas
    const addTask = (event) => {
        event.preventDefault();
        if (task.trim() != '') {
            let newTask = {
                label: task,
                done: false
                //id: taskList.length + 1
            }
            let newList = [...taskList, newTask]
            console.log("imprimo tasklist y newlist ", taskList, newList);
            updateTodos(newList);
            setTaskList(newList);
            setTask('');
        }
    }

    //Funcion para obtener todas las tareas de la lista de la cuenta activa
    const getTodos = async () => {
        const url = base_url + '/todos/user/' + userName;
        const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }
        console.log("imprimo la lista en getTodos ", taskList);
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            console.log('data', data);
            setTaskList(data);
        } else {
            console.log("error", response.status, response.statusText);
        }
    }

    //Funcion para añadir una nueva tarea a la lista de la cuenta activa
    const updateTodos = async (updatedList) => {
        const url = base_url + '/todos/user/' + userName;
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedList)
        }
        console.log("imprimo options y updatedList ", options, updatedList);

        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            console.log('data', data);
        } else {
            console.log("error", response.status, response.statusText);
        }
    }

    //Funcion para inicializar array con las tareas
    const deleteTask = () => {
        deleteAccount();
        console.log("imprimo tras borrrado", taskList);
        setTask('');
        setTaskList([]);
    }

    //Funcion para borrar la cuenta activa
    const deleteAccount = async () => {
        const url = base_url + '/todos/user/' + userName;
        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        }
        setUserName('');
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            console.log('data', data);
        } else {
            console.log("error", response.status, response.statusText);
        }
    }

    //Funcion para crear una nueva cuenta o ingresar a una cuenta creada
    const createAccount = async (event) => {
        event.preventDefault();
        
            console.log(userName);
        const url = base_url + '/todos/user/' + userName;
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        }
        getTodos();
        
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            console.log('data', data);
        } else {
            console.log("error", response.status, response.statusText);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);


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
                        </li>
                    ))}
                </ul>

                {/*Footer que indica cuántas tareas quedan pendientes por realizar*/}
                <div className="card-footer fs-6">
                    {taskList.length == 0 ? 'There are no tasks left to do. Add a new one' : taskList.length + ' tasks left to do'}
                </div>
            </div>


            {/* Botones de iniciar sesión, crear o eliminar cuenta */}
            <div className="text-center py-5 d-flex justify-content-evenly">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#accountModal">
                    Sign in / Create account
                </button>
                <button type="button" className="btn btn-danger" onClick={deleteTask} >
                    Delete Account
                </button>
            </div> 
           
           {/*Modal activado por boton de inicio de sesion/crear cuenta*/}
           <div class="modal fade" id="accountModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="accountModalLabel">Have an account?</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={createAccount}>
                            <div class="modal-body">
                                <input type="text"
                                    onChange={(e) => { setUserName(e.target.value) }}
                                   
                                    className="form-control fw-lighter "
                                    placeholder="Enter your name here"
                                />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default TodoList;

