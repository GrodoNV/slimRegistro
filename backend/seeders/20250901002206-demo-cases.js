'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cases', [
      {
        title: 'Desarrollo de Aplicación Web',
        description: 'Crear una aplicación web completa para la gestión de inventario de la empresa ABC.',
        status: 'in_progress',
        priority: 'high',
        clientName: 'Juan Pérez',
        clientEmail: 'juan.perez@empresa-abc.com',
        clientPhone: '+34 666 123 456',
        userId: 1, // admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mantenimiento Sistema Legacy',
        description: 'Actualizar y mantener el sistema legacy de contabilidad existente.',
        status: 'pending',
        priority: 'medium',
        clientName: 'María García',
        clientEmail: 'maria.garcia@contabilidad-xyz.com',
        clientPhone: '+34 677 987 654',
        userId: 1, // admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Migración a la Nube',
        description: 'Migrar toda la infraestructura actual a servicios en la nube (AWS).',
        status: 'completed',
        priority: 'urgent',
        clientName: 'Carlos López',
        clientEmail: 'carlos.lopez@tech-solutions.com',
        clientPhone: '+34 688 555 123',
        userId: 1, // admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Consultoría de Seguridad',
        description: 'Auditoría completa de seguridad y recomendaciones para mejorar la protección de datos.',
        status: 'pending',
        priority: 'high',
        clientName: 'Ana Martínez',
        clientEmail: 'ana.martinez@seguridad-digital.com',
        clientPhone: '+34 699 444 789',
        userId: 2, // usuario normal
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'E-commerce con React',
        description: 'Desarrollo de una tienda online moderna con React y Node.js.',
        status: 'in_progress',
        priority: 'medium',
        clientName: 'Roberto Silva',
        clientEmail: 'roberto.silva@tienda-online.com',
        clientPhone: '+34 611 222 333',
        userId: 4, // testuser
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cases', null, {});
  }
};
