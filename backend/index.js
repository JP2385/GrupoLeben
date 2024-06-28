// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const authRoutes = require('./src/app/routes/authRoutes');
const authMiddleware = require('./src/app/middlewares/authMiddleware'); 
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(config.mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Redirigir a login.html por defecto
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Ruta para verificar el token
app.get('/auth/verify', authMiddleware, (req, res) => {
    res.status(200).send({ message: 'Token is valid' });
});

// Rutas autenticadas
app.get('/index.html', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Otras rutas
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
