'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFolder, faFire, faNewspaper, faTags, faCalendar, faBriefcase, faGraduationCap, faHandshake, faMapMarkerAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface BlogPost {
  id?: number;
  title: string;
  excerpt?: string;
  content?: string;
  category: string;
  date?: string;
  createdAt?: string;
  featured?: boolean;
  featuredImage?: string;
}



const categories = ['all', 'career', 'courses', 'technology', 'local', 'success'];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  useEffect(() => {
    fetch('/api/blog').then(r => r.json()).then(data => {
      if (data.success && data.data?.length > 0) {
        setPosts(data.data);
        setFilteredPosts(data.data);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  function filterPosts(category: string) {
    setActiveCategory(category);
    let result = posts;
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (searchQuery) result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredPosts(result);
  }

  function handleSearch() {
    let result = posts;
    if (activeCategory !== 'all') result = result.filter(p => p.category === activeCategory);
    if (searchQuery) result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredPosts(result);
  }

  async function subscribeNewsletter(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: newsletterEmail }) });
      const data = await res.json();
      setNewsletterMsg(data.success ? 'Thank you for subscribing!' : data.error || 'Already subscribed');
      if (data.success) setNewsletterEmail('');
    } catch { setNewsletterMsg('Error. Please try again.'); }
    setTimeout(() => setNewsletterMsg(''), 3000);
  }

  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const featured = posts.find(p => p.featured) || posts[0];
  const otherPosts = filteredPosts.filter(p => p !== featured);

  return (
    <>
      <section className="bg-gradient-to-br from-accent to-purple text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">OK ACADEMY Blog</h1>
          <p className="text-lg opacity-90 mb-6">Tips, insights, and updates about computer education</p>
          <div className="max-w-md mx-auto flex">
            <input type="text" placeholder="Search blog posts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} className="flex-1 px-5 py-3 rounded-l-full text-gray-800 focus:outline-none" />
            <button onClick={handleSearch} className="px-6 py-3 bg-secondary text-white rounded-r-full"><FontAwesomeIcon icon={faSearch} /></button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="font-bold text-secondary mb-3 pb-2 border-b-2"><FontAwesomeIcon icon={faFolder} className="mr-2" />Categories</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <button onClick={() => filterPosts(cat)} className={`w-full text-left px-3 py-1.5 rounded text-sm transition ${activeCategory === cat ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}>
                    {cat === 'all' ? 'All Posts' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="font-bold text-secondary mb-3 pb-2 border-b-2"><FontAwesomeIcon icon={faFire} className="mr-2" />Popular Posts</h3>
            {posts.slice(0, 3).map((p, i) => (
              <div key={i} className="py-2 border-b last:border-0">
                <p className="text-sm font-medium text-secondary">{p.title}</p>
                <span className="text-xs text-gray-400">{formatDate(p.date || p.createdAt)}</span>
              </div>
            ))}
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="font-bold text-secondary mb-3 pb-2 border-b-2"><FontAwesomeIcon icon={faNewspaper} className="mr-2" />Newsletter</h3>
            <p className="text-sm text-gray-500 mb-3">Subscribe for latest updates</p>
            <form onSubmit={subscribeNewsletter} className="space-y-2">
              <input type="email" required placeholder="Your Email" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
              <button type="submit" className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold">Subscribe</button>
            </form>
            {newsletterMsg && <p className="text-xs mt-2 text-success">{newsletterMsg}</p>}
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="font-bold text-secondary mb-3 pb-2 border-b-2"><FontAwesomeIcon icon={faTags} className="mr-2" />Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Computer Course', 'Kurawli', 'Mainpuri Jobs', 'MS Office', 'Web Development', 'Tally', 'Career Growth'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 hover:bg-primary hover:text-white transition cursor-pointer">{tag}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-h-[500px]">
          {loading ? (
            <div className="text-center py-12 text-gray-400"><FontAwesomeIcon icon={faSpinner} spin className="mr-2" />Loading blog posts...</div>
          ) : (
            <>
              {featured && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-[250px_1fr]">
                  {featured.featuredImage && featured.featuredImage.startsWith('data:image') ? (
                    <div className="h-48 md:h-auto bg-gray-100">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={featured.featuredImage} alt={featured.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-48 md:h-auto bg-gray-100 flex items-center justify-center"><FontAwesomeIcon icon={faNewspaper} className="text-4xl text-gray-300" /></div>
                  )}
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-warning to-danger text-white rounded-full text-xs font-semibold mb-2">Featured</span>
                    <h3 className="text-xl font-bold text-secondary mb-2">{featured.title}</h3>
                    <p className="text-sm text-gray-400 mb-2"><FontAwesomeIcon icon={faCalendar} className="mr-1" />{formatDate(featured.date || featured.createdAt)} | <FontAwesomeIcon icon={faFolder} className="mr-1" />{featured.category}</p>
                    <p className="text-gray-600 text-sm mb-4">{featured.excerpt || featured.content?.substring(0, 150)}</p>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                {otherPosts.map((post, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-[200px_1fr] hover:-translate-y-1 transition">
                    {post.featuredImage && post.featuredImage.startsWith('data:image') ? (
                      <div className="h-40 md:h-auto bg-gray-100">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-40 md:h-auto bg-gray-100 flex items-center justify-center"><FontAwesomeIcon icon={faNewspaper} className="text-3xl text-gray-300" /></div>
                    )}
                    <div className="p-5">
                      <h3 className="font-bold text-secondary mb-1">{post.title}</h3>
                      <p className="text-xs text-gray-400 mb-2"><FontAwesomeIcon icon={faCalendar} className="mr-1" />{formatDate(post.date || post.createdAt)} | {post.category}</p>
                      <p className="text-gray-600 text-sm">{post.excerpt || post.content?.substring(0, 120)}</p>
                    </div>
                  </div>
                ))}
                {otherPosts.length === 0 && <p className="text-center text-gray-400 py-8">No posts found.</p>}
              </div>
            </>
          )}

          {/* Local Opportunities */}
          <section className="bg-gray-50 p-6 rounded-xl mt-8">
            <h2 className="text-xl font-bold text-secondary mb-4"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mr-2" />Local Opportunities in Mainpuri</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: faBriefcase, title: 'Computer Jobs', desc: 'Latest computer job openings in Mainpuri district' },
                { icon: faGraduationCap, title: 'Exam Updates', desc: 'Upcoming computer certification exams in UP' },
                { icon: faHandshake, title: 'Internships', desc: 'Local internship opportunities for students' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-xl text-center">
                  <FontAwesomeIcon icon={item.icon} className="text-2xl text-primary mb-2" />
                  <h3 className="font-bold text-secondary text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-accent to-purple text-white p-8 rounded-xl text-center mt-8">
            <h2 className="text-xl font-bold mb-2">Want to Write for Us?</h2>
            <p className="opacity-90 mb-4">Are you a student with success stories to share?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full font-semibold hover:-translate-y-0.5 transition">Submit Your Story</Link>
          </section>
        </div>
      </main>
    </>
  );
}
