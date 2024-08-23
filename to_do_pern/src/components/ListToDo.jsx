import React, { Fragment, useEffect, useState } from "react";
import EditToDo from "./EditToDo";

const ListToDo = () => {
    const [todos, setTodos] = useState([]);
    const getTodos = async ()=>{
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    }
    
    useEffect(()=>{
        getTodos();
    }, [])

    async function deleteTodo(id) {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}` ,{
                method: 'DELETE'
            });
            
            setTodos(todos.filter(todo => todo.todoid !== id));
        } catch (err) {
            console.log(err.message)
        }
    }

  return (
    <Fragment>
      <h2 className="text-center mt-3"> List of Todos</h2>
      <table className="table text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {todos.map(todo =>(
                     <tr key={todo.todoid}>
                        <td>{todo.description}</td>
                        <td><EditToDo todo={todo}/></td>
                        <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.todoid)} >Delete</button></td>
                     </tr>
                ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListToDo;
