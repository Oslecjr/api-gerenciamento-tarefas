// src/components/UserList.js
import React, { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/usuarios')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Erro ao buscar usuários:', error));
    }, []);

    return (
        <div>
            <h2>Lista de Usuários</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.nome} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;