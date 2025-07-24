'use client';

import CharacterForm from '../../../components/CharacterForm';
import { createCharacter } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';

export default function CreateCharacterPage() {
  const router = useRouter();
  const { user, accessToken, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      if (!user || !accessToken) {
        router.push('/login');
      }
    }
  }, [user, accessToken, authLoading, router]);

  const handleSubmit = async (data) => {
    if (!accessToken) {
      alert('Você não está autenticado. Por favor, faça login.');
      router.push('/login');
      return;
    }
    try {
      await createCharacter(data, accessToken);
      alert('Personagem criado com sucesso!');
      router.push('/');
    } catch (error) {
      alert('Erro ao criar personagem: ' + error.message);
      console.error(error);
    }
  };

  if (authLoading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="form-page-container">
      <Link href="/" passHref>
        <button className="back-button">
          <ArrowLeft size={16} /> Voltar para a lista
        </button>
      </Link>
      <h1>Adicionar Novo Personagem</h1>
      <CharacterForm onSubmit={handleSubmit} />
    </div>
  );
}