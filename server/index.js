const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//Routes

// create a todo
 
app.post("/todos", async (req,res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        console.log(req.body)

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
})

// get all todos

app.get("/todos", async (req, res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message)
    }
} )

//get a todo

app.get("/todos/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todoId = $1", [id])
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
})

//update a todo

app.put("/todos/:id", async (req, res) =>{
    try {
        const{id} = req.params;
        const{description}=req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todoId = $2 RETURNING *", [description, id]
        );
        res.json("Todo Was Updated")
        console.log(res);
    
    } catch (err) {
        console.log(err.message)
    }
});

//delete a todo

app.delete("/todos/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todoId = $1",[id])
        res.json("Todo Was Deleted");
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(port, ()=>{
    console.log("Server is running on Port 5000");
})