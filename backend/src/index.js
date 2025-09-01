const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const caseRoutes = require('./routes/case.routes');
const { errorHandler, notFound } = require('./middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static('src/uploads'));

app.get('/', (req, res) => res.send('API funcionando 🚀'));
app.get('/test', (req, res) => res.send('Test route working!'));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de gestión de usuarios (solo admin)
app.use('/api/users', userRoutes);

// Rutas de gestión de casos
app.use('/api/cases', caseRoutes);

// Middleware de manejo de errores (debe ir al final)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
