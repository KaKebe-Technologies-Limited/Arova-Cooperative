const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllPageContent = async (req, res) => {
  try {
    const content = await prisma.pageSection.findMany({
      orderBy: [{ page: 'asc' }, { order: 'asc' }]
    });
    res.json({ content });
  } catch (error) {
    console.error('Get page content error:', error);
    res.status(500).json({ error: 'Failed to fetch page content' });
  }
};

exports.createPageContent = async (req, res) => {
  try {
    const { page, sectionKey, content, order, isActive } = req.body;
    if (!page || !sectionKey) return res.status(400).json({ error: 'Page and sectionKey are required' });
    const pageSection = await prisma.pageSection.create({
      data: { page, sectionKey, content, order: order || 0, isActive: isActive !== undefined ? isActive : true }
    });
    res.status(201).json({ message: 'Page content created', pageSection });
  } catch (error) {
    console.error('Create page content error:', error);
    res.status(500).json({ error: 'Failed to create page content' });
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.pageSection.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const updated = await prisma.pageSection.update({ where: { id: parseInt(id) }, data: req.body });
    res.json({ message: 'Page content updated', pageSection: updated });
  } catch (error) {
    console.error('Update page content error:', error);
    res.status(500).json({ error: 'Failed to update page content' });
  }
};

exports.deletePageContent = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.pageSection.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    await prisma.pageSection.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Page content deleted' });
  } catch (error) {
    console.error('Delete page content error:', error);
    res.status(500).json({ error: 'Failed to delete page content' });
  }
};
