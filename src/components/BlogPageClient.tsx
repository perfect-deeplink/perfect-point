'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BlogContent from './BlogContent';

export default function BlogPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    setSearchQuery(inputValue.trim());
  };

  return (
    <>
      {/* Search Box */}
      <div className="max-w-xl mx-auto mb-10 -mt-4">
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-3 outline-none text-sm"
          />
          <button
            onClick={handleSearch}
            className="px-5 bg-gradient-to-r from-accent to-purple text-white hover:opacity-90 transition-opacity"
          >
            <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
          </button>
        </div>
      </div>

      <BlogContent searchQuery={searchQuery} />
    </>
  );
}
