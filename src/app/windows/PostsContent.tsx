import React, { useState } from 'react';

interface Post {
  id: number;
  header: string;
  description: string;
  x: number;
  y: number;
}

// Helper function to truncate text
const truncateText = (text: string, wordCount: number): string => {
  const words = text.split(' ');
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + ' -';
};

const PostCard = ({ post, onClick }: { post: Post; onClick: () => void }) => {
  const truncatedTitle = truncateText(post.header, 3);
  const truncatedDescription = truncateText(post.description, 6);

  return (
    <div 
      style={{ position: 'absolute', top: post.y, left: post.x }}
      className="bg-white border border-gray-200 rounded-lg p-4 h-40 w-64 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <h3 className="font-semibold text-lg mb-1 text-black">{truncatedTitle}</h3>
        <p className="text-sm text-black">{truncatedDescription}</p>
      </div>
    </div>
  );
};

const PostModal = ({ post, onClose }: { post: Post | null; onClose: () => void }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Glass background blur */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
        onClick={onClose}
      />
      
      {/* Return to Posts button - top left */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer"
      >
        Return to Posts
      </button>
      
      {/* Modal content - centered */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative z-10 max-w-2xl w-full">
          {/* White card with content */}
          <div 
            className="p-8 text-center"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '0px',
              boxShadow: '10.23px 10.23px 0px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Post Title */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                {post.header}
              </h1>
              <div className="w-16 h-0.5 bg-gray-900 mx-auto"></div>
            </div>
            
            {/* Post Content */}
            <div className="text-left">
              <p className="text-gray-700 leading-relaxed">
                {post.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostsContent = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const posts: Post[] = [
    { 
      id: 1, 
      header: 'A THOUSAND TIMES I FAILED', 
      description: '"A thousand times I failed, still your mercy remains, should I stumble out here still I\'m caught in your grace." This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today. For years, I pursued other paths, pouring tireless effort into fields he hadn\'t called me to, only to find no lasting fruit. That rollercoaster of emotions, the unpleasant experiences, the endless accusations and judgments thrown around – they\'re hallmarks of a mind out of alignment. Want to know the root cause? It\'s simply a lack of trust in the Father. No matter how you rationalize it, we constantly try to force a fit where there isn\'t one. But in Christ, we step into the true identity the Father created for us. This identity comes with specific tasks, assignments, and responsibilities, all of which we are perfectly equipped for. It\'s there we discover an unexplainable peace, joy, and confidence. When we align ourselves with God\'s purpose for our lives, we find a peace that surpasses all understanding. This isn\'t about perfection – it\'s about walking in the identity He has given us, trusting that He has equipped us for every good work.', 
      x: 0, 
      y: 0 
    },
    { 
      id: 2, 
      header: 'IN ALL THINGS GOD WORKS', 
      description: '"In all things God works for the good of those who love him." This promise from Romans 8:28 has been my anchor through many storms. When life seems chaotic and uncertain, this truth reminds me that God is always at work. Too often we try to control every aspect of our lives, forgetting that we serve a God who sees the bigger picture. Our limited perspective can\'t comprehend the intricate ways He weaves our experiences together for His glory and our good. Trusting God doesn\'t mean we become passive or indifferent to our circumstances. Instead, it means we actively seek His will while resting in His sovereignty. We pray, we work, we serve, but we do so with open hands. The peace that comes from this kind of trust is unlike anything the world can offer. It\'s not dependent on circumstances, but on the unchanging character of our Heavenly Father who loves us beyond measure. As we learn to trust God more deeply, we begin to see His hand in every detail of our lives. What once seemed like random events become part of a beautiful tapestry He\'s weaving for our good and His glory.', 
      x: 280, 
      y: 0 
    },
    { 
      id: 3, 
      header: 'BE STILL AND KNOW', 
      description: '"Be still and know that I am God." These words from Psalm 46:10 have become increasingly precious to me in our fast-paced world. In the midst of constant noise and endless demands, God calls us to stillness. Stillness isn\'t just about physical quiet, though that\'s important. It\'s about quieting our hearts and minds before the Lord, allowing His peace to wash over us and His voice to be heard above the chaos. In those moments of stillness, we remember who God is and who we are in Him. We\'re reminded that He is sovereign, He is good, and He is working all things together for our good. The world tells us to hustle, to strive, to never stop moving. But God invites us to rest in Him, to find our strength in quietness and trust. This is the counter-cultural way of the Kingdom. As we practice stillness, we discover that God\'s presence is our greatest treasure. In Him we find rest for our souls, peace for our minds, and strength for our journey.', 
      x: 0, 
      y: 200 
    },
    { 
      id: 4, 
      header: 'A CHEERFUL GIFT', 
      description: 'Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform. Thank you for your kindness!', 
      x: 280, 
      y: 200 
    },
  ];

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="p-8 w-full h-full overflow-hidden bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Posts</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Navigate the changing scenes of life with faith through our brief, insightful
            reflections and biblical insights. We aim to help you recognize God&apos;s abundant grace
            in your everyday moments, offering encouragement and a new perspective through
            His Word.
          </p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search For Post" 
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
      
      {/* Static Cards Area */}
      <div className="relative h-[500px] w-full">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onClick={() => handleCardClick(post)} />
        ))}
      </div>

      {/* Modal */}
      <PostModal post={selectedPost} onClose={handleCloseModal} />
    </div>
  );
};

export default PostsContent; 