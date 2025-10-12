const express = require('express');
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

// Routes
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Autenticação simulada
    if (username === 'admin' && password === '1234') {
        res.json({ message: 'Login bem-sucedido!' });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas!' });
    }
});

// Start Service
app.listen(PORT, () => console.log(`Auth Service running on http://localhost:${PORT}`));