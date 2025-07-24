'use client';

import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function Header() {
const { user, logout } = useAuth();

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href="/" style={logoStyle}>
          Protagonistarios
        </Link>
        {/* <div style={navLinksStyle}>
          <Link href="/characters/new" style={navLinkStyle}>
            Adicionar Novo Personagem
          </Link>
        </div> */}
        <div style={navLinksStyle}>
          {user ? (
            <>
              <button onClick={logout} style={logoutButtonStyle}>
                Sair
              </button>
            </>
          ) : (
            <Link href="/login" style={navLinkStyle}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

const headerStyle = {
  backgroundColor: '#333',
  padding: '15px 0',
  color: 'white',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
};

const navStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
};

const logoStyle = {
  fontSize: '1.8em',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'white',
};

const navLinksStyle = {
  display: 'flex',
  gap: '20px',
};

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.1em',
};

const logoutButtonStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1.1em',
};