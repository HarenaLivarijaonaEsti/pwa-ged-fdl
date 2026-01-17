const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Test de l'API
app.get('/', (req, res) => res.send('API GED FDL OK'));

// ------------------------ DOSSIERS ------------------------

// Créer un dossier
app.post('/dossiers', async (req, res) => {
  try {
    const { commune_nom } = req.body;
    const result = await pool.query(
      'INSERT INTO dossier (commune_nom) VALUES ($1) RETURNING *',
      [commune_nom]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Lire tous les dossiers
app.get('/dossiers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dossier');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// ------------------------ DOCUMENTS ------------------------

// Créer un document
app.post('/documents', async (req, res) => {
  try {
    const { dossier_id, type_document, fichier, est_paraphe } = req.body;
    const result = await pool.query(
      'INSERT INTO document (dossier_id, type_document, fichier, est_paraphe) VALUES ($1, $2, $3, $4) RETURNING *',
      [dossier_id, type_document, fichier, est_paraphe || false]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Lire tous les documents
app.get('/documents', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM document');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// ------------------------ REMARQUES ------------------------

// Créer une remarque
app.post('/remarques', async (req, res) => {
  try {
    const { document_id, contenu } = req.body;
    const result = await pool.query(
      'INSERT INTO remarque (document_id, contenu) VALUES ($1, $2) RETURNING *',
      [document_id, contenu]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Lire toutes les remarques
app.get('/remarques', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM remarque');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// ------------------------ UTILISATEURS ------------------------

// Créer un utilisateur
app.post('/utilisateurs', async (req, res) => {
  try {
    const { email, mot_de_passe, role } = req.body;
    const result = await pool.query(
      'INSERT INTO utilisateur (email, mot_de_passe, role) VALUES ($1, $2, $3) RETURNING *',
      [email, mot_de_passe, role]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Lire tous les utilisateurs
app.get('/utilisateurs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM utilisateur');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = app;
