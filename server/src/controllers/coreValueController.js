const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllCoreValues = async (req, res) => {
  try {
    const where = req.admin ? {} : { isActive: true };
    const coreValues = await prisma.coreValue.findMany({ where, orderBy: { order: 'asc' } });
    res.json({ coreValues });
  } catch (error) {
    console.error('Get core values error:', error);
    res.status(500).json({ error: 'Failed to fetch core values' });
  }
};

exports.createCoreValue = async (req, res) => {
  try {
    const { name, description, order, isActive } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const coreValue = await prisma.coreValue.create({
      data: { name, description, order: order || 0, isActive: isActive !== undefined ? isActive : true }
    });
    res.status(201).json({ message: 'Core value created', coreValue });
  } catch (error) {
    console.error('Create core value error:', error);
    res.status(500).json({ error: 'Failed to create core value' });
  }
};

exports.updateCoreValue = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.coreValue.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const updated = await prisma.coreValue.update({ where: { id: parseInt(id) }, data: req.body });
    res.json({ message: 'Core value updated', coreValue: updated });
  } catch (error) {
    console.error('Update core value error:', error);
    res.status(500).json({ error: 'Failed to update core value' });
  }
};

exports.deleteCoreValue = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.coreValue.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    await prisma.coreValue.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Core value deleted' });
  } catch (error) {
    console.error('Delete core value error:', error);
    res.status(500).json({ error: 'Failed to delete core value' });
  }
};
