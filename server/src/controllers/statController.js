const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllStats = async (req, res) => {
  try {
    const where = req.admin ? {} : { isActive: true };
    const stats = await prisma.statItem.findMany({ where, orderBy: { order: 'asc' } });
    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

exports.createStat = async (req, res) => {
  try {
    const { label, value, suffix, icon, order, isActive } = req.body;
    if (!label) return res.status(400).json({ error: 'Label is required' });
    const stat = await prisma.statItem.create({
      data: { label, value: value || 0, suffix, icon, order: order || 0, isActive: isActive !== undefined ? isActive : true }
    });
    res.status(201).json({ message: 'Stat created', stat });
  } catch (error) {
    console.error('Create stat error:', error);
    res.status(500).json({ error: 'Failed to create stat' });
  }
};

exports.updateStat = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.statItem.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const updated = await prisma.statItem.update({ where: { id: parseInt(id) }, data: req.body });
    res.json({ message: 'Stat updated', stat: updated });
  } catch (error) {
    console.error('Update stat error:', error);
    res.status(500).json({ error: 'Failed to update stat' });
  }
};

exports.deleteStat = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.statItem.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    await prisma.statItem.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Stat deleted' });
  } catch (error) {
    console.error('Delete stat error:', error);
    res.status(500).json({ error: 'Failed to delete stat' });
  }
};
