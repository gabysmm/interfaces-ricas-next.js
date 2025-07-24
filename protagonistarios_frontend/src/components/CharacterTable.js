// src/components/CharacterTable.js
import Link from 'next/link';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function CharacterTable({ characters, onDelete }) {
  return (
    <div className="table-container">
      <table className="characters-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Anime</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.id}>
              <td>{character.name}</td>
              <td>{character.anime}</td>
              <td>{character.status}</td>
              <td>
                <div className="actions">
                  <Link href={`/characters/${character.id}/view`} passHref>
                    <button className="view">
                      <Eye size={16} /> Visualizar
                    </button>
                  </Link>
                  <Link href={`/characters/${character.id}/edit`} passHref>
                    <button className="edit">
                      <Edit size={16} /> Editar
                    </button>
                  </Link>
                  <button onClick={() => onDelete(character.id)} className="delete">
                    <Trash2 size={16} /> Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .table-container {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow-x: auto;
        }

        .characters-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .characters-table th,
        .characters-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }

        .characters-table th {
          background-color: #f2f2f2;
          font-weight: bold;
          color: #555;
        }

        .characters-table tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .characters-table tbody tr:hover {
          background-color: #f1f1f1;
        }

        .actions {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}
