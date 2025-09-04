import React, { useState, useRef } from 'react';
import PostTemplate from '../../components/PostTemplate';

interface Post {
  id: number;
  title: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  bottomRightContent: React.ReactNode;
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
  const truncatedTitle = truncateText(post.title, 3);
  
  // Extract text from React nodes for preview
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (Array.isArray(node)) return node.map(extractText).join(' ');
    if (node && typeof node === 'object' && 'props' in node) {
      const props = node as { props: { children?: React.ReactNode } };
      return extractText(props.props.children);
    }
    return '';
  };
  
  const previewText = extractText(post.leftContent).substring(0, 100) + '...';

  return (
    <div 
      style={{ position: 'absolute', top: post.y, left: post.x }}
      className="bg-white border border-gray-200 rounded-lg p-4 h-40 w-64 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
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
  onShare, 
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
  onShare: (type: 'link' | 'pdf') => void;
  currentIndex: number;
  totalPosts: number;
  isSharing: boolean;
  showShareOptions: boolean;
  setShowShareOptions: (show: boolean) => void;
  postTemplateRef: React.RefObject<HTMLDivElement>;
}) => {
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

      {/* Share button - top right */}
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="absolute top-6 right-6 z-20 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all shadow-lg cursor-pointer"
        title="Share post"
      >
        Share This Post
      </button>
      
      {/* Modal content - centered */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
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
            className="bg-white rounded-lg shadow-2xl overflow-hidden post-modal-content post-modal-container"
            ref={postTemplateRef}
          >
            <PostTemplate
              title={post.title}
              currentPage={currentIndex + 1}
              totalPages={totalPosts}
              leftContent={post.leftContent}
              rightContent={post.rightContent}
              bottomRightContent={post.bottomRightContent}
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
                    onShare('link');
                    setShowShareOptions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Share as Link
                </button>
                <button
                  onClick={() => {
                    onShare('pdf');
                    setShowShareOptions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View as PDF
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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const postTemplateRef = useRef<HTMLDivElement>(null);

  const posts: Post[] = [
    { 
      id: 1, 
      title: 'A THOUSAND TIMES I FAILED', 
      leftContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            "A thousand times I failed, still your mercy remains, should I stumble out here still I'm caught in your grace." This Hillsong lyric has always echoed in my heart, and its truth resonates even stronger today.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            For years, I pursued other paths, pouring tireless effort into fields he hadn't called me to, only to find no lasting fruit. That rollercoaster of emotions, the unpleasant experiences, the endless accusations and judgments thrown around – they're hallmarks of a mind out of alignment.
          </p>
        </>
      ),
      rightContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            Want to know the root cause? It's simply a lack of trust in the Father. No matter how you rationalize it, we constantly try to force a fit where there isn't one.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            But in Christ, we step into the true identity the Father created for us. This identity comes with specific tasks, assignments, and responsibilities, all of which we are perfectly equipped for. It's there we discover an unexplainable peace, joy, and confidence.
          </p>
        </>
      ),
      bottomRightContent: (
        <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
          When we align ourselves with God's purpose for our lives, we find a peace that surpasses all understanding. This isn't about perfection – it's about walking in the identity He has given us, trusting that He has equipped us for every good work.
        </p>
      ),
      x: 0, 
      y: 0 
    },
    { 
      id: 2, 
      title: 'IN ALL THINGS GOD WORKS', 
      leftContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            "In all things God works for the good of those who love him." This promise from Romans 8:28 has been my anchor through many storms. When life seems chaotic and uncertain, this truth reminds me that God is always at work.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            Too often we try to control every aspect of our lives, forgetting that we serve a God who sees the bigger picture. Our limited perspective can't comprehend the intricate ways He weaves our experiences together for His glory and our good.
          </p>
        </>
      ),
      rightContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            Trusting God doesn't mean we become passive or indifferent to our circumstances. Instead, it means we actively seek His will while resting in His sovereignty. We pray, we work, we serve, but we do so with open hands.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            The peace that comes from this kind of trust is unlike anything the world can offer. It's not dependent on circumstances, but on the unchanging character of our Heavenly Father who loves us beyond measure.
          </p>
        </>
      ),
      bottomRightContent: (
        <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
          As we learn to trust God more deeply, we begin to see His hand in every detail of our lives. What once seemed like random events become part of a beautiful tapestry He's weaving for our good and His glory.
        </p>
      ),
      x: 280, 
      y: 0 
    },
    { 
      id: 3, 
      title: 'BE STILL AND KNOW', 
      leftContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            "Be still and know that I am God." These words from Psalm 46:10 have become increasingly precious to me in our fast-paced world. In the midst of constant noise and endless demands, God calls us to stillness.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            Stillness isn't just about physical quiet, though that's important. It's about quieting our hearts and minds before the Lord, allowing His peace to wash over us and His voice to be heard above the chaos.
          </p>
        </>
      ),
      rightContent: (
        <>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            In those moments of stillness, we remember who God is and who we are in Him. We're reminded that He is sovereign, He is good, and He is working all things together for our good.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
            The world tells us to hustle, to strive, to never stop moving. But God invites us to rest in Him, to find our strength in quietness and trust. This is the counter-cultural way of the Kingdom.
          </p>
        </>
      ),
      bottomRightContent: (
        <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
          As we practice stillness, we discover that God's presence is our greatest treasure. In Him we find rest for our souls, peace for our minds, and strength for our journey.
        </p>
      ),
      x: 0, 
      y: 200 
    },
    { 
      id: 4, 
      title: 'A CHEERFUL GIFT', 
      leftContent: (
        <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
          Having my cuppa on my table is one sure comfort as I get work done. Your support would be a lovely way to keep it full every time I sit at my desk, and it genuinely helps me sustainably run this platform.
        </p>
      ),
      rightContent: (
        <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
          Thank you for your kindness! Your generosity helps me continue creating content that encourages and uplifts others in their faith journey.
        </p>
      ),
      bottomRightContent: (
        <p className="text-base leading-relaxed" style={{ color: "#000000" }}>
          Every contribution, no matter the size, makes a difference in keeping this platform running and accessible to all who need encouragement.
        </p>
      ),
      x: 280, 
      y: 200 
    },
  ];

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Extract text from React nodes for search
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return node.toString();
      if (Array.isArray(node)) return node.map(extractText).join(' ');
      if (node && typeof node === 'object' && 'props' in node) {
        const props = node as { props: { children?: React.ReactNode } };
        return extractText(props.props.children);
      }
      return '';
    };
    
    const leftContentText = extractText(post.leftContent).toLowerCase();
    const rightContentText = extractText(post.rightContent).toLowerCase();
    const bottomContentText = extractText(post.bottomRightContent).toLowerCase();
    
    return titleMatch || 
           leftContentText.includes(searchQuery.toLowerCase()) ||
           rightContentText.includes(searchQuery.toLowerCase()) ||
           bottomContentText.includes(searchQuery.toLowerCase());
  });

  const handleCardClick = (post: Post) => {
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

  const handleShare = async (type: 'link' | 'pdf') => {
    if (selectedPost && !isSharing) {
      setIsSharing(true);
      
      if (type === 'link') {
        // Generate shareable link
        const shareUrl = `${window.location.origin}/post/${selectedPost.id}`;
        
        try {
          await navigator.share({
            title: selectedPost.title,
            text: `Check out this post: ${selectedPost.title}`,
            url: shareUrl,
          });
        } catch {
          // Fallback to clipboard copy
          try {
            // Ensure document is focused
            document.body.focus();
            
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(shareUrl);
              setToastMessage('Link copied to clipboard!');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            } else {
              // Fallback for older browsers
              const textArea = document.createElement('textarea');
              textArea.value = shareUrl;
              textArea.style.position = 'fixed';
              textArea.style.left = '-999999px';
              textArea.style.top = '-999999px';
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
              setToastMessage('Link copied to clipboard!');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            }
          } catch (clipboardError) {
            console.error('Failed to copy to clipboard:', clipboardError);
            // Still show success message even if clipboard fails
            setToastMessage('Link ready to share!');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          }
        }
      } else if (type === 'pdf') {
        // Extract text from React nodes for PDF content
        const extractText = (node: React.ReactNode): string => {
          if (typeof node === 'string') return node;
          if (typeof node === 'number') return node.toString();
          if (Array.isArray(node)) return node.map(extractText).join(' ');
          if (node && typeof node === 'object' && 'props' in node) {
            const props = node as { props: { children?: React.ReactNode } };
            return extractText(props.props.children);
          }
          return '';
        };
        
        const leftText = extractText(selectedPost.leftContent);
        const rightText = extractText(selectedPost.rightContent);
        const bottomText = extractText(selectedPost.bottomRightContent);
        
        const shareText = `${selectedPost.title}\n\n${leftText}\n\n${rightText}\n\n${bottomText}`;
        try {
          await navigator.clipboard.writeText(shareText);
          setToastMessage('Post content copied to clipboard!');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        } catch {
          setToastMessage('Unable to copy content. Please copy manually.');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }
      }
      
      setIsSharing(false);
    }
  };

  return (
    <div className="p-8 w-full h-full overflow-hidden bg-gray-50">
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
      
      {/* Static Cards Area */}
      <div className="relative h-[500px] w-full">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onClick={() => handleCardClick(post)} />
        ))}
      </div>

      {/* Modal */}
      <PostModal 
        post={selectedPost} 
        onClose={handleCloseModal}
        onPrevious={handlePreviousPost}
        onNext={handleNextPost}
        onShare={handleShare}
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