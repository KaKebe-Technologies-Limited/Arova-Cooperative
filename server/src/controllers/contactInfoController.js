const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllContactInfo = async (req, res) => {
  try {
    const where = req.admin ? {} : { isActive: true };
    const contactInfo = await prisma.contactInfo.findMany({ where, orderBy: { order: 'asc' } });
    res.json({ contactInfo });
  } catch (error) {
    console.error('Get contact info error:', error);
    res.status(500).json({ error: 'Failed to fetch contact info' });
  }
};

exports.createContactInfo = async (req, res) => {
  try {
    const { key, value, label, order, isActive } = req.body;
    if (!key || !value) return res.status(400).json({ error: 'Key and value are required' });
    const contactInfo = await prisma.contactInfo.create({
      data: { key, value, label, order: order || 0, isActive: isActive !== undefined ? isActive : true }
    });
    res.status(201).json({ message: 'Contact info created', contactInfo });
  } catch (error) {
    console.error('Create contact info error:', error);
    res.status(500).json({ error: 'Failed to create contact info' });
  }
};

exports.updateContactInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.contactInfo.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const updated = await prisma.contactInfo.update({ where: { id: parseInt(id) }, data: req.body });
    res.json({ message: 'Contact info updated', contactInfo: updated });
  } catch (error) {
    console.error('Update contact info error:', error);
    res.status(500).json({ error: 'Failed to update contact info' });
  }
};

exports.deleteContactInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.contactInfo.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    await prisma.contactInfo.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Contact info deleted' });
  } catch (error) {
    console.error('Delete contact info error:', error);
    res.status(500).json({ error: 'Failed to delete contact info' });
  }
};
