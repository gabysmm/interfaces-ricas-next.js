import Link from 'next/link';

export default function Header() {
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