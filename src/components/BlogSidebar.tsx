'use client';

import { useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faFire,
  faNewspaper,
  faTags,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

interface BlogPost {
  id: number;
  title: string;
  date: string;
}

interface BlogSidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: 'all', label: 'All Posts' },
  { value: 'career', label: 'Career Tips' },
  { value: 'courses', label: 'Course Guides' },
  { value: 'technology', label: 'Technology' },
  { value: 'local', label: 'Local Opportunities' },
  { value: 'success', label: 'Success Stories' },
];

const tags = [
  'Computer Course',
  'Kurawli',
  'Mainpuri Jobs',
  'MS Office',
  'Web Development',
  'Tally',
  'Career Growth',
  'Local Education',
];

export default function BlogSidebar({ activeCategory, onCategoryChange }: BlogSidebarProps) {
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterMsg, setNewsletterMsg] = useState('');

  useEffect(() => {
    async function fetchPopular() {
      try {
        const res = await fetch('/api/blog');
        if (res.ok) {
          const data = await res.json();
          const posts = Array.isArray(data) ? data : data.posts || [];
          setPopularPosts(posts.slice(0, 3));
        }
      } catch {
        // fallback handled by empty array
      } finally {
        setLoadingPosts(false);
      }
    }
    fetchPopular();
  }, []);

  const handleNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    setNewsletterMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (res.ok) {
        setNewsletterMsg('Subscribed successfully!');
        setNewsletterEmail('');
      } else {
        throw new Error();
      }
    } catch {
      setNewsletterMsg('Failed to subscribe. Try again.');
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <aside className="w-full lg:w-[280px] shrink-0 space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-secondary mb-4">
          <FontAwesomeIcon icon={faFolder} className="w-4 h-4 text-accent" />
          Categories
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => onCategoryChange(cat.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-accent'
                }`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-secondary mb-4">
          <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-orange-500" />
          Popular Posts
        </h3>
        {loadingPosts ? (
          <div className="flex items-center justify-center py-4 text-gray-400">
            <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
          </div>
        ) : popularPosts.length > 0 ? (
          <div className="space-y-3">
            {popularPosts.map((post) => (
              <div key={post.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-secondary hover:text-accent transition-colors cursor-pointer leading-snug">
                  {post.title}
                </p>
                <span className="text-xs text-gray-400 mt-1 block">
                  {formatDate(post.date)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No posts yet.</p>
        )}
      </div>

      {/* Newsletter */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-secondary mb-2">
          <FontAwesomeIcon icon={faNewspaper} className="w-4 h-4 text-accent" />
          Newsletter
        </h3>
        <p className="text-sm text-gray-500 mb-3">Subscribe for latest updates</p>
        <form onSubmit={handleNewsletter} className="space-y-2">
          <input
            type="email"
            required
            placeholder="Your Email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
          />
          <button
            type="submit"
            disabled={newsletterSubmitting}
            className="w-full px-4 py-2 bg-gradient-to-r from-accent to-purple text-white text-sm font-medium rounded-lg hover:shadow-md transition-all disabled:opacity-60"
          >
            {newsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {newsletterMsg && (
          <p className="text-xs mt-2 text-center text-gray-500">{newsletterMsg}</p>
        )}
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-secondary mb-4">
          <FontAwesomeIcon icon={faTags} className="w-4 h-4 text-accent" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
