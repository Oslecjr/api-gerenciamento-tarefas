// client/src/App.js
import React from 'react';
import TaskList from './components/TaskList/TaskList';
import UserList from './components/UserList/UserList';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Gerenciador de Tarefas e Usuários</h1>
            </header>
            <main>
                <UserList />
                <TaskList />
                
            </main>
        </div>
    );
}

export default App;
