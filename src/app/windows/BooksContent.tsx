import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllGuides, Guide } from '../../lib/guides';

const BookCard = ({ image, title, description, downloadUrl }: { image: string, title: string, description: string, downloadUrl?: string }) => (
  <div className="text-center flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform duration-200">
    <div className="w-40 h-56 relative mb-4">
      <Image 
        src={image} 
        alt={title} 
        fill
        className="rounded-2xl object-cover"
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
        if (downloadUrl) {
          window.open(downloadUrl, '_blank');
        } else {
          console.log(`No download URL for ${title}`);
        }
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
    image: guide.coverImage || `/keep/book${(index % 4) + 1}.svg`, // Use cover image from Airtable or fallback
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <BookCard key={index} image={book.image} title={book.title} description={book.description} downloadUrl={book.downloadUrl} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-64">
              <div className="text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Guides Available</h3>
                <p className="text-gray-600">Check back later for new guides!</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksContent; 