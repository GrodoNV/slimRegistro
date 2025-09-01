import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';

const CasesTable = ({ cases, onEdit, onDelete, onView, isAdmin = false }) => {
  const BACKEND_URL = 'http://localhost:3000'; // URL base del backend

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      case 'urgent':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
        return 'En Progreso';
      case 'completed':
        return 'Completado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'low':
        return 'Baja';
      case 'medium':
        return 'Media';
      case 'high':
        return 'Alta';
      case 'urgent':
        return 'Urgente';
      default:
        return priority;
    }
  };

  if (!cases || cases.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="textSecondary">
          No hay casos disponibles
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>N° Caso</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Solicitante</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Prioridad</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Fecha Creación</TableCell>
            {isAdmin && <TableCell>Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {cases.map((caseItem) => (
            <TableRow key={caseItem.id} hover>
              <TableCell>
                <Typography variant="body2" fontWeight="bold">{caseItem.caseNumber}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="medium">
                  {caseItem.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                  {caseItem.problem?.substring(0, 80)}
                  {caseItem.problem?.length > 80 && '...'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{caseItem.applicant}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(caseItem.status)}
                  color={getStatusColor(caseItem.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={getPriorityLabel(caseItem.priority)}
                  color={getPriorityColor(caseItem.priority)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {caseItem.imageUrl ? (
                  <a href={`${BACKEND_URL}${caseItem.imageUrl}`} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={`${BACKEND_URL}${caseItem.imageUrl}`}
                      alt={`Imagen del caso ${caseItem.caseNumber}`}
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </a>
                ) : (
                  <Typography variant="caption" color="textSecondary">Sin imagen</Typography>
                )}
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {new Date(caseItem.createdAt).toLocaleDateString('es-ES')}
                </Typography>
              </TableCell>
              {isAdmin && (
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" onClick={() => onView(caseItem)} color="primary"><ViewIcon /></IconButton>
                    <IconButton size="small" onClick={() => onEdit(caseItem)} color="warning"><EditIcon /></IconButton>
                    <IconButton size="small" onClick={() => onDelete(caseItem.id)} color="error"><DeleteIcon /></IconButton>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CasesTable;
