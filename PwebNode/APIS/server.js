const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let tarefas = [];

app.get('/tarefas', (req,res) =>{
    res.json(tarefas);
});


app.post('/tarefas', (req,res) =>{
    const {tarefa} = req.body;
    tarefas.push(tarefa);
    res.status(201).json({messsage : 'Tarefa adicionada com sucesso'});
});

app.listen(port, ()=>{
    console.log("servidor ativo")
});




