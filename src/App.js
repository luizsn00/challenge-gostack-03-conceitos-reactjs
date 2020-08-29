import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        title: `Novo repo ${Date.now()}`
      });
      const repo = response.data;
      setRepositories([...repositories, repo]);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      const repos = repositories.filter(item => item.id !== id);
      setRepositories(repos);
    }catch(e) {
      console.log(e);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
