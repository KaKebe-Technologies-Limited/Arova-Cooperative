const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Submit contact form (public)
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const submission = await prisma.contactSubmission.create({
      data: { name, email, subject, message }
    });
    res.status(201).json({ message: 'Message sent successfully', submission });
  } catch (error) {
    console.error('Submit contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Get all submissions (protected)
exports.getAllSubmissions = async (req, res) => {
  try {
    const { page = 1, limit = 20, isRead } = req.query;
    const where = {};
    if (isRead !== undefined) {
      where.isRead = isRead === 'true';
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.contactSubmission.count({ where })
    ]);
    res.json({
      submissions,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

// Mark as read (protected)
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.contactSubmission.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const updated = await prisma.contactSubmission.update({
      where: { id: parseInt(id) },
      data: { isRead: true }
    });
    res.json({ message: 'Marked as read', submission: updated });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
};

// Delete submission (protected)
exports.deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.contactSubmission.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    await prisma.contactSubmission.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Submission deleted' });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
};
