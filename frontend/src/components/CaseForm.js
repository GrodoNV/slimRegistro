import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Input
} from '@mui/material';

const CaseForm = ({ open, onClose, onSubmit, caseData = null, isEdit = false }) => {
  const initialFormState = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    caseNumber: '',
    applicant: '',
    defendant: '',
    problem: '',
    community: '',
    observations: '',
    image: null
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (caseData && isEdit) {
      setFormData({
        title: caseData.title || '',
        description: caseData.description || '',
        status: caseData.status || 'pending',
        priority: caseData.priority || 'medium',
        clientName: caseData.clientName || '',
        clientEmail: caseData.clientEmail || '',
        clientPhone: caseData.clientPhone || '',
        caseNumber: caseData.caseNumber || '',
        applicant: caseData.applicant || '',
        defendant: caseData.defendant || '',
        problem: caseData.problem || '',
        community: caseData.community || '',
        observations: caseData.observations || '',
        image: null // La imagen no se precarga, se sube una nueva si se desea
      });
    } else {
      setFormData(initialFormState);
    }
  }, [caseData, isEdit, open]); // Se agrega open para resetear el form al abrir

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose(); // Cierra y resetea el form
  };

  const handleClose = () => {
    setFormData(initialFormState);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? 'Editar Caso' : 'Nuevo Caso'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            
            {/* Columna 1 */}
            <TextField name="caseNumber" label="N° de Caso" value={formData.caseNumber} onChange={handleChange} required fullWidth />
            <TextField name="title" label="Título del Caso" value={formData.title} onChange={handleChange} required fullWidth />
            <TextField name="applicant" label="Solicitante" value={formData.applicant} onChange={handleChange} required fullWidth />
            <TextField name="defendant" label="Demandado" value={formData.defendant} onChange={handleChange} fullWidth />
            <TextField name="community" label="Comunidad" value={formData.community} onChange={handleChange} fullWidth />
            <TextField name="clientName" label="Nombre del Cliente" value={formData.clientName} onChange={handleChange} required fullWidth />
            <TextField name="clientEmail" label="Email del Cliente" type="email" value={formData.clientEmail} onChange={handleChange} required fullWidth />
            <TextField name="clientPhone" label="Teléfono del Cliente" value={formData.clientPhone} onChange={handleChange} fullWidth />

            {/* Columna 2 */}
            <TextField name="problem" label="Problema" value={formData.problem} onChange={handleChange} required fullWidth multiline rows={4} sx={{ gridColumn: '2 / 3' }} />
            <TextField name="description" label="Descripción General" value={formData.description} onChange={handleChange} required fullWidth multiline rows={4} sx={{ gridColumn: '2 / 3' }} />
            <TextField name="observations" label="Observaciones" value={formData.observations} onChange={handleChange} fullWidth multiline rows={4} sx={{ gridColumn: '2 / 3' }} />
            
            <FormControl fullWidth sx={{ gridColumn: '1 / 2' }}>
              <InputLabel>Estado</InputLabel>
              <Select name="status" value={formData.status} onChange={handleChange} label="Estado">
                <MenuItem value="pending">Pendiente</MenuItem>
                <MenuItem value="in_progress">En Progreso</MenuItem>
                <MenuItem value="completed">Completado</MenuItem>
                <MenuItem value="cancelled">Cancelado</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ gridColumn: '1 / 2' }}>
              <InputLabel>Prioridad</InputLabel>
              <Select name="priority" value={formData.priority} onChange={handleChange} label="Prioridad">
                <MenuItem value="low">Baja</MenuItem>
                <MenuItem value="medium">Media</MenuItem>
                <MenuItem value="high">Alta</MenuItem>
                <MenuItem value="urgent">Urgente</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ gridColumn: '2 / 3', alignSelf: 'center' }}>
              <Button variant="contained" component="label">
                Subir Imagen
                <input type="file" name="image" hidden onChange={handleChange} accept="image/*" />
              </Button>
              {formData.image && <span style={{ marginLeft: '10px' }}>{formData.image.name}</span>}
              {isEdit && caseData.imageUrl && !formData.image && 
                <a href={`${process.env.REACT_APP_API_URL}${caseData.imageUrl}`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>Ver imagen actual</a>
              }
            </Box>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">{isEdit ? 'Actualizar' : 'Crear'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CaseForm;