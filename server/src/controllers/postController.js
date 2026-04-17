const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');
const prisma = new PrismaClient();

// Get all posts (with filtering options)
exports.getAllPosts = async (req, res) => {
  try {
    const { status, category, search, page = 1, limit = 10 } = req.query;

    const where = {};

    // Filter by status
    if (status) {
      where.status = status;
    }

    // Filter by category
    if (category) {
      where.category = category;
    }

    // Search by title or excerpt
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ];
    }

    // For public access, only show published posts
    if (!req.admin) {
      where.status = 'PUBLISHED';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          image: true,
          category: true,
          status: true,
          views: true,
          createdAt: true,
          publishedAt: true
        }
      }),
      prisma.post.count({ where })
    ]);

    res.json({
      posts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get single post by slug
exports.getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await prisma.post.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        image: true,
        category: true,
        status: true,
        views: true,
        seoTitle: true,
        seoDescription: true,
        createdAt: true,
        publishedAt: true
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment views
    await prisma.post.update({
      where: { id: post.id },
      data: { views: post.views + 1 }
    });

    res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// Create post (protected)
exports.createPost = async (req, res) => {
  try {
    const { title, excerpt, content, image, category, status, seoTitle, seoDescription } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Generate slug
    const slug = slugify(title, { lower: true, strict: true });

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      return res.status(409).json({ error: 'A post with this title already exists' });
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        category: category || 'News',
        status: status || 'DRAFT',
        seoTitle,
        seoDescription,
        publishedAt: status === 'PUBLISHED' ? new Date() : null
      }
    });

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Update post (protected)
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Generate new slug if title changed
    if (updates.title && updates.title !== existingPost.title) {
      updates.slug = slugify(updates.title, { lower: true, strict: true });
    }

    // If publishing, set publishedAt
    if (updates.status === 'PUBLISHED' && existingPost.status !== 'PUBLISHED') {
      updates.publishedAt = new Date();
    }

    // Update post
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: updates
    });

    res.json({
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete post (protected)
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete post
    await prisma.post.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
