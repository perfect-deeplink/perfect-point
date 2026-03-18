'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNewspaper,
  faCalendar,
  faFolder,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import BlogSidebar from './BlogSidebar';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  featured?: boolean;
}



function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogContent({ searchQuery }: { searchQuery: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog');
        if (res.ok) {
          const data = await res.json();
          const fetched = Array.isArray(data) ? data : data.data || [];
          setPosts(fetched);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter((p) => p !== featuredPost);

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <BlogSidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="flex-1 flex items-center justify-center py-20 text-gray-400">
          <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 animate-spin" />
          <span className="ml-3 text-lg">Loading blog posts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <BlogSidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="flex-1 min-w-0">
        {/* Featured Post */}
        {featuredPost && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center min-h-[200px]">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="w-16 h-16 text-accent/30"
                />
              </div>
              <div className="md:w-3/5 p-6">
                <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full mb-3">
                  Featured
                </span>
                <h3 className="text-xl font-bold text-secondary mb-2 hover:text-accent transition-colors cursor-pointer">
                  {featuredPost.title}
                </h3>
                <p className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                    {formatDate(featuredPost.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faFolder} className="w-3 h-3" />
                    {capitalize(featuredPost.category)}
                  </span>
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {featuredPost.excerpt}
                </p>
                <button className="px-4 py-2 border border-accent text-accent text-sm font-medium rounded-lg hover:bg-accent hover:text-white transition-colors duration-300">
                  Read More
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {otherPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {otherPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    className="w-10 h-10 text-accent/20"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-secondary mb-2 hover:text-accent transition-colors cursor-pointer line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faFolder} className="w-3 h-3" />
                      {capitalize(post.category)}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
                    {post.excerpt}
                  </p>
                  <button className="px-3 py-1.5 border border-accent text-accent text-xs font-medium rounded-lg hover:bg-accent hover:text-white transition-colors duration-300">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-400 mb-8">
            <FontAwesomeIcon icon={faNewspaper} className="w-12 h-12 mb-4 text-gray-200" />
            <p className="text-lg">No blog posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
