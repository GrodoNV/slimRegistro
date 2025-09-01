const { Case, User } = require('../../models');

// Obtener todos los casos (solo admin)
const getAllCases = async (req, res) => {
  try {
    const cases = await Case.findAll({
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'role']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      cases,
      count: cases.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Obtener caso por ID
const getCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const whereClause = { id };
    
    // Si no es admin, solo puede ver sus propios casos
    if (req.user.role !== 'admin') {
      whereClause.userId = req.user.id;
    }
    
    const caseItem = await Case.findOne({
      where: whereClause,
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'role']
      }]
    });
    
    if (!caseItem) {
      return res.status(404).json({ error: 'Caso no encontrado' });
    }
    
    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo caso
const createCase = async (req, res) => {
  try {
    const {
      title, description, status, priority, clientName, clientEmail, clientPhone,
      caseNumber, applicant, defendant, problem, community, observations
    } = req.body;

    // Validaciones
    if (!title || !description || !clientName || !clientEmail || !caseNumber || !applicant || !problem) {
      return res.status(400).json({
        error: 'Título, descripción, cliente, email, N° de caso, solicitante y problema son requeridos'
      });
    }

    let imageUrl = null;
    if (req.file) {
      // Construye la URL pública a partir de la ruta del archivo guardado
      imageUrl = `/${req.file.path.replace(/\\/g, '/').replace('src/', '')}`;
    }

    const newCase = await Case.create({
      title,
      description,
      status: status || 'pending',
      priority: priority || 'medium',
      clientName,
      clientEmail,
      clientPhone,
      caseNumber,
      applicant,
      defendant,
      problem,
      community,
      observations,
      imageUrl,
      userId: req.user.id
    });
    
    const caseWithRelations = await Case.findByPk(newCase.id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'username', 'role'] }]
    });
    
    res.status(201).json(caseWithRelations);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El número de caso ya existe.' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Actualizar caso
const updateCase = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;

    const whereClause = { id };
    if (req.user.role !== 'admin') {
      whereClause.userId = req.user.id;
    }

    const caseItem = await Case.findOne({ where: whereClause });
    if (!caseItem) {
      return res.status(404).json({ error: 'Caso no encontrado o sin permisos para editarlo.' });
    }

    // Si se sube una nueva imagen, se genera su URL
    if (req.file) {
      dataToUpdate.imageUrl = `/${req.file.path.replace(/\\/g, '/').replace('src/', '')}`;
      // Opcional: Aquí se podría añadir lógica para eliminar la imagen antigua del servidor
    }

    await caseItem.update(dataToUpdate);
    
    const updatedCase = await Case.findByPk(id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'username', 'role'] }]
    });
    
    res.json(updatedCase);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El número de caso ya existe.' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Eliminar caso
const deleteCase = async (req, res) => {
  try {
    const { id } = req.params;
    
    const whereClause = { id };
    
    // Si no es admin, solo puede eliminar sus propios casos
    if (req.user.role !== 'admin') {
      whereClause.userId = req.user.id;
    }
    
    const caseItem = await Case.findOne({ where: whereClause });
    
    if (!caseItem) {
      return res.status(404).json({ error: 'Caso no encontrado' });
    }
    
    await caseItem.destroy();
    
    res.json({ message: 'Caso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase
};
