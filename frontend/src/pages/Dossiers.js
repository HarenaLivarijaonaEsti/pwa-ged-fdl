import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Dossiers() {
  const [dossiers, setDossiers] = useState([]);

  useEffect(() => {
    api.get('/dossiers')
      .then(res => setDossiers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Liste des dossiers</h1>
      <ul>
        {dossiers.map(d => (
          <li key={d.id}>
            {d.commune_nom} - <a href={`/dossiers/${d.id}`}>Voir</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

