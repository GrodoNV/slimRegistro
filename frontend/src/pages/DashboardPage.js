import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { authService } from '../services/authService';

const DashboardPage = () => {
  const isAdmin = authService.isAdmin();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Contenido Principal */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido al Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Selecciona una opción para comenzar a trabajar
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Tarjeta de Casos */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssignmentIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h5" component="h2">
                      Gestión de Casos
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Administra y da seguimiento a todos los casos
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph>
                  {isAdmin 
                    ? 'Como administrador, puedes crear, editar, eliminar y exportar todos los casos del sistema.'
                    : 'Visualiza y da seguimiento a los casos asignados a tu cuenta.'
                  }
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="large" 
                  component={Link} 
                  to="/cases"
                  variant="contained"
                  fullWidth
                >
                  Ir a Casos
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Tarjeta de Gestión de Usuarios (Solo Admin) */}
          {isAdmin && (
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PeopleIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                    <Box>
                      <Typography variant="h5" component="h2">
                        Gestión de Usuarios
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Administra usuarios del sistema
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Crea, edita y elimina usuarios. Cambia roles y contraseñas. 
                    Solo los administradores tienen acceso a esta funcionalidad.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="large" 
                    component={Link} 
                    to="/admin/users"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Gestionar Usuarios
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )}

          {/* Tarjeta de Estadísticas (Solo Admin) */}
          

          {/* Tarjeta de Exportación */}
          <Grid item xs={12} md={isAdmin ? 6 : 12}>
            <Card sx={{ height: '100%', bgcolor: 'success.50' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssignmentIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h5" component="h2">
                      Exportar Datos
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Descarga información en Excel
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph>
                  {isAdmin 
                    ? 'Exporta todos los casos y usuarios del sistema a Excel para análisis y respaldos.'
                    : 'Exporta tus casos a Excel para mantener un registro personal.'
                  }
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="large" 
                  component={Link} 
                  to="/cases"
                  variant="contained"
                  color="success"
                  fullWidth
                >
                  Ir a Casos para Exportar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Información Adicional */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Información del Sistema
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Rol actual:</strong> {isAdmin ? 'Administrador' : 'Usuario'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Acceso:</strong> {isAdmin ? 'Completo' : 'Limitado'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Funcionalidades disponibles:</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {isAdmin 
                  ? 'Gestión completa de usuarios y casos, exportación, estadísticas'
                  : 'Visualización de casos, exportación personal'
                }
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default DashboardPage;
