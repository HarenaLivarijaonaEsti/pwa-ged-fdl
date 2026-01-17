import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function DossierDetails({ match }) {
  const dossierId = match.params.id;
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [typeDoc, setTypeDoc] = useState('');

  const fetchDocuments = () => {
    api.get(`/dossiers/${dossierId}/documents`)
      .then(res => setDocuments(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async () => {
    if (!file || !typeDoc) return alert('Choisir un fichier et type document');
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type_document', typeDoc);

    await api.post(`/dossiers/${dossierId}/documents`, formData)
      .then(() => fetchDocuments())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Dossier {dossierId}</h2>
      
      <div>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <input type="text" placeholder="Type document" value={typeDoc} onChange={e => setTypeDoc(e.target.value)} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <h3>Documents</h3>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>
            {doc.type_document} - {doc.fichier}
          </li>
        ))}
      </ul>
    </div>
  );
}
