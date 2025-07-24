'use client';

import { useState, useEffect } from 'react';
import CharacterTable from '../components/CharacterTable';
import { getCharacters, deleteCharacter } from '../lib/api';
import Link from 'next/link';

export default function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const data = await getCharacters();
      setCharacters(data);
    } catch (err) {
      setError('Falha ao carregar personagens: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir este personagem?')) {
      try {
        await deleteCharacter(id);
        alert('Personagem excluído com sucesso!');
        fetchCharacters(); // Recarrega a lista após a exclusão
      } catch (err) {
        alert('Erro ao excluir personagem: ' + err.message);
        console.error(err);
      }
    }
  };

  if (loading) return <p>Carregando personagens...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (loading) return <p>Carregando personagens...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (characters.length === 0) {
    return (
      <div style={{
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
          textAlign: 'center',
          gap: '20px'
      }}>
        <p className='new-button'> Nenhum personagem encontrado. Adicione um!</p>
        <Link href="/characters/new" passHref>
          <button className="add-character-button">Adicionar Novo Personagem</button>
        </Link>
      </div>
    );
  }


  return (
    <div>
      <h1>Lista de Personagens de Anime</h1>
      <CharacterTable characters={characters} onDelete={handleDelete} />
        <Link href="/characters/new" passHref>
          <button className="add-character-button">Adicionar Novo Personagem</button>
        </Link>

      <style jsx>{`
        .add-character-button {
          margin-top: 20px;
          padding: 10px 20px;
      }
      } `}</style>
    </div>
  );
}

