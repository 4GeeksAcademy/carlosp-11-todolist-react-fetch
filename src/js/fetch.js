
import React, { useState, useEffect } from "react";


export const TodoListNew = () => {
  const [ list, setList ] = useState([]);
  let base_url = "https://playground.4geeks.com/apis/fake";
  let user_name = "lgmm";

  const getTodos = async () => {
    const url = base_url + '/todos/user/' + user_name;
    const options = {
      methods: "GET",
      headers: {"Content-Type": "application/json"}
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json();
      console.log('data', data);
      // hacer algo para que lo q tiene data lo pueda ver afuera de la fx
    } else{
      console.log("error");
    }

  }

  useEffect(() => {
    getTodos();
  }, [])


return (
    <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
      {/* <h1 className="text-center text-primary">Todos, async await</h1> */}
      {/* <button type="button" className="btn btn-outline-primary btn-lg mb-3 me-3" 
          onClick={isActive ? deleteUser : createUser}>
        {isActive ? "Delete Todo List" : "Create Todo List"}
      </button> */}
      <div className="mb-3">
        <form > {/* onSubmit={addTask} */}
          <input className="form-control" placeholder=""></input>

  const getTodos = async () => {
    const url = base_url + '/todos/user/' + user_name;
    const options = {
      methods: "GET",
      headers: {"Content-Type": "application/json"}
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json();
      setList(data);
    } else {
      console.log('error:', response.status, response.statusText)
    }
  };
