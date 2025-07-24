'use client';

import { useEffect, useState } from 'react';
import { getCharacter, updateCharacter } from '../../../../lib/api';
import { useParams, useRouter } from 'next/navigation';
import CharacterForm from '../../../../components/CharacterForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditCharacterPage() {
  const { id } = useParams();
  const router = useRouter();
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
      setError('Falha ao carregar personagem para edição: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      await updateCharacter(id, data);
      alert('Personagem atualizado com sucesso!');
      router.push('/');
    } catch (error) {
      alert('Erro ao atualizar personagem: ' + error.message);
      console.error(error);
    }
  };

  if (loading) return <p>Carregando personagem para edição...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!character) return <p>Personagem não encontrado.</p>;

  return (
    <div className="form-page-container">
      <Link href="/" passHref>
        <button className="back-button">
          <ArrowLeft size={16} /> Voltar para a lista
        </button>
      </Link>
      <h1>Editar Personagem</h1>
      <CharacterForm initialData={character} onSubmit={handleSubmit} />
    </div>
  );
}
