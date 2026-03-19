CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  courses TEXT DEFAULT '[]',
  education TEXT NOT NULL,
  preferred_time TEXT,
  preferred_mode TEXT,
  message TEXT,
  newsletter INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT DEFAULT 'career',
  tags TEXT DEFAULT '[]',
  featured_image TEXT,
  published INTEGER DEFAULT 0,
  featured INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

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
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS teachers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  experience TEXT NOT NULL,
  photo TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  achievement TEXT DEFAULT 'Top Performer',
  photo TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS hero_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  title TEXT DEFAULT 'Hero Image',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT DEFAULT '+91 9876543210',
  whatsapp TEXT DEFAULT '+91 9876543210',
  email TEXT DEFAULT 'info@okacademykurawli.com',
  address TEXT DEFAULT 'Near Post Office, Kurawli, Mainpuri, UP - 205001',
  facebook TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  youtube TEXT DEFAULT '',
  logo TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS newsletters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'general',
  duration TEXT DEFAULT '',
  price TEXT DEFAULT '',
  features TEXT DEFAULT '[]',
  icon TEXT DEFAULT 'faLaptopCode',
  badge TEXT DEFAULT '',
  level TEXT DEFAULT 'Beginner',
  featured INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS footer_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT DEFAULT 'Empowering students with cutting-edge computer education and professional skills for a brighter future.',
  quick_links TEXT DEFAULT '[]',
  popular_courses TEXT DEFAULT '[]',
  social_links TEXT DEFAULT '[]',
  address TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  timing TEXT DEFAULT 'Mon - Sat: 8:00 AM - 8:00 PM',
  copyright_text TEXT DEFAULT '© 2024 OK ACADEMY. All rights reserved. | Made with ❤ by MAYALOK VENTURES'
);

CREATE TABLE IF NOT EXISTS homepage_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hero_slides TEXT DEFAULT '[]',
  features_heading TEXT DEFAULT 'Why Choose OK ACADEMY?',
  features_subheading TEXT DEFAULT 'What makes us the best choice for your computer education',
  features TEXT DEFAULT '[]',
  cta_heading TEXT DEFAULT 'Ready to Start Your Career in IT?',
  cta_description TEXT DEFAULT 'Join OK ACADEMY today and transform your future with quality computer education',
  cta_phone TEXT DEFAULT '+919876543210',
  sections_enabled TEXT DEFAULT '{"hero":true,"topStudents":true,"features":true,"courses":true,"testimonials":true,"blog":true,"cta":true}'
);
