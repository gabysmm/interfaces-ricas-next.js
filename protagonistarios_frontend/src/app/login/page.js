// src/app/login/page.js
'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth(); 
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Entrar</button>
      </form>

      <style jsx>{`
        .login-container {
          background-color: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: 50px auto;
          text-align: center;
        }

        .login-container h1 {
          color: #3498db;
          margin-bottom: 30px;
        }

        .login-form .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .login-form label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #555;
        }

        .login-form input {
          width: calc(100% - 20px);
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1em;
        }

        .login-form button {
          width: 100%;
          padding: 12px;
          font-size: 1.1em;
          background-color: #28a745; /* Cor verde para o botão de login */
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-form button:hover {
          background-color: #218838;
        }

        .error-message {
          color: #e74c3c;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
}