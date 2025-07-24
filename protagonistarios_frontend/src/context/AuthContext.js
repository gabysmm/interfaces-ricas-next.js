'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_BASE_URL = 'http://localhost:8000/api'; 
  
  useEffect(() => {
    // Ao carregar, tenta obter o token do localStorage
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user'); // Se você armazenar dados do usuário também
    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Falha na autenticação');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh); // Guarde o refresh token também
      // Decodifique o token para obter dados do usuário (opcional, ou pegue de outra API)
      // Para fins de exemplo, vamos usar um objeto dummy, mas você pode decodificar o JWT
      const decodedUser = { username: username, id: 1 }; // Substitua por decodificação real
      localStorage.setItem('user', JSON.stringify(decodedUser));

      setAccessToken(data.access);
      setUser(decodedUser);
      router.push('/'); // Redireciona para a página inicial após login
      return true;
    } catch (error) {
      console.error('Erro de login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setAccessToken(null);
    setUser(null);
    router.push('/login'); // Redireciona para a página de login
  };

  // Função para refrescar o token (avançado, mas importante para tokens de curta duração)
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('Refresh token não encontrado.');

      const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Falha ao refrescar token');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      setAccessToken(data.access);
      return data.access;
    } catch (error) {
      console.error('Erro ao refrescar token:', error);
      logout(); // Força logout se o refresh token falhar
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}