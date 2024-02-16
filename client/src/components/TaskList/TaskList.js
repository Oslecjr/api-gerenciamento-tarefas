// src/components/TaskList.js
import React, { useState, useEffect } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/api/tarefas')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Erro ao buscar tarefas:', error));
    }, []);

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.titulo} - {task.descricao} - Prioridade: {task.prioridade} - 
                        {task.completa ? ' Completa' : ' Incompleta'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
