'use client';

import { useEffect, useState } from 'react';
import { getCharacter } from '../../../../lib/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ViewCharacterPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCharacter();
    }
  }, [id]);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      const data = await getCharacter(id);
      setCharacter(data);
    } catch (err) {
      setError('Falha ao carregar personagem: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando detalhes do personagem...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!character) return <p>Personagem não encontrado.</p>;

  return (
    <div className="character-detail-card">
      <Link href="/" passHref>
        <button className="back-button">
          <ArrowLeft size={16} /> Voltar para a lista
        </button>
      </Link>
      <h1>{character.name}</h1>
      {character.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={character.image_url}
          alt={character.name}
          className="character-image"
        />
      )}
      <p>
        <strong>Anime:</strong> {character.anime}
      </p>
      <p>
        <strong>Status:</strong> {character.status || 'vivo'}
      </p>  
      {character.description && (
        <p>
          <strong>Descrição:</strong> {character.description}
        </p>
      )}

      <style jsx>{`
        .character-detail-card {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 30px auto;
          text-align: center;
        }

        .character-detail-card h1 {
          color: #3498db;
          margin-bottom: 20px;
        }

        .character-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .character-detail-card p {
          font-size: 1.1em;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .character-detail-card strong {
          color: #555;
        }

        .back-button {
          margin-bottom: 20px;
          align-self: flex-start;
          background-color: #6c757d;
        }

        .back-button:hover {
          background-color: #5a6268;
        }
      `}</style>
    </div>
  );
}