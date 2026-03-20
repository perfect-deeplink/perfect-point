'use client';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faBlog, faComments, faChalkboardTeacher, faCog, faSignOutAlt, faPlus, faEdit, faTrash, faSave, faLock, faEye, faEyeSlash, faSignInAlt, faUserShield, faSpinner, faTimes, faKey, faPhone, faGraduationCap, faHome, faColumns, faLink } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import ImageUploader from '@/components/ImageUploader';
type Section = 'dashboard' | 'courses' | 'students' | 'blog' | 'testimonials' | 'teachers' | 'homepage' | 'footer' | 'settings';

interface ModalData {
  type: 'student' | 'testimonial' | 'teacher' | 'course' | null;
  data?: Record<string, unknown>;
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [section, setSection] = useState<Section>('dashboard');
  const [loading, setLoading] = useState(false);

  // Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Data
  const [stats, setStats] = useState({ students: 0, blog: 0, testimonials: 0, courses: 0 });
  const [students, setStudents] = useState<Array<{ id: number; name: string; achievement: string; photo?: string }>>([]);
  const [blogPosts, setBlogPosts] = useState<Array<{ id: number; title: string; category: string; published: boolean; createdAt: string; tags?: string[]; featuredImage?: string }>>([]);
  const [testimonials, setTestimonials] = useState<Array<{ id: number; name: string; course: string; rating: number; feedback: string; photo?: string }>>([]);
  const [teachers, setTeachers] = useState<Array<{ id: number; name: string; designation: string; experience: string; photo?: string }>>([]);
  const [courses, setCourses] = useState<Array<{ id: number; title: string; description: string; category: string; duration: string; price: string; features: string[]; badge: string; level: string; featured: boolean; active: boolean; icon?: string }>>([]);

  // Modal
  const [modal, setModal] = useState<ModalData>({ type: null });

  // Blog editor
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<Record<string, unknown> | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('career');
  const [postTags, setPostTags] = useState('');
  const [postImage, setPostImage] = useState('');

