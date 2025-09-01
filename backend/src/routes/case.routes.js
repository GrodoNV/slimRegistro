const express = require('express');
const router = express.Router();
const {
  getAllCases,
  getUserCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase
} = require('../controllers/case.controller');
const { authenticateToken, requireAdmin } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Obtener todos los casos (ahora para todos los usuarios autenticados)
router.get('/', getAllCases);

// Eliminar la ruta específica de /my-cases que ya no es necesaria
// router.get('/my-cases', getUserCases);


// Obtener caso por ID
router.get('/:id', getCaseById);

// Crear nuevo caso (solo admin puede crear casos)
router.post('/', requireAdmin, upload.single('image'), createCase);

// Actualizar caso
router.put('/:id', upload.single('image'), updateCase);

// Eliminar caso
router.delete('/:id', deleteCase);

module.exports = router;
