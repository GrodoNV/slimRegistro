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
  Grid,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { authService } from '../services/authService';
import { caseService } from '../services/caseService';
import CasesTable from '../components/CasesTable';
import CaseForm from '../components/CaseForm';
import ExcelExporter from '../components/ExcelExporter';

const CasesPage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [viewCase, setViewCase] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);

  const isAdmin = authService.isAdmin();

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const response = await caseService.getAllCases();
      setCases(response.cases || response || []);
      setError('');
    } catch (err) {
      setError('Error al cargar los casos');
      console.error('Error fetching cases:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCase = async (caseData) => {
    try {
      await caseService.createCase(caseData);
      setSuccess('Caso creado exitosamente');
      setFormOpen(false);
      fetchCases();
    } catch (err) {
      setError('Error al crear el caso');
      console.error('Error creating case:', err);
    }
  };

  const handleUpdateCase = async (caseData) => {
    try {
      await caseService.updateCase(editingCase.id, caseData);
      setSuccess('Caso actualizado exitosamente');
      setFormOpen(false);
      setEditingCase(null);
      fetchCases();
    } catch (err) {
      setError('Error al actualizar el caso');
      console.error('Error updating case:', err);
    }
  };

  const handleDeleteCase = async () => {
    try {
      await caseService.deleteCase(caseToDelete);
      setSuccess('Caso eliminado exitosamente');
      setDeleteDialogOpen(false);
      setCaseToDelete(null);
      fetchCases();
    } catch (err) {
      setError('Error al eliminar el caso');
      console.error('Error deleting case:', err);
    }
  };

  const handleEdit = (caseItem) => {
    setEditingCase(caseItem);
    setFormOpen(true);
  };

  const handleView = (caseItem) => {
    setViewCase(caseItem);
    setViewDialogOpen(true);
  };

  const handleDelete = (caseId) => {
    setCaseToDelete(caseId);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = (caseData) => {
    if (editingCase) {
      handleUpdateCase(caseData);
    } else {
      handleCreateCase(caseData);
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingCase(null);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'in_progress': return 'En Progreso';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'low': return 'Baja';
      case 'medium': return 'Media';
      case 'high': return 'Alta';
      case 'urgent': return 'Urgente';
      default: return priority;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in_progress': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'urgent': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Casos
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {isAdmin && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setFormOpen(true)}
              >
                Nuevo Caso
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchCases}
              disabled={loading}
            >
              Actualizar
            </Button>
            {cases.length > 0 && (
              <ExcelExporter
                data={cases}
                filename="casos"
                sheetName="Casos"
              />
            )}
          </Box>
        </Box>

        {loading ? (
          <Typography>Cargando casos...</Typography>
        ) : (
          <CasesTable
            cases={cases}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            isAdmin={isAdmin}
          />
        )}

        {/* Formulario de Caso */}
        <CaseForm
          open={formOpen}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          caseData={editingCase}
          isEdit={!!editingCase}
        />

        {/* Diálogo de Vista de Caso */}
        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Detalles del Caso</DialogTitle>
          <DialogContent>
            {viewCase && (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    {viewCase.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" paragraph>
                    {viewCase.description}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Estado
                  </Typography>
                  <Chip
                    label={getStatusLabel(viewCase.status)}
                    color={getStatusColor(viewCase.status)}
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Prioridad
                  </Typography>
                  <Chip
                    label={getPriorityLabel(viewCase.priority)}
                    color={getPriorityColor(viewCase.priority)}
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Cliente
                  </Typography>
                  <Card variant="outlined" sx={{ mt: 1 }}>
                    <CardContent>
                      <Typography variant="body1" fontWeight="medium">
                        {viewCase.clientName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {viewCase.clientEmail}
                      </Typography>
                      {viewCase.clientPhone && (
                        <Typography variant="body2" color="textSecondary">
                          {viewCase.clientPhone}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Fecha de Creación
                  </Typography>
                  <Typography variant="body2">
                    {new Date(viewCase.createdAt).toLocaleDateString('es-ES')}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Última Actualización
                  </Typography>
                  <Typography variant="body2">
                    {new Date(viewCase.updatedAt).toLocaleDateString('es-ES')}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>Cerrar</Button>
            {isAdmin && (
              <Button
                variant="contained"
                onClick={() => {
                  setViewDialogOpen(false);
                  handleEdit(viewCase);
                }}
              >
                Editar
              </Button>
            )}
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
              ¿Estás seguro de que quieres eliminar este caso? Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleDeleteCase} color="error" variant="contained">
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

export default CasesPage;
