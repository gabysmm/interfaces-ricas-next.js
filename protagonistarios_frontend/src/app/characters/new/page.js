'use client';

import CharacterForm from '../../../components/CharacterForm';
import { createCharacter } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { jsx } from 'react/jsx-runtime';

export default function CreateCharacterPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await createCharacter(data);
      alert('Personagem criado com sucesso!');
      router.push('/');
    } catch (error) {
      alert('Erro ao criar personagem: ' + error.message);
      console.error(error);
    }
  };

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
