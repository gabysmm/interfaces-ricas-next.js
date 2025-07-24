'use client';

import { useState, useEffect } from 'react';

export default function CharacterForm({ initialData = {}, onSubmit }) {
  const [name, setName] = useState(initialData.name || '');
  const [anime, setAnime] = useState(initialData.anime || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [imageUrl, setImageUrl] = useState(initialData.image_url || '');
  const [initialized, setInitialized] = useState(false);
  const [status, setStatus] = useState(initialData.status || 'vivo');


useEffect(() => {
  if (initialData && !initialized) {
    setName(initialData.name || '');
    setAnime(initialData.anime || '');
    setDescription(initialData.description || '');
    setImageUrl(initialData.image_url || '');
    setStatus(initialData.status || 'vivo');
    setInitialized(true);
  }
}, [initialData, initialized]);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, anime, description, status, image_url: imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="character-form">
      <div className="form-group">
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="anime">Anime:</label>
        <input
          type="text"
          id="anime"
          value={anime}
          onChange={(e) => setAnime(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">URL da Imagem:</label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="vivo">Vivo</option>
          <option value="morto">Morto</option>
        </select>
      </div>

      <button type="submit">Salvar</button>

      <style jsx>{`
        .character-form {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 30px auto;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #555;
        }

        .form-group input[type='text'],
        .form-group input[type='url'],
        .form-group textarea {
          width: calc(100% - 20px);
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1em;
        }

        .form-group textarea {
          resize: vertical;
        }

        .character-form button[type='submit'] {
          width: 100%;
          padding: 12px;
          font-size: 1.1em;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .character-form button[type='submit']:hover {
          background-color: #2980b9;
        }
        .form-group select {
          width: calc(100% - 20px);
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1em;
        }
      `}</style>
    </form>
  );
}