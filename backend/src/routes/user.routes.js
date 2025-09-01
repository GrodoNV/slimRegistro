const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  changePassword,
  createUser 
} = require('../controllers/user.controller');
const { authenticateToken, requireAdmin } = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación y rol de admin
router.use(authenticateToken, requireAdmin);

// CRUD de usuarios
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Cambio de contraseña
router.put('/:id/password', changePassword);

module.exports = router;
