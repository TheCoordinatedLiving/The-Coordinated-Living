import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllGuides, Guide } from '../../lib/guides';

const BookCard = ({ image, title, description }: { image: string, title: string, description: string }) => (
  <div className="text-center flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform duration-200">
    <div className="w-40 h-56 relative mb-4">
      <Image 
        src={image} 
        alt={title} 
        fill
        className="rounded-md object-cover"
        sizes="160px"
      />
    </div>
    <h3 className="font-semibold text-md mb-1 text-black">{title}</h3>
    <p className="text-xs text-black max-w-xs mb-3">{description}</p>
    <button 
      className="text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
      style={{ backgroundColor: '#50A0D8' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#3B7BB3';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#50A0D8';
      }}
      onClick={(e) => {
        e.stopPropagation();
        console.log(`Downloading ${title}`);
        // Add download functionality here
      }}
    >
      Download
    </button>
  </div>
);

const BooksContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch guides from Airtable on component mount
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const apiGuides = await getAllGuides();
        setGuides(apiGuides);
      } catch (error) {
        console.error('Error fetching guides:', error);
        // Fallback to hardcoded guides
        setGuides([
          { id: '1', title: 'Guide 1', description: 'Brief description of the first guide content and what it covers' },
          { id: '2', title: 'Guide 2', description: 'Brief description of the second guide content and what it covers' },
          { id: '3', title: 'Guide 3', description: 'Brief description of the third guide content and what it covers' },
          { id: '4', title: 'Guide 4', description: 'Brief description of the fourth guide content and what it covers' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  // Transform guides to book format for display
  const books = guides.map((guide, index) => ({
    image: `/keep/book${(index % 4) + 1}.svg`, // Cycle through available book images
    title: guide.title,
    description: guide.description,
    downloadUrl: guide.downloadUrl
  }));

  // Filter books based on search query
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 w-full h-full overflow-y-auto bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-12">
        <div className="max-w-xl">
          <h1 className="text-2xl font-semibold text-black mb-2" style={{ fontFamily: 'Amita, serif' }}>Practical Guides for Your Journey</h1>
          <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Seeking guidance on specific areas or situations in life? Our downloadable resources are helpful guides designed to equip you with practical steps and biblical principles. Explore these resources to experience His abounding grace as you navigate specific scenes of life and grow in faith.
          </p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search For Guides" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md py-2 pl-4 pr-10 w-72 text-sm text-black placeholder-black focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading guides...</div>
        </div>
      )}
      
      {/* Books Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredBooks.map((book, index) => (
            <BookCard key={index} image={book.image} title={book.title} description={book.description} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksContent; 