// Admin User
export interface IAdmin {
  id?: number;
  username: string;
  password: string;
  createdAt?: string;
}

// Contact Submission
export interface IContact {
  id?: number;
  name: string;
  fatherName: string;
  phone: string;
  email: string;
  address?: string;
  courses: string[]; // stored as JSON text in SQLite
  education: string;
  preferredTime?: string;
  preferredMode?: string;
  message?: string;
  newsletter: boolean;
  createdAt?: string;
}

// Blog Post
export interface IBlogPost {
  id?: number;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  tags: string[]; // stored as JSON text in SQLite
  featuredImage?: string;
  published: boolean;
  featured: boolean;
  views: number;
  createdAt?: string;
  updatedAt?: string;
}

// Testimonial
export interface ITestimonial {
  id?: number;
  name: string;
  course: string;
  rating: number;
  feedback: string;
  photo?: string;
  currentPosition?: string;
  category: string;
  approved: boolean;
  createdAt?: string;
}

// Teacher
export interface ITeacher {
  id?: number;
  name: string;
  designation: string;
  experience: string;
  photo?: string;
  createdAt?: string;
}

// Top Student
export interface IStudent {
  id?: number;
  name: string;
  achievement: string;
  photo?: string;
  createdAt?: string;
}

// Hero Image
export interface IHeroImage {
  id?: number;
  url: string;
  title: string;
  createdAt?: string;
}

// Site Settings
export interface ISiteSettings {
  id?: number;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  logo?: string;
}

// Newsletter
export interface INewsletter {
  id?: number;
  email: string;
  createdAt?: string;
}

// Course
export interface ICourse {
  id?: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  price: string;
  features: string[]; // stored as JSON text in SQLite
  icon: string;
  badge: string;
  level: string;
  featured: boolean;
  sortOrder: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Footer Settings
export interface IFooterSettings {
  id?: number;
  description?: string;
  quickLinks: { href: string; label: string }[]; // stored as JSON text in SQLite
  popularCourses: string[]; // stored as JSON text in SQLite
  socialLinks: { href: string; platform: string }[]; // stored as JSON text in SQLite
  address?: string;
  phone?: string;
  email?: string;
  timing?: string;
  copyrightText?: string;
}

// Homepage Content
export interface IHomepageContent {
  id?: number;
  heroSlides: { // stored as JSON text in SQLite
    gradient: string;
    title: string;
    tagline: string;
    intro: string;
  }[];
  featuresHeading?: string;
  featuresSubheading?: string;
  features: { title: string; description: string; icon: string }[]; // stored as JSON text in SQLite
  ctaHeading?: string;
  ctaDescription?: string;
  ctaPhone?: string;
  sectionsEnabled: { // stored as JSON text in SQLite
    hero: boolean;
    topStudents: boolean;
    features: boolean;
    courses: boolean;
    testimonials: boolean;
    blog: boolean;
    cta: boolean;
  };
}

export async function initializeDb(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        father_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT,
        courses TEXT,
        education TEXT NOT NULL,
        preferred_time TEXT,
        preferred_mode TEXT,
        message TEXT,
        newsletter INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        category TEXT DEFAULT 'career',
        tags TEXT,
        featured_image TEXT,
        published INTEGER DEFAULT 0,
        featured INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        course TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        feedback TEXT NOT NULL,
        photo TEXT,
        current_position TEXT,
        category TEXT DEFAULT 'course',
        approved INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS teachers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        designation TEXT NOT NULL,
        experience TEXT NOT NULL,
        photo TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        achievement TEXT DEFAULT 'Top Performer',
        photo TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS hero_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT DEFAULT 'Hero Image',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT,
        whatsapp TEXT,
        email TEXT,
        address TEXT,
        facebook TEXT,
        instagram TEXT,
        youtube TEXT,
        logo TEXT
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS newsletters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT DEFAULT '',
        category TEXT DEFAULT 'general',
        duration TEXT DEFAULT '',
        price TEXT DEFAULT '',
        features TEXT,
        icon TEXT DEFAULT 'faLaptopCode',
        badge TEXT DEFAULT '',
        level TEXT DEFAULT 'Beginner',
        featured INTEGER DEFAULT 0,
        sort_order INTEGER DEFAULT 0,
        active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS footer_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        quick_links TEXT,
        popular_courses TEXT,
        social_links TEXT,
        address TEXT,
        phone TEXT,
        email TEXT,
        timing TEXT,
        copyright_text TEXT
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS homepage_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hero_slides TEXT,
        features_heading TEXT,
        features_subheading TEXT,
        features TEXT,
        cta_heading TEXT,
        cta_description TEXT,
        cta_phone TEXT,
        sections_enabled TEXT
      )
    `),
  ]);
}
