const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllTestimonials = async (req, res) => {
  try {
    const where = req.admin ? {} : { isActive: true };
    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { order: 'asc' }
    });
    res.json({ testimonials });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { name, role, text, image, order, isActive } = req.body;
    if (!name || !text) {
      return res.status(400).json({ error: 'Name and text are required' });
    }
    const testimonial = await prisma.testimonial.create({
      data: { name, role, text, image, order: order || 0, isActive: isActive !== undefined ? isActive : true }
    });
    res.status(201).json({ message: 'Testimonial created', testimonial });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.testimonial.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const updated = await prisma.testimonial.update({ where: { id: parseInt(id) }, data: req.body });
    res.json({ message: 'Testimonial updated', testimonial: updated });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.testimonial.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    await prisma.testimonial.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};
