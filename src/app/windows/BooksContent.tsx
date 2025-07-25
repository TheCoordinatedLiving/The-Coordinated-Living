import React from 'react';
import Image from 'next/image';

const BookCard = ({ image, title, description }: { image: string, title: string, description: string }) => (
  <div className="text-center flex flex-col items-center">
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
    <p className="text-xs text-gray-500 max-w-xs">{description}</p>
  </div>
);

const BooksContent = () => {
  const books = [
    { image: '/keep/book1.svg', title: 'Heart Of Counseling', description: 'A faith-centred guide to compassionate and purposeful counseling.' },
    { image: '/keep/book2.svg', title: 'Counselling & Therapy', description: 'A guide to healing through faith-based counselling and therapy.' },
    { image: '/keep/book3.svg', title: 'Preparing For Marriage', description: 'A faith-centred guide to compassionate and purposeful counseling.' },
    { image: '/keep/book4.svg', title: 'Heart Of Counselling', description: 'A faith-centred guide to compassionate and purposeful counseling.' },
  ];

  return (
    <div className="p-8 w-full h-full overflow-y-auto bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-12">
        <div className="max-w-xl">
          <h1 className="text-2xl font-semibold text-black mb-2">Practical Guides for Your Journey</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Seeking guidance on specific areas or situations in life? Our downloadable resources are helpful guides designed to equip you with practical steps and biblical principles. Explore these resources to experience His abounding grace as you navigate specific scenes of life and grow in faith.
          </p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search For Books" 
            className="border border-gray-300 rounded-md py-2 pl-4 pr-10 w-72 text-sm placeholder-black focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {books.map((book, index) => (
          <BookCard key={index} image={book.image} title={book.title} description={book.description} />
        ))}
      </div>
    </div>
  );
};

export default BooksContent; 