  // Settings
  const [settings, setSettings] = useState({ phone: '', whatsapp: '', email: '', address: '', facebook: '', instagram: '', youtube: '' });
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  // Form fields
  const [formName, setFormName] = useState('');
  const [formField2, setFormField2] = useState('');
  const [formField3, setFormField3] = useState('');
  const [formField4, setFormField4] = useState('');
  const [formField5, setFormField5] = useState('');
  const [formField6, setFormField6] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formImage, setFormImage] = useState('');

  // Homepage
  const [homepageData, setHomepageData] = useState({
    heroSlides: [] as { gradient: string; title: string; tagline: string; intro: string; image?: string }[],
    featuresHeading: 'Why Choose OK ACADEMY?',
    featuresSubheading: 'What makes us the best choice for your computer education',
    features: [] as { title: string; description: string; icon: string }[],
    ctaHeading: 'Ready to Start Your Career in IT?',
    ctaDescription: 'Join OK ACADEMY today and transform your future with quality computer education',
    ctaPhone: '+919876543210',
    sectionsEnabled: { hero: true, topStudents: true, features: true, courses: true, testimonials: true, blog: true, cta: true },
  });

  // Footer
  const [footerData, setFooterData] = useState({
    description: '',
    quickLinks: [] as { href: string; label: string }[],
    popularCourses: [] as string[],
    socialLinks: [] as { href: string; platform: string }[],
    address: '',
    phone: '',
    email: '',
    timing: 'Mon - Sat: 8:00 AM - 8:00 PM',
    copyrightText: '© 2024 OK ACADEMY. All rights reserved. | Made with ❤ by MAYALOK VENTURES',
  });

  const authHeaders = useCallback(() => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }), [token]);

  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (t) {
      fetch('/api/auth', { headers: { 'Authorization': `Bearer ${t}` } })
        .then(r => r.json())
        .then((d) => { const data = d as { success: boolean }; if (data.success) { setToken(t); setIsLoggedIn(true); } else localStorage.removeItem('admin_token'); })
        .catch(() => localStorage.removeItem('admin_token'));
    }
  }, []);

  const loadData = useCallback(async (sec: Section) => {
    if (!token) return;
    const h = { 'Authorization': `Bearer ${token}` };
    try {
      switch (sec) {
        case 'dashboard': {
          const [s1, b1, t1, c1] = await Promise.all([
            fetch('/api/students', { headers: h }).then(r => r.json()),
            fetch('/api/blog', { headers: h }).then(r => r.json()),
            fetch('/api/testimonials', { headers: h }).then(r => r.json()),
            fetch('/api/courses').then(r => r.json()),
          ]);
          setStats({ students: s1.data?.length || 0, blog: b1.data?.length || 0, testimonials: t1.data?.length || 0, courses: c1.data?.length || 0 });
          break;
        }
        case 'courses': {
          const r = await fetch('/api/courses'); const d = await r.json();
          setCourses(d.data || []);
          break;
        }
        case 'students': {
          const r = await fetch('/api/students', { headers: h }); const d = await r.json();
          setStudents(d.data || []);
          break;
        }
        case 'blog': {
          const r = await fetch('/api/blog', { headers: h }); const d = await r.json();
          setBlogPosts(d.data || []);
          break;
        }
        case 'testimonials': {
          const r = await fetch('/api/testimonials', { headers: h }); const d = await r.json();
          setTestimonials(d.data || []);
          break;
        }
        case 'teachers': {
          const r = await fetch('/api/teachers', { headers: h }); const d = await r.json();
          setTeachers(d.data || []);
          break;
        }
        case 'homepage': {
          const r = await fetch('/api/homepage'); const d = await r.json();
          if (d.data) setHomepageData(prev => ({ ...prev, ...d.data }));
          break;
        }
        case 'footer': {
          const r = await fetch('/api/footer'); const d = await r.json();
          if (d.data) setFooterData(prev => ({ ...prev, ...d.data }));
          break;
        }
        case 'settings': {
          const r = await fetch('/api/settings'); const d = await r.json();
          if (d.data) setSettings(d.data);
          break;
        }
      }
    } catch (e) { console.error('Load error:', e); }
  }, [token]);

  useEffect(() => { if (isLoggedIn) loadData(section); }, [isLoggedIn, section, loadData]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
        setIsLoggedIn(true);
      } else setLoginError(data.error || 'Invalid credentials');
    } catch { setLoginError('Connection error'); }
    setLoginLoading(false);
  }

  function logout() {
    localStorage.removeItem('admin_token');
    setToken('');
    setIsLoggedIn(false);
    setSection('dashboard');
  }

  function openModal(type: 'student' | 'testimonial' | 'teacher' | 'course', data?: Record<string, unknown>) {
    setModal({ type, data });
    setFormName((data?.name as string) || (data?.title as string) || '');
    setFormField2((data?.achievement as string) || (data?.course as string) || (data?.designation as string) || (data?.description as string) || '');
    setFormField3((data?.feedback as string) || (data?.experience as string) || (data?.duration as string) || '');
    setFormField4((data?.price as string) || '');
    setFormField5((data?.category as string) || '');
    setFormField6(((data?.features as string[]) || []).join(', '));
    setFormRating((data?.rating as number) || 5);
    setFormImage((data?.photo as string) || (data?.icon as string) || '');
  }

  async function saveModalData(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const h = authHeaders();
    try {
        if (modal.type === 'student') {
        const body = { name: formName, achievement: formField2, photo: formImage };
        if (modal.data?.id) await fetch(`/api/students/${modal.data.id}`, { method: 'PUT', headers: h, body: JSON.stringify(body) });
        else await fetch('/api/students', { method: 'POST', headers: h, body: JSON.stringify(body) });
      } else if (modal.type === 'testimonial') {
        const body = { name: formName, course: formField2, feedback: formField3, rating: formRating, photo: formImage, approved: true };
        if (modal.data?.id) await fetch(`/api/testimonials/${modal.data.id}`, { method: 'PUT', headers: h, body: JSON.stringify(body) });
        else await fetch('/api/testimonials', { method: 'POST', headers: h, body: JSON.stringify(body) });
      } else if (modal.type === 'teacher') {
        const body = { name: formName, designation: formField2, experience: formField3, photo: formImage };
        if (modal.data?.id) await fetch(`/api/teachers/${modal.data.id}`, { method: 'PUT', headers: h, body: JSON.stringify(body) });
        else await fetch('/api/teachers', { method: 'POST', headers: h, body: JSON.stringify(body) });
      } else if (modal.type === 'course') {
        const body = { title: formName, description: formField2, duration: formField3, price: formField4, category: formField5 || 'general', features: formField6.split(',').map(f => f.trim()).filter(Boolean), icon: formImage, active: true };
        if (modal.data?.id) await fetch(`/api/courses/${modal.data.id}`, { method: 'PUT', headers: h, body: JSON.stringify(body) });
        else await fetch('/api/courses', { method: 'POST', headers: h, body: JSON.stringify(body) });
      }
      setModal({ type: null });
      loadData(section);
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  async function deleteItem(type: string, id: string) {
    if (!confirm('Delete this item?')) return;
    const h = authHeaders();
    await fetch(`/api/${type}/${id}`, { method: 'DELETE', headers: h });
    loadData(section);
  }

  async function saveBlogPost(publish: boolean) {
    if (!postTitle.trim()) { alert('Enter post title'); return; }
    setLoading(true);
    const h = authHeaders();
    const body = { title: postTitle, content: postContent, category: postCategory, tags: postTags.split(',').map(t => t.trim()).filter(Boolean), featuredImage: postImage, published: publish, excerpt: postContent.substring(0, 150) };
    try {
      if (editingPost?.id) await fetch(`/api/blog/${editingPost.id}`, { method: 'PUT', headers: h, body: JSON.stringify(body) });
      else await fetch('/api/blog', { method: 'POST', headers: h, body: JSON.stringify(body) });
      setShowBlogEditor(false);
      setEditingPost(null);
      setPostTitle(''); setPostContent(''); setPostCategory('career'); setPostTags(''); setPostImage('');
      loadData('blog');
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  async function saveSettings() {
    setLoading(true);
    await fetch('/api/settings', { method: 'PUT', headers: authHeaders(), body: JSON.stringify(settings) });
    alert('Settings saved!');
    setLoading(false);
  }

  async function changePassword() {
    if (newPw !== confirmPw) { alert('Passwords do not match'); return; }
    if (newPw.length < 6) { alert('Min 6 characters'); return; }
    setLoading(true);
    const res = await fetch('/api/auth/password', { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }) });
    const data = await res.json();
    alert(data.success ? 'Password changed!' : data.error || 'Error');
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setLoading(false);
  }

  async function saveHomepage() {
    setLoading(true);
    await fetch('/api/homepage', { method: 'PUT', headers: authHeaders(), body: JSON.stringify(homepageData) });
    alert('Homepage saved!');
    setLoading(false);
  }

  async function saveFooter() {
    setLoading(true);
    await fetch('/api/footer', { method: 'PUT', headers: authHeaders(), body: JSON.stringify(footerData) });
    alert('Footer saved!');
    setLoading(false);
  }

  const menuItems: { key: Section; icon: typeof faTachometerAlt; label: string }[] = [
    { key: 'dashboard', icon: faTachometerAlt, label: 'Dashboard' },
    { key: 'courses', icon: faGraduationCap, label: 'Courses' },
    { key: 'students', icon: faUsers, label: 'Top Students' },
    { key: 'blog', icon: faBlog, label: 'Blog Posts' },
    { key: 'testimonials', icon: faComments, label: 'Testimonials' },
    { key: 'teachers', icon: faChalkboardTeacher, label: 'Teachers' },
    { key: 'homepage', icon: faHome, label: 'Homepage' },
    { key: 'footer', icon: faColumns, label: 'Footer' },
    { key: 'settings', icon: faCog, label: 'Settings' },
  ];

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent to-purple flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">OK ACADEMY</h1>
          </div>
          <h2 className="text-center text-xl font-bold text-secondary mb-6"><FontAwesomeIcon icon={faLock} className="mr-2" />Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <button type="submit" disabled={loginLoading} className="w-full py-3.5 bg-gradient-to-r from-accent to-purple text-white rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition disabled:opacity-50">
              <FontAwesomeIcon icon={loginLoading ? faSpinner : faSignInAlt} spin={loginLoading} className="mr-2" />
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          {loginError && <p className="text-danger text-center mt-4 text-sm">{loginError}</p>}
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-secondary text-white fixed h-full overflow-y-auto hidden md:block">
        <div className="p-5 text-center border-b border-gray-700 bg-[#243342]">
          <h3 className="font-bold"><FontAwesomeIcon icon={faUserShield} className="mr-2" />Admin Panel</h3>
          <p className="text-gray-400 text-sm">OK ACADEMY</p>
        </div>
        <ul className="py-3">
          {menuItems.map(item => (
            <li key={item.key}>
              <button onClick={() => setSection(item.key)} className={`w-full flex items-center gap-3 px-6 py-3.5 text-left text-sm transition ${section === item.key ? 'bg-gray-700 text-white border-l-4 border-primary pl-5' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
                <FontAwesomeIcon icon={item.icon} className="w-5" />{item.label}
              </button>
            </li>
          ))}
          <li>
            <button onClick={logout} className="w-full flex items-center gap-3 px-6 py-3.5 text-left text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition">
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5" />Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-secondary z-50 flex overflow-x-auto px-2 py-2 gap-1">
        {menuItems.map(item => (
          <button key={item.key} onClick={() => setSection(item.key)} className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs whitespace-nowrap ${section === item.key ? 'bg-gray-700 text-white' : 'text-gray-400'}`}>
            <FontAwesomeIcon icon={item.icon} />{item.label}
          </button>
        ))}
        <button onClick={logout} className="flex items-center gap-1.5 px-3 py-2 rounded text-xs text-gray-400 whitespace-nowrap">
          <FontAwesomeIcon icon={faSignOutAlt} />Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 mt-12 md:mt-0">
        {/* Dashboard */}
        {section === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-6"><FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: faGraduationCap, label: 'Courses', count: stats.courses },
                { icon: faUsers, label: 'Top Students', count: stats.students },
                { icon: faBlog, label: 'Blog Posts', count: stats.blog },
                { icon: faComments, label: 'Testimonials', count: stats.testimonials },
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center hover:-translate-y-1 transition">
                  <FontAwesomeIcon icon={s.icon} className="text-3xl text-primary mb-3" />
                  <h3 className="text-sm font-medium text-gray-500">{s.label}</h3>
                  <p className="text-3xl font-bold text-secondary">{s.count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Courses */}
        {section === 'courses' && (
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4"><FontAwesomeIcon icon={faGraduationCap} className="mr-2" />Courses</h2>
            <button onClick={() => openModal('course')} className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition">
              <FontAwesomeIcon icon={faPlus} />Add Course
            </button>
            {courses.length === 0 ? <p className="text-gray-400 italic">No courses added yet.</p> : (
              <div className="space-y-4">
                {courses.map(c => (
                  <div key={c.id} className="bg-white p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-secondary">{c.title}</h4>
                      <p className="text-sm text-gray-500">{c.description}</p>
                      <div className="flex gap-3 mt-1 text-xs text-gray-400">
                        <span>{c.duration}</span>
                        <span>{c.price}</span>
                        <span>{c.category}</span>
                        <span className={c.active ? 'text-green-600' : 'text-red-500'}>{c.active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openModal('course', c as unknown as Record<string, unknown>)} className="p-2 text-primary hover:bg-blue-50 rounded"><FontAwesomeIcon icon={faEdit} /></button>
                      <button onClick={() => deleteItem('courses', String(c.id))} className="p-2 text-danger hover:bg-red-50 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Students */}
        {section === 'students' && (
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4"><FontAwesomeIcon icon={faUsers} className="mr-2" />Top Students</h2>
            <button onClick={() => openModal('student')} className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition">
              <FontAwesomeIcon icon={faPlus} />Add Student
            </button>
            {students.length === 0 ? <p className="text-gray-400 italic">No students added yet.</p> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map(s => (
                  <div key={s.id} className="bg-white p-5 rounded-xl shadow-md text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl text-gray-300">👤</div>
                    <h4 className="font-bold text-secondary">{s.name}</h4>
                    <p className="text-sm text-gray-500">{s.achievement}</p>
                    <div className="flex justify-center gap-2 mt-3">
                      <button onClick={() => openModal('student', s)} className="p-2 text-primary hover:bg-blue-50 rounded"><FontAwesomeIcon icon={faEdit} /></button>
                      <button onClick={() => deleteItem('students', String(s.id))} className="p-2 text-danger hover:bg-red-50 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Blog */}
        {section === 'blog' && (
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4"><FontAwesomeIcon icon={faBlog} className="mr-2" />Blog Posts</h2>
            {!showBlogEditor ? (
              <>
                <button onClick={() => { setShowBlogEditor(true); setEditingPost(null); setPostTitle(''); setPostContent(''); setPostTags(''); setPostImage(''); }} className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition">
                  <FontAwesomeIcon icon={faPlus} />New Post
                </button>
                {blogPosts.length === 0 ? <p className="text-gray-400 italic">No blog posts yet.</p> : (
                  <div className="space-y-4">
                    {blogPosts.map(p => (
                      <div key={p.id} className="bg-white p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="font-bold text-secondary">{p.title}</h4>
                          <p className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString()} • {p.category}</p>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${p.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.published ? 'Published' : 'Draft'}</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingPost(p); setPostTitle(p.title); setPostCategory(p.category); setPostTags(p.tags?.join(', ') || ''); setPostImage(p.featuredImage || ''); setShowBlogEditor(true); fetch(`/api/blog/${p.id}`).then(r => r.json()).then(d => { if (d.data?.content) setPostContent(d.data.content); }); }} className="p-2 text-primary hover:bg-blue-50 rounded"><FontAwesomeIcon icon={faEdit} /></button>
                          <button onClick={() => deleteItem('blog', String(p.id))} className="p-2 text-danger hover:bg-red-50 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <input type="text" placeholder="Post Title..." value={postTitle} onChange={e => setPostTitle(e.target.value)} className="w-full p-3 mb-4 border-2 border-gray-200 rounded-lg text-xl font-bold focus:outline-none focus:border-primary" />
                <div className="flex gap-4 mb-4">
                  <select value={postCategory} onChange={e => setPostCategory(e.target.value)} className="p-2 border rounded-lg">
                    <option value="career">Career Tips</option>
                    <option value="courses">Course Guides</option>
                    <option value="technology">Technology</option>
                    <option value="local">Local Opportunities</option>
                    <option value="success">Success Stories</option>
                  </select>
                  <input type="text" placeholder="Tags (comma separated)" value={postTags} onChange={e => setPostTags(e.target.value)} className="flex-1 p-2 border rounded-lg" />
                </div>
                <ImageUploader currentImage={postImage} onUpload={setPostImage} label="Featured Image" />
                <textarea value={postContent} onChange={e => setPostContent(e.target.value)} rows={12} placeholder="Write your blog post content..." className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary leading-relaxed" />
                <div className="flex gap-3 mt-4">
                  <button onClick={() => saveBlogPost(false)} disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition">
                    <FontAwesomeIcon icon={faSave} />Save Draft
                  </button>
                  <button onClick={() => saveBlogPost(true)} disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 bg-success text-white rounded-lg font-medium hover:bg-green-600 transition">
                    <FontAwesomeIcon icon={loading ? faSpinner : faSave} spin={loading} />Publish
                  </button>
                  <button onClick={() => { setShowBlogEditor(false); setEditingPost(null); }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition">
                    <FontAwesomeIcon icon={faTimes} />Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Testimonials */}
        {section === 'testimonials' && (
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4"><FontAwesomeIcon icon={faComments} className="mr-2" />Testimonials</h2>
            <button onClick={() => openModal('testimonial')} className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition">
              <FontAwesomeIcon icon={faPlus} />Add Testimonial
            </button>
            {testimonials.length === 0 ? <p className="text-gray-400 italic">No testimonials yet.</p> : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map(t => (
                  <div key={t.id} className="bg-white p-5 rounded-xl shadow-md">
                    <div className="text-warning mb-1">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                    <p className="text-gray-600 italic text-sm mb-2">&ldquo;{t.feedback}&rdquo;</p>
                    <p className="text-sm font-bold text-secondary">{t.name} - {t.course}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => openModal('testimonial', t)} className="p-2 text-primary hover:bg-blue-50 rounded"><FontAwesomeIcon icon={faEdit} /></button>
                      <button onClick={() => deleteItem('testimonials', String(t.id))} className="p-2 text-danger hover:bg-red-50 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Teachers */}
        {section === 'teachers' && (
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4"><FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />Teachers</h2>
            <button onClick={() => openModal('teacher')} className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition">
              <FontAwesomeIcon icon={faPlus} />Add Teacher
            </button>
            {teachers.length === 0 ? <p className="text-gray-400 italic">No teachers added yet.</p> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachers.map(t => (
                  <div key={t.id} className="bg-white p-5 rounded-xl shadow-md text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl text-gray-300">👤</div>
                    <h4 className="font-bold text-secondary">{t.name}</h4>
                    <p className="text-sm text-primary">{t.designation}</p>
                    <p className="text-xs text-gray-400">{t.experience}</p>
                    <div className="flex justify-center gap-2 mt-3">
                      <button onClick={() => openModal('teacher', t)} className="p-2 text-primary hover:bg-blue-50 rounded"><FontAwesomeIcon icon={faEdit} /></button>
                      <button onClick={() => deleteItem('teachers', String(t.id))} className="p-2 text-danger hover:bg-red-50 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Homepage */}
        {section === 'homepage' && (
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-6"><FontAwesomeIcon icon={faHome} className="mr-2" />Homepage Settings</h2>
            <div className="space-y-6">
              {/* Section Toggles */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4">Enable/Disable Sections</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(homepageData.sectionsEnabled).map(([key, val]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={val} onChange={e => setHomepageData(prev => ({ ...prev, sectionsEnabled: { ...prev.sectionsEnabled, [key]: e.target.checked } }))} className="w-4 h-4" />
                      <span className="text-sm capitalize">{key}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hero Slides */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4">Hero Slides</h3>
                {homepageData.heroSlides.map((slide, i) => (
                  <div key={i} className="border rounded-lg p-4 mb-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                      <input type="text" placeholder="Title" value={slide.title} onChange={e => { const s = [...homepageData.heroSlides]; s[i] = { ...s[i], title: e.target.value }; setHomepageData(prev => ({ ...prev, heroSlides: s })); }} className="p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                      <input type="text" placeholder="Tagline" value={slide.tagline} onChange={e => { const s = [...homepageData.heroSlides]; s[i] = { ...s[i], tagline: e.target.value }; setHomepageData(prev => ({ ...prev, heroSlides: s })); }} className="p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <textarea placeholder="Intro text" rows={2} value={slide.intro} onChange={e => { const s = [...homepageData.heroSlides]; s[i] = { ...s[i], intro: e.target.value }; setHomepageData(prev => ({ ...prev, heroSlides: s })); }} className="w-full p-2 border rounded-lg text-sm mb-2 focus:outline-none focus:border-primary" />
                    <div className="flex gap-2 items-center">
                      <input type="text" placeholder="Gradient (e.g. from-[#667eea] to-[#764ba2])" value={slide.gradient} onChange={e => { const s = [...homepageData.heroSlides]; s[i] = { ...s[i], gradient: e.target.value }; setHomepageData(prev => ({ ...prev, heroSlides: s })); }} className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                      <button onClick={() => { const s = homepageData.heroSlides.filter((_, idx) => idx !== i); setHomepageData(prev => ({ ...prev, heroSlides: s })); }} className="p-2 text-danger hover:bg-red-50 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                    <ImageUploader currentImage={slide.image} onUpload={val => { const s = [...homepageData.heroSlides]; s[i] = { ...s[i], image: val }; setHomepageData(prev => ({ ...prev, heroSlides: s })); }} label={`Background Image for Slide ${i + 1}`} className="mt-4" />
                  </div>
                ))}
                <button onClick={() => setHomepageData(prev => ({ ...prev, heroSlides: [...prev.heroSlides, { gradient: 'from-[#667eea] to-[#764ba2]', title: '', tagline: '', intro: '', image: '' }] }))} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
                  <FontAwesomeIcon icon={faPlus} />Add Slide
                </button>
              </div>

              {/* Features */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4">Features Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Heading</label>
                    <input type="text" value={homepageData.featuresHeading} onChange={e => setHomepageData(prev => ({ ...prev, featuresHeading: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Subheading</label>
                    <input type="text" value={homepageData.featuresSubheading} onChange={e => setHomepageData(prev => ({ ...prev, featuresSubheading: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                {homepageData.features.map((f, i) => (
                  <div key={i} className="border rounded-lg p-3 mb-2 flex gap-3 items-start">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input type="text" placeholder="Title" value={f.title} onChange={e => { const arr = [...homepageData.features]; arr[i] = { ...arr[i], title: e.target.value }; setHomepageData(prev => ({ ...prev, features: arr })); }} className="p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                      <input type="text" placeholder="Description" value={f.description} onChange={e => { const arr = [...homepageData.features]; arr[i] = { ...arr[i], description: e.target.value }; setHomepageData(prev => ({ ...prev, features: arr })); }} className="p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                      <select value={f.icon} onChange={e => { const arr = [...homepageData.features]; arr[i] = { ...arr[i], icon: e.target.value }; setHomepageData(prev => ({ ...prev, features: arr })); }} className="p-2 border rounded-lg text-sm">
                        <option value="faLaptopCode">Laptop Code</option>
                        <option value="faCertificate">Certificate</option>
                        <option value="faBriefcase">Briefcase</option>
                        <option value="faRupeeSign">Rupee</option>
                        <option value="faClock">Clock</option>
                        <option value="faDesktop">Desktop</option>
                      </select>
                    </div>
                    <button onClick={() => { const arr = homepageData.features.filter((_, idx) => idx !== i); setHomepageData(prev => ({ ...prev, features: arr })); }} className="p-2 text-danger hover:bg-red-50 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                ))}
                <button onClick={() => setHomepageData(prev => ({ ...prev, features: [...prev.features, { title: '', description: '', icon: 'faLaptopCode' }] }))} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
                  <FontAwesomeIcon icon={faPlus} />Add Feature
                </button>
              </div>

              {/* CTA */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4">CTA Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Heading</label>
                    <input type="text" value={homepageData.ctaHeading} onChange={e => setHomepageData(prev => ({ ...prev, ctaHeading: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <input type="text" value={homepageData.ctaDescription} onChange={e => setHomepageData(prev => ({ ...prev, ctaDescription: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                    <input type="text" value={homepageData.ctaPhone} onChange={e => setHomepageData(prev => ({ ...prev, ctaPhone: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              <div className="text-right">
                <button onClick={saveHomepage} disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 bg-success text-white rounded-lg font-semibold hover:bg-green-600 transition">
                  <FontAwesomeIcon icon={loading ? faSpinner : faSave} spin={loading} />Save Homepage
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {section === 'footer' && (
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-6"><FontAwesomeIcon icon={faColumns} className="mr-2" />Footer Settings</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4">General</h3>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                  <textarea rows={2} value={footerData.description} onChange={e => setFooterData(prev => ({ ...prev, description: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                    <input type="text" value={footerData.address} onChange={e => setFooterData(prev => ({ ...prev, address: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                    <input type="text" value={footerData.phone} onChange={e => setFooterData(prev => ({ ...prev, phone: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    <input type="text" value={footerData.email} onChange={e => setFooterData(prev => ({ ...prev, email: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Timing</label>
                    <input type="text" value={footerData.timing} onChange={e => setFooterData(prev => ({ ...prev, timing: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Copyright Text</label>
                  <input type="text" value={footerData.copyrightText} onChange={e => setFooterData(prev => ({ ...prev, copyrightText: e.target.value }))} className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4"><FontAwesomeIcon icon={faLink} className="mr-2" />Quick Links</h3>
                {footerData.quickLinks.map((link, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" placeholder="Label" value={link.label} onChange={e => { const arr = [...footerData.quickLinks]; arr[i] = { ...arr[i], label: e.target.value }; setFooterData(prev => ({ ...prev, quickLinks: arr })); }} className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                    <input type="text" placeholder="URL" value={link.href} onChange={e => { const arr = [...footerData.quickLinks]; arr[i] = { ...arr[i], href: e.target.value }; setFooterData(prev => ({ ...prev, quickLinks: arr })); }} className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                    <button onClick={() => { const arr = footerData.quickLinks.filter((_, idx) => idx !== i); setFooterData(prev => ({ ...prev, quickLinks: arr })); }} className="p-2 text-danger hover:bg-red-50 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                ))}
                <button onClick={() => setFooterData(prev => ({ ...prev, quickLinks: [...prev.quickLinks, { href: '/', label: '' }] }))} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
                  <FontAwesomeIcon icon={faPlus} />Add Link
                </button>
              </div>

              {/* Popular Courses */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4">Popular Courses (Footer)</h3>
                {footerData.popularCourses.map((course, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" placeholder="Course name" value={course} onChange={e => { const arr = [...footerData.popularCourses]; arr[i] = e.target.value; setFooterData(prev => ({ ...prev, popularCourses: arr })); }} className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                    <button onClick={() => { const arr = footerData.popularCourses.filter((_, idx) => idx !== i); setFooterData(prev => ({ ...prev, popularCourses: arr })); }} className="p-2 text-danger hover:bg-red-50 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                ))}
                <button onClick={() => setFooterData(prev => ({ ...prev, popularCourses: [...prev.popularCourses, ''] }))} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
                  <FontAwesomeIcon icon={faPlus} />Add Course
                </button>
              </div>

              {/* Social Links */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4"><FontAwesomeIcon icon={faFacebook} className="mr-2" />Social Media Links</h3>
                {footerData.socialLinks.map((social, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <select value={social.platform} onChange={e => { const arr = [...footerData.socialLinks]; arr[i] = { ...arr[i], platform: e.target.value }; setFooterData(prev => ({ ...prev, socialLinks: arr })); }} className="p-2 border rounded-lg text-sm">
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                    <input type="url" placeholder="URL" value={social.href} onChange={e => { const arr = [...footerData.socialLinks]; arr[i] = { ...arr[i], href: e.target.value }; setFooterData(prev => ({ ...prev, socialLinks: arr })); }} className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                    <button onClick={() => { const arr = footerData.socialLinks.filter((_, idx) => idx !== i); setFooterData(prev => ({ ...prev, socialLinks: arr })); }} className="p-2 text-danger hover:bg-red-50 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                ))}
                <button onClick={() => setFooterData(prev => ({ ...prev, socialLinks: [...prev.socialLinks, { href: '', platform: 'facebook' }] }))} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
                  <FontAwesomeIcon icon={faPlus} />Add Social Link
                </button>
              </div>

              <div className="text-right">
                <button onClick={saveFooter} disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 bg-success text-white rounded-lg font-semibold hover:bg-green-600 transition">
                  <FontAwesomeIcon icon={loading ? faSpinner : faSave} spin={loading} />Save Footer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {section === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-6"><FontAwesomeIcon icon={faCog} className="mr-2" />Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4"><FontAwesomeIcon icon={faPhone} className="text-primary mr-2" />Contact Information</h3>
                {[
                  { label: 'Phone', key: 'phone' as const, ph: '+91 9876543210' },
                  { label: 'WhatsApp', key: 'whatsapp' as const, ph: '+91 9876543210' },
                  { label: 'Email', key: 'email' as const, ph: 'info@okacademy...' },
                  { label: 'Address', key: 'address' as const, ph: 'Full Address' },
                ].map(f => (
                  <div key={f.key} className="mb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">{f.label}</label>
                    {f.key === 'address' ? (
                      <textarea rows={2} value={settings[f.key]} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} placeholder={f.ph} className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                    ) : (
                      <input type="text" value={settings[f.key]} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} placeholder={f.ph} className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4"><FontAwesomeIcon icon={faFacebook} className="text-primary mr-2" />Social Media</h3>
                {[
                  { label: 'Facebook', key: 'facebook' as const, icon: faFacebook },
                  { label: 'Instagram', key: 'instagram' as const, icon: faInstagram },
                  { label: 'YouTube', key: 'youtube' as const, icon: faYoutube },
                ].map(f => (
                  <div key={f.key} className="mb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-1"><FontAwesomeIcon icon={f.icon} className="mr-1" />{f.label}</label>
                    <input type="url" value={settings[f.key]} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} placeholder={`https://${f.key}.com/okacademy`} className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                ))}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-secondary mb-4"><FontAwesomeIcon icon={faKey} className="text-primary mr-2" />Change Password</h3>
                <div className="mb-3"><label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label><input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" /></div>
                <div className="mb-3"><label className="block text-sm font-medium text-gray-600 mb-1">New Password</label><input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" /></div>
                <div className="mb-4"><label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label><input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" /></div>
                <button onClick={changePassword} disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition">
                  <FontAwesomeIcon icon={faSave} />Update Password
                </button>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button onClick={saveSettings} disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 bg-success text-white rounded-lg font-semibold hover:bg-green-600 transition">
                <FontAwesomeIcon icon={loading ? faSpinner : faSave} spin={loading} />Save All Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setModal({ type: null })}>
          <div className="bg-white p-6 rounded-2xl w-full max-w-md animate-fadeIn" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-secondary mb-4">
              <FontAwesomeIcon icon={modal.type === 'student' ? faUsers : modal.type === 'testimonial' ? faComments : modal.type === 'course' ? faGraduationCap : faChalkboardTeacher} className="text-primary mr-2" />
              {modal.data?.id ? 'Edit' : 'Add'} {modal.type === 'student' ? 'Student' : modal.type === 'testimonial' ? 'Testimonial' : modal.type === 'course' ? 'Course' : 'Teacher'}
            </h3>
            <form onSubmit={saveModalData}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">{modal.type === 'course' ? 'Title *' : 'Name *'}</label>
                <input type="text" required value={formName} onChange={e => setFormName(e.target.value)} className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">{modal.type === 'student' ? 'Achievement' : modal.type === 'testimonial' ? 'Course *' : modal.type === 'course' ? 'Description' : 'Designation *'}</label>
                {modal.type === 'course' ? (
                  <textarea rows={2} value={formField2} onChange={e => setFormField2(e.target.value)} className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
                ) : (
                  <input type="text" required={modal.type !== 'student'} value={formField2} onChange={e => setFormField2(e.target.value)} className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
                )}
              </div>
              {(modal.type === 'testimonial' || modal.type === 'teacher' || modal.type === 'course') && (
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">{modal.type === 'testimonial' ? 'Feedback *' : modal.type === 'course' ? 'Duration' : 'Experience *'}</label>
                  {modal.type === 'testimonial' ? (
                    <textarea required rows={3} value={formField3} onChange={e => setFormField3(e.target.value)} className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
                  ) : (
                    <input type="text" required={modal.type === 'teacher'} value={formField3} onChange={e => setFormField3(e.target.value)} placeholder={modal.type === 'course' ? 'e.g., 3 Months' : 'e.g., 10+ Years'} className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
                  )}
                </div>
              )}
              {modal.type === 'course' && (
                <>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
                    <input type="text" value={formField4} onChange={e => setFormField4(e.target.value)} placeholder="e.g., ₹6,500" className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                    <input type="text" value={formField5} onChange={e => setFormField5(e.target.value)} placeholder="e.g., office, design, web" className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Features (comma separated)</label>
                    <input type="text" value={formField6} onChange={e => setFormField6(e.target.value)} placeholder="Word, Excel, PowerPoint" className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
                  </div>
                </>
              )}
              {modal.type === 'testimonial' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(v => (
                      <span key={v} onClick={() => setFormRating(v)} className={`text-2xl cursor-pointer ${v <= formRating ? 'text-warning' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <ImageUploader 
                  currentImage={formImage} 
                  onUpload={setFormImage} 
                  label={modal.type === 'course' ? 'Course Thumbnail / Icon' : modal.type === 'student' ? 'Student Photo' : modal.type === 'testimonial' ? 'Reviewer Photo' : 'Teacher Photo'} 
                />
              </div>

              <div className="flex gap-3 justify-end mt-6 pt-4 border-t">
                <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition">
                  <FontAwesomeIcon icon={loading ? faSpinner : faSave} spin={loading} />Save
                </button>
                <button type="button" onClick={() => setModal({ type: null })} className="px-5 py-2.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
