const API_BASE_URL = 'http://localhost:8000/api'; 

export async function getCharacters() {
  const response = await fetch(`${API_BASE_URL}/characters/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar personagens');
  }
  return response.json();
}

export async function getCharacter(id) {
  const response = await fetch(`${API_BASE_URL}/characters/${id}/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar personagem');
  }
  return response.json();
}

export async function createCharacter(characterData) {
  const response = await fetch(`${API_BASE_URL}/characters/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characterData),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar personagem');
  }
  return response.json();
}

export async function updateCharacter(id, characterData) {
  const response = await fetch(`${API_BASE_URL}/characters/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characterData),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar personagem');
  }
  return response.json();
}

export async function deleteCharacter(id) {
  const response = await fetch(`${API_BASE_URL}/characters/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao excluir personagem');
  }
  return null;
}