import React, {Fragment, useState} from "react";

const InputToDo = () =>{

    const [description, setDescription] = useState("")

    const onSubmitForm = async e =>{
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers : {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location ="/";
        } catch (err) {
            console.log(err)
        }
    }
    return (
    <Fragment>
        <h1 className="text-center mt-5">Todo List</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input type="text" className="form-control" placeholder="Add a To Do!" onChange={e=>{
                setDescription(e.target.value)
            }}></input>
            {/* <h2>{description}</h2> */}
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>)
}

export default InputToDo;