const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllSocialLinks = async (req, res) => {
  try {
    const where = req.admin ? {} : { isActive: true };
    const socialLinks = await prisma.socialLink.findMany({ where, orderBy: { order: 'asc' } });
    res.json({ socialLinks });
  } catch (error) {
    console.error('Get social links error:', error);
    res.status(500).json({ error: 'Failed to fetch social links' });
  }
};

exports.createSocialLink = async (req, res) => {
  try {
    const { platform, url, order, isActive } = req.body;
    if (!platform || !url) return res.status(400).json({ error: 'Platform and URL are required' });
    const socialLink = await prisma.socialLink.create({
      data: { platform, url, order: order || 0, isActive: isActive !== undefined ? isActive : true }
    });
    res.status(201).json({ message: 'Social link created', socialLink });
  } catch (error) {
    console.error('Create social link error:', error);
    res.status(500).json({ error: 'Failed to create social link' });
  }
};

exports.updateSocialLink = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.socialLink.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const updated = await prisma.socialLink.update({ where: { id: parseInt(id) }, data: req.body });
    res.json({ message: 'Social link updated', socialLink: updated });
  } catch (error) {
    console.error('Update social link error:', error);
    res.status(500).json({ error: 'Failed to update social link' });
  }
};

exports.deleteSocialLink = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.socialLink.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    await prisma.socialLink.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Social link deleted' });
  } catch (error) {
    console.error('Delete social link error:', error);
    res.status(500).json({ error: 'Failed to delete social link' });
  }
};
