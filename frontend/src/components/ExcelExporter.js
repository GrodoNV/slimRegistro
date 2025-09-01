import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';

const ExcelExporter = ({ data, filename, sheetName = 'Data' }) => {
  const exportToExcel = () => {
    try {
      // Crear un nuevo workbook
      const workbook = XLSX.utils.book_new();
      
      // Convertir los datos a una hoja de cálculo
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Agregar la hoja al workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      
      // Generar el archivo Excel
      const excelBuffer = XLSX.write(workbook, { 
        bookType: 'xlsx', 
        type: 'array' 
      });
      
      // Crear el blob y descargar
      const blob = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.xlsx`;
      link.click();
      
      // Limpiar
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Error al exportar a Excel');
    }
  };

  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<Download />}
      onClick={exportToExcel}
      disabled={!data || data.length === 0}
    >
      Exportar a Excel
    </Button>
  );
};

export default ExcelExporter;
