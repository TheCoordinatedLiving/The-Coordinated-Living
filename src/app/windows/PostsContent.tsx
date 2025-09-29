import React, { useState, useRef, useEffect } from 'react';
import PostTemplate from '../../components/PostTemplate';
import { getAllPosts, Post } from '../../lib/posts';

// Extended Post interface for this component (includes positioning)
interface PostWithPosition extends Post {
  x: number;
  y: number;
}

// Helper function to truncate text
const truncateText = (text: string, wordCount: number): string => {
  const words = text.split(' ');
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + ' -';
};

const PostCard = ({ post, onClick }: { post: PostWithPosition; onClick: () => void }) => {
  const truncatedTitle = truncateText(post.title, 3);
  
  // Use the new content field for preview, with fallback to legacy fields
  const getPreviewText = (): string => {
    if (post.content) {
      return post.content.substring(0, 100) + '...';
    }
    // Fallback to legacy fields if content is not available
    const leftText = post.leftContent || '';
    const rightText = post.rightContent || '';
    const combinedText = leftText + ' ' + rightText;
    return combinedText.substring(0, 100) + '...';
  };
  
  const previewText = getPreviewText();

  return (
    <div 
      style={{ position: 'absolute', top: post.y, left: post.x }}
      className="bg-white border border-gray-200 rounded-2xl p-4 h-40 w-64 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <h3 className="font-semibold text-lg mb-1 text-black">{truncatedTitle}</h3>
        <p className="text-sm text-black">{previewText}</p>
      </div>
    </div>
  );
};

