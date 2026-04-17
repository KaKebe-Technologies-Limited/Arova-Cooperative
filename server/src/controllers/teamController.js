const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all active team members (public)
exports.getAllMembers = async (req, res) => {
  try {
    const where = req.admin ? {} : { isActive: true };

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        role: true,
        bio: true,
        image: true,
        email: true,
        phone: true,
        order: true,
        isActive: true
      }
    });

    res.json({ members });
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

// Create team member (protected)
exports.createMember = async (req, res) => {
  try {
    const { name, role, bio, image, email, phone, order, isActive } = req.body;

    if (!name || !role) {
      return res.status(400).json({ error: 'Name and role are required' });
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        bio,
        image,
        email,
        phone,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    });

    res.status(201).json({
      message: 'Team member created successfully',
      member
    });
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
};

// Update team member (protected)
exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const existingMember = await prisma.teamMember.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    const updatedMember = await prisma.teamMember.update({
      where: { id: parseInt(id) },
      data: updates
    });

    res.json({
      message: 'Team member updated successfully',
      member: updatedMember
    });
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

// Delete team member (protected)
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const existingMember = await prisma.teamMember.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    await prisma.teamMember.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};
