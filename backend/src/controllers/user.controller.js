const { User } = require('../../models');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios (sin mostrar contraseñas)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json({ users, count: users.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo usuario
const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Validaciones
    if (!username || !password) {
      return res.status(400).json({ error: 'Username y password son requeridos' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }
    
    // Verificar si el username ya existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'El username ya está en uso' });
    }
    
    // Crear usuario
    const newUser = await User.create({ 
      username, 
      password, 
      role: role || 'user' 
    });
    
    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json({ 
      message: 'Usuario creado exitosamente',
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, role } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Verificar si el username ya existe (si se está cambiando)
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'El username ya está en uso' });
      }
    }
    
    // Actualizar campos
    const updateData = {};
    if (username) updateData.username = username;
    if (role) updateData.role = role;
    
    await user.update(updateData);
    
    // Retornar usuario actualizado sin contraseña
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json({ 
      message: 'Usuario actualizado exitosamente',
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cambiar contraseña
const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword, currentPassword } = req.body;
    
    if (!newPassword) {
      return res.status(400).json({ error: 'Nueva contraseña es requerida' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' });
    }
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Si se proporciona contraseña actual, verificar que sea correcta
    if (currentPassword) {
      const isValidPassword = bcrypt.compareSync(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Contraseña actual incorrecta' });
      }
    }
    
    // Actualizar contraseña
    await user.update({ password: newPassword });
    
    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // No permitir que un admin se elimine a sí mismo
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ error: 'No puedes eliminar tu propia cuenta' });
    }
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Eliminar usuario
    await user.destroy();
    
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changePassword
};
