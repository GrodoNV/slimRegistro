'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Since this migration adds columns to an existing table,
    // we use addColumn for each new field.
    await queryInterface.addColumn('Cases', 'caseNumber', {
      type: Sequelize.STRING,
      allowNull: true, // Will be required at the application level
      unique: true
    });
    await queryInterface.addColumn('Cases', 'applicant', {
      type: Sequelize.STRING,
      allowNull: true // Will be required at the application level
    });
    await queryInterface.addColumn('Cases', 'defendant', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Cases', 'problem', {
      type: Sequelize.TEXT,
      allowNull: true // Will be required at the application level
    });
    await queryInterface.addColumn('Cases', 'community', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Cases', 'observations', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('Cases', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // The down method removes the columns we added.
    await queryInterface.removeColumn('Cases', 'caseNumber');
    await queryInterface.removeColumn('Cases', 'applicant');
    await queryInterface.removeColumn('Cases', 'defendant');
    await queryInterface.removeColumn('Cases', 'problem');
    await queryInterface.removeColumn('Cases', 'community');
    await queryInterface.removeColumn('Cases', 'observations');
    await queryInterface.removeColumn('Cases', 'imageUrl');
  }
};
