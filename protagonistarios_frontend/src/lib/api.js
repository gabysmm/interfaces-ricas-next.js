const API_BASE_URL = 'http://localhost:8000/api';

function getAuthHeaders(accessToken) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  };
}

export async function getCharacters(accessToken) {
  const response = await fetch(`${API_BASE_URL}/characters/`, {
    headers: getAuthHeaders(accessToken),
  });
  if (!response.ok) {
    throw new Error('Erro ao buscar personagens');
  }
  return response.json();
}

export async function getCharacter(id, accessToken) {
  const response = await fetch(`${API_BASE_URL}/characters/${id}/`, {
    headers: getAuthHeaders(accessToken),
  });
  if (!response.ok) {
    throw new Error('Erro ao buscar personagem');
  }
  return response.json();
}

export async function createCharacter(characterData, accessToken) {
  const response = await fetch(`${API_BASE_URL}/characters/`, {
    method: 'POST',
    headers: getAuthHeaders(accessToken),
    body: JSON.stringify(characterData),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar personagem');
  }
  return response.json();
}

export async function updateCharacter(id, characterData, accessToken) {
  const response = await fetch(`${API_BASE_URL}/characters/${id}/`, {
    method: 'PUT',
    headers: getAuthHeaders(accessToken),
    body: JSON.stringify(characterData),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar personagem');
  }
  return response.json();
}

export async function deleteCharacter(id, accessToken) {
  const response = await fetch(`${API_BASE_URL}/characters/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders(accessToken),
  });
  if (!response.ok) {
    throw new Error('Erro ao excluir personagem');
  }
  return null;
}