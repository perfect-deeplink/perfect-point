import mongoose, { Schema, Document } from 'mongoose';

// Admin User
export interface IAdmin extends Document {
  username: string;
  password: string;
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Contact Submission
export interface IContact extends Document {
  name: string;
  fatherName: string;
  phone: string;
  email: string;
  address?: string;
  courses: string[];
  education: string;
  preferredTime?: string;
  preferredMode?: string;
  message?: string;
  newsletter: boolean;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: String,
  courses: [String],
  education: { type: String, required: true },
  preferredTime: String,
  preferredMode: String,
  message: String,
  newsletter: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Blog Post
export interface IBlogPost extends Document {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: String,
  category: { type: String, default: 'career' },
  tags: [String],
  featuredImage: String,
  published: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Testimonial
export interface ITestimonial extends Document {
  name: string;
  course: string;
  rating: number;
  feedback: string;
  photo?: string;
  current?: string;
  category: string;
  approved: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  course: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  feedback: { type: String, required: true },
  photo: String,
  current: String,
  category: { type: String, default: 'course' },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Teacher
export interface ITeacher extends Document {
  name: string;
  designation: string;
  experience: string;
  photo?: string;
  createdAt: Date;
}

const TeacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  experience: { type: String, required: true },
  photo: String,
  createdAt: { type: Date, default: Date.now },
});

// Top Student
export interface IStudent extends Document {
  name: string;
  achievement: string;
  photo?: string;
  createdAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  achievement: { type: String, default: 'Top Performer' },
  photo: String,
  createdAt: { type: Date, default: Date.now },
});

// Hero Image
export interface IHeroImage extends Document {
  url: string;
  title: string;
  createdAt: Date;
}

const HeroImageSchema = new Schema<IHeroImage>({
  url: { type: String, required: true },
  title: { type: String, default: 'Hero Image' },
  createdAt: { type: Date, default: Date.now },
});

// Site Settings
export interface ISiteSettings extends Document {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  logo: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  phone: { type: String, default: '+91 9876543210' },
  whatsapp: { type: String, default: '+91 9876543210' },
  email: { type: String, default: 'info@okacademykurawli.com' },
  address: { type: String, default: 'Near Post Office, Kurawli, Mainpuri, UP - 205001' },
  facebook: { type: String, default: '' },
  instagram: { type: String, default: '' },
  youtube: { type: String, default: '' },
  logo: { type: String, default: '' },
});

// Newsletter
export interface INewsletter extends Document {
  email: string;
  createdAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Course
export interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
  duration: string;
  price: string;
  features: string[];
  icon: string;
  badge: string;
  level: string;
  featured: boolean;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'general' },
  duration: { type: String, default: '' },
  price: { type: String, default: '' },
  features: [String],
  icon: { type: String, default: 'faLaptopCode' },
  badge: { type: String, default: '' },
  level: { type: String, default: 'Beginner' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Footer Settings
export interface IFooterSettings extends Document {
  description: string;
  quickLinks: { href: string; label: string }[];
  popularCourses: string[];
  socialLinks: { href: string; platform: string }[];
  address: string;
  phone: string;
  email: string;
  timing: string;
  copyrightText: string;
}

const FooterSettingsSchema = new Schema<IFooterSettings>({
  description: { type: String, default: 'Empowering students with cutting-edge computer education and professional skills for a brighter future.' },
  quickLinks: { type: [{ href: String, label: String }], default: [] },
  popularCourses: { type: [String], default: [] },
  socialLinks: { type: [{ href: String, platform: String }], default: [] },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  timing: { type: String, default: 'Mon - Sat: 8:00 AM - 8:00 PM' },
  copyrightText: { type: String, default: '© 2024 OK ACADEMY. All rights reserved. | Made with ❤ by MAYALOK VENTURES' },
});

// Homepage Content
export interface IHomepageContent extends Document {
  heroSlides: {
    gradient: string;
    title: string;
    tagline: string;
    intro: string;
  }[];
  featuresHeading: string;
  featuresSubheading: string;
  features: { title: string; description: string; icon: string }[];
  ctaHeading: string;
  ctaDescription: string;
  ctaPhone: string;
  sectionsEnabled: {
    hero: boolean;
    topStudents: boolean;
    features: boolean;
    courses: boolean;
    testimonials: boolean;
    blog: boolean;
    cta: boolean;
  };
}

const HomepageContentSchema = new Schema<IHomepageContent>({
  heroSlides: { type: [{ gradient: String, title: String, tagline: String, intro: String }], default: [] },
  featuresHeading: { type: String, default: 'Why Choose OK ACADEMY?' },
  featuresSubheading: { type: String, default: 'What makes us the best choice for your computer education' },
  features: { type: [{ title: String, description: String, icon: String }], default: [] },
  ctaHeading: { type: String, default: 'Ready to Start Your Career in IT?' },
  ctaDescription: { type: String, default: 'Join OK ACADEMY today and transform your future with quality computer education' },
  ctaPhone: { type: String, default: '+919876543210' },
  sectionsEnabled: {
    type: {
      hero: { type: Boolean, default: true },
      topStudents: { type: Boolean, default: true },
      features: { type: Boolean, default: true },
      courses: { type: Boolean, default: true },
      testimonials: { type: Boolean, default: true },
      blog: { type: Boolean, default: true },
      cta: { type: Boolean, default: true },
    },
    default: { hero: true, topStudents: true, features: true, courses: true, testimonials: true, blog: true, cta: true },
  },
});

export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
export const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
export const Teacher = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);
export const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
export const HeroImage = mongoose.models.HeroImage || mongoose.model<IHeroImage>('HeroImage', HeroImageSchema);
export const SiteSettings = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
export const Newsletter = mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);
export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
export const FooterSettings = mongoose.models.FooterSettings || mongoose.model<IFooterSettings>('FooterSettings', FooterSettingsSchema);
export const HomepageContent = mongoose.models.HomepageContent || mongoose.model<IHomepageContent>('HomepageContent', HomepageContentSchema);
