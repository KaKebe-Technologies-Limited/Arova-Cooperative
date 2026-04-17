const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create default admin
  const hashedPassword = await bcrypt.hash('arova2024', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@arova.org' },
    update: {},
    create: {
      email: 'admin@arova.org',
      password: hashedPassword,
      name: 'Arova Admin',
      role: 'SUPER_ADMIN'
    }
  });
  console.log('✅ Default admin created');

  // Create blog posts
  const posts = [
    {
      title: 'From 15 Women to 19,000+ Members',
      excerpt: 'How a small savings group transformed the region.',
      content: '<p>In 2008, a small group of 15 women came together with a vision to change their community. Today, Arova has grown to over 19,000 members across multiple districts in Northern Uganda.</p><p>This remarkable journey demonstrates the power of collective action, mutual support, and unwavering commitment to community development.</p>',
      image: '/images/blog 1.jpg',
      category: 'Success Story',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-12-14')
    },
    {
      title: 'Breaking the Poverty Cycle',
      excerpt: 'Low interest loans are changing lives.',
      content: '<p>Arova\'s microfinance program has been instrumental in breaking the cycle of poverty. By offering low-interest loans, members can start and expand their businesses.</p><p>These loans have enabled thousands of families to improve their livelihoods, send their children to school, and invest in sustainable agricultural practices.</p>',
      image: '/images/blog 2.jpg',
      category: 'Finance',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-11-20')
    },
    {
      title: 'Revolutionizing Agriculture via Value Addition',
      excerpt: 'Helping farmers earn more through processing.',
      content: '<p>Through value addition training and resources, Arova members are transforming raw agricultural products into higher-value goods.</p><p>From processing cassava into flour to creating packaged goods, members are earning significantly more from their harvests and building sustainable businesses.</p>',
      image: '/images/blog 4.webp',
      category: 'Agriculture',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-10-15')
    },
    {
      title: 'The Power of a Shared Dream',
      excerpt: 'It started with 15 women.',
      content: '<p>The story of Arova began with a shared dream among 15 women who believed they could make a difference in their community.</p><p>Today, that dream has become a reality, impacting thousands of lives and creating a sustainable model for cooperative development.</p>',
      image: '/images/blog 5.jpg',
      category: 'Community',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-09-08')
    },
    {
      title: 'Serving the Lango & Acholi Sub-regions',
      excerpt: 'Expanding across Northern Uganda.',
      content: '<p>Arova has expanded its reach to serve communities across the Lango and Acholi sub-regions in Northern Uganda.</p><p>This expansion has brought financial services, agricultural training, and community development programs to previously underserved areas.</p>',
      image: '/images/blog 3.jpg',
      category: 'Impact',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-08-22')
    },
    {
      title: 'Funding Our Future: 2B UGX',
      excerpt: 'Strategic funding accelerating impact.',
      content: '<p>With over 2 billion UGX in strategic funding, Arova is accelerating its impact across Northern Uganda.</p><p>This funding enables the cooperative to offer more loans, expand training programs, and reach even more communities in need.</p>',
      image: '/images/blog 6.jpg',
      category: 'Finance',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-07-15')
    }
  ];

  for (const post of posts) {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await prisma.post.upsert({
      where: { slug },
      update: {},
      create: { ...post, slug }
    });
  }
  console.log('✅ Blog posts seeded');

  // Create team members
  const teamMembers = [
    { name: 'Brenda Komagum', role: 'Manager', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', order: 1 },
    { name: 'Denis Peter Odongo', role: 'Head Finance & Admin', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', order: 2 },
    { name: 'Susan Akello', role: 'Head Operations & Credit', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop', order: 3 },
    { name: 'Bob Obwor', role: 'Accountant', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', order: 4 },
    { name: 'Apali Caeser', role: 'Branch Manager', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', order: 5 },
    { name: 'Nyaketcho Catherine', role: 'Admin Assistant', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop', order: 6 },
    { name: 'Acola Fiona', role: 'Loan Officer', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop', order: 7 },
    { name: 'Daniel', role: 'Loan Officer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', order: 8 }
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.order },
      update: {},
      create: { ...member, isActive: true }
    });
  }
  console.log('✅ Team members seeded');

  // Create testimonials
  const testimonials = [
    {
      name: 'Sarah Akello',
      role: 'Farmer, Oyam',
      text: 'Joining Arova changed my life. The low-interest loans allowed me to buy better seeds, and now my harvest has doubled.',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop',
      order: 1
    },
    {
      name: 'John Okello',
      role: 'Small Business Owner',
      text: 'The value addition training helped me process my cassava into flour, selling it for a much higher price in the market.',
      image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop',
      order: 2
    },
    {
      name: 'Grace Auma',
      role: 'Member since 2012',
      text: 'Transparency and accountability are why I trust Arova. I know my savings are safe and working to help our community.',
      image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop',
      order: 3
    }
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.order },
      update: {},
      create: { ...testimonial, isActive: true }
    });
  }
  console.log('✅ Testimonials seeded');

  // Create stats
  const stats = [
    { label: 'People Reached', value: 19441, suffix: '', icon: 'Users', order: 1 },
    { label: 'Districts Served', value: 10, suffix: '+', icon: 'MapPin', order: 2 },
    { label: 'Billion UGX Donated', value: 2, suffix: 'Bn', icon: 'TrendingUp', order: 3 },
    { label: 'Dedicated Staff', value: 12, suffix: '', icon: 'Heart', order: 4 }
  ];

  for (const stat of stats) {
    await prisma.statItem.upsert({
      where: { id: stat.order },
      update: {},
      create: { ...stat, isActive: true }
    });
  }
  console.log('✅ Stats seeded');

  // Create core values
  const coreValues = [
    { name: 'Accountability', order: 1 },
    { name: 'Transparency', order: 2 },
    { name: 'Equity', order: 3 },
    { name: 'Democracy', order: 4 },
    { name: 'Self-responsibility', order: 5 },
    { name: 'Self help', order: 6 }
  ];

  for (const coreValue of coreValues) {
    await prisma.coreValue.upsert({
      where: { id: coreValue.order },
      update: {},
      create: { ...coreValue, isActive: true }
    });
  }
  console.log('✅ Core values seeded');

  // Create social links
  const socialLinks = [
    { platform: 'Facebook', url: 'https://facebook.com/arova', order: 1 },
    { platform: 'Twitter', url: 'https://twitter.com/arova', order: 2 },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/arova', order: 3 },
    { platform: 'Instagram', url: 'https://instagram.com/arova', order: 4 }
  ];

  for (const social of socialLinks) {
    await prisma.socialLink.upsert({
      where: { platform: social.platform },
      update: {},
      create: { ...social, isActive: true }
    });
  }
  console.log('✅ Social links seeded');

  // Create contact info
  const contactInfo = [
    { key: 'address', value: 'Senior Quarters B Cell, Lira City, Uganda', label: 'Address', order: 1 },
    { key: 'email', value: 'info@arova.org', label: 'Email', order: 2 },
    { key: 'phone', value: '+256 700 000 000', label: 'Phone', order: 3 }
  ];

  for (const contact of contactInfo) {
    await prisma.contactInfo.upsert({
      where: { key: contact.key },
      update: {},
      create: contact
    });
  }
  console.log('✅ Contact info seeded');

  // Create page content
  const pageContent = [
    {
      page: 'HOME',
      sectionKey: 'hero',
      content: {
        title: "Let's Change The World With Humanity",
        subtitle: 'Established 2008 • Reg No: 12064/RCS',
        ctaText: 'Learn More'
      }
    },
    {
      page: 'ABOUT',
      sectionKey: 'whoWeAre',
      content: {
        title: 'From Humble Beginnings to Regional Impact',
        summary: 'In 2008, Arova Producers and Cooperative Sacco was born from a vision to eradicate poverty among community members through value addition, financial services, and collective action.'
      }
    },
    {
      page: 'HOME',
      sectionKey: 'mission',
      content: { text: 'Eradicating poverty among members through value addition.' }
    },
    {
      page: 'HOME',
      sectionKey: 'vision',
      content: { text: 'To be a leading producer of agricultural products.' }
    }
  ];

  for (const content of pageContent) {
    await prisma.pageSection.upsert({
      where: { page_sectionKey: { page: content.page, sectionKey: content.sectionKey } },
      update: {},
      create: content
    });
  }
  console.log('✅ Page content seeded');

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