const PostModal = ({ 
  post, 
  onClose, 
  onPrevious, 
  onNext, 
  currentIndex, 
  totalPosts,
  showShareOptions,
  setShowShareOptions,
  postTemplateRef
}: { 
  post: Post | null; 
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalPosts: number;
  isSharing: boolean;
  showShareOptions: boolean;
  setShowShareOptions: (show: boolean) => void;
  postTemplateRef: React.RefObject<HTMLDivElement | null>;
}) => {
  if (!post) return null;

  // Share function - Copy URL to clipboard
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/share/${post.id}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Note: Toast notification would need to be passed as prop or handled differently
      console.log('Share link copied to clipboard!');
    } catch {
      // Final fallback: show the URL
      console.log(`Share this link: ${shareUrl}`);
    }
  };

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

      {/* Share button - top right */}
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="absolute top-6 right-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer"
        title="Share post"
      >
        Share This Post
      </button>
      
      {/* Modal content - centered */}
      <div className="absolute inset-0 flex items-center justify-center p-8 xl:overflow-y-auto">
        {/* Left chevron navigation */}
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`absolute left-8 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 p-3 rounded-full font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right chevron navigation */}
        <button
          onClick={onNext}
          disabled={currentIndex === totalPosts - 1}
          className={`absolute right-8 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 p-3 rounded-full font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer ${
            currentIndex === totalPosts - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="relative z-10 w-full xl:max-w-2xl">
          <div 
            className="post-modal-content post-modal-container"
            ref={postTemplateRef}
          >
            <PostTemplate
              title={post.title}
              content={post.content}
              images={post.images}
            />
          </div>
        </div>
      </div>

      {/* Share options dropdown - positioned in top right corner */}
      {showShareOptions && (
        <div className="fixed inset-0 z-[10000] pointer-events-none">
          <div 
            className="absolute inset-0 pointer-events-auto"
            onClick={() => setShowShareOptions(false)}
          />
          <div className="absolute top-20 right-6 pointer-events-auto">
            <div 
              className="w-48 bg-white rounded-md shadow-lg border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    handleShare();
                    setShowShareOptions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share as Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PostsContent = () => {
  const [selectedPost, setSelectedPost] = useState<PostWithPosition | null>(null);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSharing] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostWithPosition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const postTemplateRef = useRef<HTMLDivElement>(null);

  // Fetch posts from Airtable on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const apiPosts = await getAllPosts();
        
        // Transform API posts to component format
        const transformedPosts: PostWithPosition[] = apiPosts.map((apiPost, index) => ({
          id: apiPost.id, // Keep as string
          title: apiPost.title,
          content: apiPost.content,
          images: apiPost.images,
          // Legacy fields for backward compatibility
          leftContent: apiPost.leftContent,
          rightContent: apiPost.rightContent,
          bottomRightContent: apiPost.bottomRightContent,
          x: 20 + (index % 3) * 280,
          y: 20 + Math.floor(index / 3) * 200
        }));
        
        setPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback to hardcoded posts
        setPosts([
          { 
            id: '1', 
            title: 'A THOUSAND TIMES I FAILED', 
            content: '"A thousand times I failed, still your mercy remains, should I stumble out here still I\'m caught in your grace." This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today. For years, I pursued other paths, pouring tireless effort into fields he hadn\'t called me to, only to find no lasting fruit. That rollercoaster of emotions, the unpleasant experiences, the endless accusations and judgments thrown around – they\'re hallmarks of a mind out of alignment. Want to know the root cause? It\'s simply a lack of trust in the Father. No matter how you rationalize it, we constantly try to force a fit where there isn\'t one. But in Christ, we step into the true identity the Father created for us. This identity comes with specific tasks, assignments, and responsibilities, all of which we are perfectly equipped for. It\'s there we discover an unexplainable peace, joy, and confidence. When we align ourselves with God\'s purpose for our lives, we find a peace that surpasses all understanding. This isn\'t about perfection – it\'s about walking in the identity He has given us, trusting that He has equipped us for every good work.',
            images: [],
            leftContent: '',
            rightContent: '',
            bottomRightContent: '',
            x: 0, 
            y: 0 
          },
          { 
            id: '2', 
            title: 'IN ALL THINGS GOD WORKS', 
            content: '"In all things God works for the good of those who love him." This promise from Romans 8:28 has been my anchor through many storms. When life seems chaotic and uncertain, this truth reminds me that God is always at work. Too often we try to control every aspect of our lives, forgetting that we serve a God who sees the bigger picture. Our limited perspective can\'t comprehend the intricate ways He weaves our experiences together for His glory and our good. Trusting God doesn\'t mean we become passive or indifferent to our circumstances. Instead, it means we actively seek His will while resting in His sovereignty. We pray, we work, we serve, but we do so with open hands. The peace that comes from this kind of trust is unlike anything the world can offer. It\'s not dependent on circumstances, but on the unchanging character of our Heavenly Father who loves us beyond measure. As we learn to trust God more deeply, we begin to see His hand in every detail of our lives. What once seemed like random events become part of a beautiful tapestry He\'s weaving for our good and His glory.',
            images: [],
            leftContent: '',
            rightContent: '',
            bottomRightContent: '',
            x: 280, 
            y: 0 
          },
          { 
            id: '3', 
            title: 'BE STILL AND KNOW', 
            content: '"Be still and know that I am God." These words from Psalm 46:10 have become increasingly precious to me in our fast-paced world. In the midst of constant noise and endless demands, God calls us to stillness. Stillness isn\'t just about physical quiet, though that\'s important. It\'s about quieting our hearts and minds before the Lord, allowing His peace to wash over us and His voice to be heard above the chaos. In those moments of stillness, we remember who God is and who we are in Him. We\'re reminded that He is sovereign, He is good, and He is working all things together for our good. The world tells us to hustle, to strive, to never stop moving. But God invites us to rest in Him, to find our strength in quietness and trust. This is the counter-cultural way of the Kingdom. As we practice stillness, we discover that God\'s presence is our greatest treasure. In Him we find rest for our souls, peace for our minds, and strength for our journey.',
            images: [],
            leftContent: '',
            rightContent: '',
            bottomRightContent: '',
            x: 0, 
            y: 200 
          },
          { 
            id: '4', 
            title: 'A CHEERFUL GIFT', 
            content: 'Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform. Thank you for your kindness! Your generosity helps me continue creating content that encourages and uplifts others in their faith journey. Every contribution, no matter the size, makes a difference in keeping this platform running and accessible to all who need encouragement.',
            images: [],
            leftContent: '',
            rightContent: '',
            bottomRightContent: '',
            x: 280, 
            y: 200 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Search in the new content field first, with fallback to legacy fields
    if (post.content) {
      const contentMatch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatch || contentMatch;
    }
    
    // Fallback to legacy fields if content is not available
    const leftContentText = (post.leftContent || '').toLowerCase();
    const rightContentText = (post.rightContent || '').toLowerCase();
    const bottomContentText = (post.bottomRightContent || '').toLowerCase();
    
    return titleMatch || 
           leftContentText.includes(searchQuery.toLowerCase()) ||
           rightContentText.includes(searchQuery.toLowerCase()) ||
           bottomContentText.includes(searchQuery.toLowerCase());
  });

  const handleCardClick = (post: PostWithPosition) => {
    const postIndex = filteredPosts.findIndex(p => p.id === post.id);
    setCurrentPostIndex(postIndex);
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handlePreviousPost = () => {
    if (currentPostIndex > 0) {
      const newIndex = currentPostIndex - 1;
      setCurrentPostIndex(newIndex);
      setSelectedPost(filteredPosts[newIndex]);
    }
  };

  const handleNextPost = () => {
    if (currentPostIndex < filteredPosts.length - 1) {
      const newIndex = currentPostIndex + 1;
      setCurrentPostIndex(newIndex);
      setSelectedPost(filteredPosts[newIndex]);
    }
  };



  return (
    <div className="p-8 w-full h-full overflow-y-auto bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Amita, serif' }}>Posts</h1>
          <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
      
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            {/* Elegant loading spinner */}
            <div className="relative">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            {/* Subtle loading text */}
            <div className="text-gray-600 text-sm font-medium">Loading posts...</div>
          </div>
        </div>
      )}
      
      {/* Static Cards Area */}
      {!loading && (
        <div className="relative min-h-[500px] w-full">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onClick={() => handleCardClick(post)} />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Posts Available</h3>
                <p className="text-gray-600">Check back later for new content!</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <PostModal 
        post={selectedPost} 
        onClose={handleCloseModal}
        onPrevious={handlePreviousPost}
        onNext={handleNextPost}
        currentIndex={currentPostIndex}
        totalPosts={filteredPosts.length}
        isSharing={isSharing}
        showShareOptions={showShareOptions}
        setShowShareOptions={setShowShareOptions}
        postTemplateRef={postTemplateRef}
      />

      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-[10000] bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default PostsContent;