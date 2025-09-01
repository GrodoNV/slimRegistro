import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { userService } from '../services/userService';


const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [selectedUserForPassword, setSelectedUserForPassword] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getAllUsers();
      setUsers(response.users || []);
      setError('');
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await userService.createUser(userData);
      setSuccess('Usuario creado exitosamente');
      setFormOpen(false);
      fetchUsers();
    } catch (err) {
      setError('Error al crear usuario');
      console.error('Error creating user:', err);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await userService.updateUser(editingUser.id, userData);
      setSuccess('Usuario actualizado exitosamente');
      setFormOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setError('Error al actualizar usuario');
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(userToDelete);
      setSuccess('Usuario eliminado exitosamente');
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (err) {
      setError('Error al eliminar usuario');
      console.error('Error deleting user:', err);
    }
  };

  const handleChangePassword = async () => {
    try {
      await userService.changePassword(selectedUserForPassword.id, { newPassword });
      setSuccess('Contraseña actualizada exitosamente');
      setPasswordDialogOpen(false);
      setSelectedUserForPassword(null);
      setNewPassword('');
    } catch (err) {
      setError('Error al cambiar contraseña');
      console.error('Error changing password:', err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: '',
      role: user.role
    });
    setFormOpen(true);
  };

  const handleView = (user) => {
    setViewUser(user);
    setViewDialogOpen(true);
  };

  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handlePasswordChange = (user) => {
    setSelectedUserForPassword(user);
    setPasswordDialogOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      handleUpdateUser(formData);
    } else {
      handleCreateUser(formData);
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingUser(null);
    setFormData({
      username: '',
      password: '',
      role: 'user'
    });
  };

  const getRoleLabel = (role) => {
    return role === 'admin' ? 'Administrador' : 'Usuario';
  };

  const getRoleColor = (role) => {
    return role === 'admin' ? 'error' : 'primary';
  };

  if (loading) {
    return (
      <Container>
        <Typography>Cargando usuarios...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Usuarios
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setFormOpen(true)}
            >
              Nuevo Usuario
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchUsers}
              disabled={loading}
            >
              Actualizar
            </Button>
            
          </Box>
        </Box>

        {/* Tabla de Usuarios */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Fecha Creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {user.username}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getRoleLabel(user.role)}
                      color={getRoleColor(user.role)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(user.createdAt).toLocaleDateString('es-ES')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleView(user)}
                        color="primary"
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(user)}
                        color="warning"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handlePasswordChange(user)}
                        color="info"
                      >
                        <Typography variant="caption">🔒</Typography>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(user.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Formulario de Usuario */}
        <Dialog open={formOpen} onClose={handleCloseForm} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
          </DialogTitle>
          <form onSubmit={handleFormSubmit}>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  name="username"
                  label="Nombre de Usuario"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  fullWidth
                />
                
                {!editingUser && (
                  <TextField
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    fullWidth
                  />
                )}
                
                <FormControl fullWidth>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    label="Rol"
                  >
                    <MenuItem value="user">Usuario</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseForm}>Cancelar</Button>
              <Button type="submit" variant="contained">
                {editingUser ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Diálogo de Vista de Usuario */}
        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Detalles del Usuario</DialogTitle>
          <DialogContent>
            {viewUser && (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    {viewUser.username}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Rol
                  </Typography>
                  <Chip
                    label={getRoleLabel(viewUser.role)}
                    color={getRoleColor(viewUser.role)}
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Fecha de Creación
                  </Typography>
                  <Typography variant="body2">
                    {new Date(viewUser.createdAt).toLocaleDateString('es-ES')}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Última Actualización
                  </Typography>
                  <Typography variant="body2">
                    {new Date(viewUser.updatedAt).toLocaleDateString('es-ES')}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>Cerrar</Button>
            <Button
              variant="contained"
              onClick={() => {
                setViewDialogOpen(false);
                handleEdit(viewUser);
              }}
            >
              Editar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo de Cambio de Contraseña */}
        <Dialog
          open={passwordDialogOpen}
          onClose={() => setPasswordDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Cambiar Contraseña</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Cambiar contraseña para: <strong>{selectedUserForPassword?.username}</strong>
              </Typography>
              <TextField
                label="Nueva Contraseña"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                fullWidth
                sx={{ mt: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPasswordDialogOpen(false)}>Cancelar</Button>
            <Button
              variant="contained"
              onClick={handleChangePassword}
              disabled={!newPassword}
            >
              Cambiar Contraseña
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo de Confirmación de Eliminación */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleDeleteUser} color="error" variant="contained">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notificaciones */}
        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={() => setSuccess('')}
        >
          <Alert onClose={() => setSuccess('')} severity="success">
            {success}
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <Alert onClose={() => setError('')} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default UserManagementPage;
