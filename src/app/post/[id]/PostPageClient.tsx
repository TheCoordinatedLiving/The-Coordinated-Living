"use client";
import PostTemplate from '@/components/PostTemplate';
import { Post } from '@/lib/posts';
import { useEffect } from 'react';

interface PostPageClientProps {
  post: Post;
}

export default function PostPageClient({ post }: PostPageClientProps) {
  // Add structured data for SEO without changing content
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.content ? post.content.substring(0, 160) : "The Coordinated Living",
      "author": {
        "@type": "Organization",
        "name": "The Coordinated Living",
        "url": "https://www.thecoordinatedliving.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "The Coordinated Living",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.thecoordinatedliving.com/coordinated-new.webp"
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.thecoordinatedliving.com/post/${post.id}`
      },
      "keywords": [
        "The Coordinated Living",
        "purpose",
        "fulfillment",
        "daily reflections"
      ],
      "articleSection": "The Coordinated Living",
      "inLanguage": "en-US"
    };

    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [post]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Visit Website Button */}
        <div className="mb-8 flex justify-start">
          <button 
            onClick={() => window.location.href = '/'}
            className="text-white px-6 py-3 rounded-full hover:opacity-90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            style={{ fontFamily: 'Amita, serif', backgroundColor: '#5C3C6E' }}
          >
            <span>Visit Website for Full Experience</span>
          </button>
        </div>
        
        {/* Post Content - No white card wrapper */}
        <PostTemplate
          title={post.title}
          content={post.content}
          images={post.images}
        />
      </div>
    </div>
  );
} 