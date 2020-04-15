const express = require('express');
const server = express();

const projects = [];

server.use(express.json());

/** Verifica se o projeto existe pelo id */
function checkIfProjectExists(req, res, next) {
    const { id } = req.params;

    const project = projects.find(itens => itens.id === id);

    if(!project) {
        return res.status(400).json({ error: 'Project does not exists'});
    }
    
    return next();
}

/** Conta quantas requisições foram feitas */
function logRequests (req, res, next) {
    console.count('requisições feitas');
    return next();
}

server.use(logRequests);

//cadastra novo projeto
server.post('/projects/', (req, res) => {
    const { id, title } = req.body;

    const projectInfo = {
        id,
        title,
        tasks : []
    };

    projects.push(projectInfo);

    return res.json(projects);
});

// retorna a lista de projetos
server.get('/projects', (req, res) => {
    return res.json(projects);
});

// alterar o titulo do projeto a partir do seu id
server.put('/projects/:id', checkIfProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects.filter(itens => itens.id === id)[0].title = title;

    return res.json(projects);
});

//deletar um projeto da lista
server.delete('/projects/:id', checkIfProjectExists, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(item => item.id == id);
    projects.splice(projectIndex, 1);

    return res.json(projects);
});

//cadastrar uma task em um projeto
server.post('/projects/:id/tasks', checkIfProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);
    project.tasks.push(title);

    return res.json(project);
});

server.listen(3000);
