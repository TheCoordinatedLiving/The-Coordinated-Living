"use client";

import Image from "next/image"

interface PostTemplateProps {
  title: string;
  content?: React.ReactNode;
  images?: Array<{
    src: string;
    alt: string;
  }>;
  // Backward compatibility with old interface
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  bottomRightContent?: React.ReactNode;
  // Content protection for shared posts
  isShared?: boolean;
}

export default function PostTemplate({
  title,
  content,
  images = [],
  leftContent,
  rightContent,
  bottomRightContent,
  isShared = false
}: PostTemplateProps) {
  // Debug: Log the images data
  console.log('PostTemplate images:', images);
  return (
    <>
      <style jsx>{`
        .post-template-scroll::-webkit-scrollbar {
          display: none;
        }
        
        /* Content protection styles for shared posts */
        .content-protected {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        
        .content-protected * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
        }
        
        .content-protected::selection {
          background: transparent !important;
        }
        
        .content-protected::-moz-selection {
          background: transparent !important;
        }
        
        /* Prevent drag and drop */
        .content-protected {
          -webkit-user-drag: none !important;
          -khtml-user-drag: none !important;
          -moz-user-drag: none !important;
          -o-user-drag: none !important;
          user-drag: none !important;
        }
        
        /* Disable image dragging */
        .content-protected img {
          -webkit-user-drag: none !important;
          -khtml-user-drag: none !important;
          -moz-user-drag: none !important;
          -o-user-drag: none !important;
          user-drag: none !important;
          pointer-events: none !important;
        }
      `}</style>
      
      {/* Main container - transparent background */}
      <div 
        className={`relative xl:scale-100 scale-90 ${isShared ? 'content-protected' : ''}`}
        onContextMenu={isShared ? (e: React.MouseEvent) => e.preventDefault() : undefined}
        onDragStart={isShared ? (e: React.DragEvent) => e.preventDefault() : undefined}
        onMouseDown={isShared ? (e: React.MouseEvent) => e.preventDefault() : undefined}
        onKeyDown={isShared ? (e: React.KeyboardEvent) => {
          // Prevent common copy shortcuts
          if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'a' || e.key === 'x' || e.key === 'v')) {
            e.preventDefault();
          }
          // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
          if (e.key === 'F12' || 
              ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
              ((e.ctrlKey || e.metaKey) && e.key === 'u')) {
            e.preventDefault();
          }
        } : undefined}
      >
        <div className="w-full mx-auto px-0 xl:px-6 py-0.5 xl:py-2 relative z-10">
          {/* Two-column layout - Left column smaller, right column larger */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 xl:gap-0 h-[600px] xl:h-[700px] rounded-lg overflow-hidden shadow-lg">
            {/* Left Column - Dark Blue Background (1/3 width) */}
            <div 
              className="xl:col-span-1 p-3 xl:p-5 flex flex-col items-center justify-start relative"
              style={{ backgroundColor: "#2F4C6C" }}
            >
              {/* Logo Section - post-template-logo.svg - Desktop only */}
              <div className="mb-6 xl:mb-8 hidden xl:flex justify-center">
                <div className="w-12 h-12 xl:w-16 xl:h-16 relative">
                  <Image
                    src="/post-template-logo.svg"
                    alt="Post Template Logo"
                    width={64}
                    height={64}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Title Section - "PERSONAL" - Desktop only */}
              <div className="mb-8 xl:mb-12 text-center hidden xl:block">
                <h1 
                  className="text-lg xl:text-2xl font-bold leading-tight text-white"
                  style={{ 
                    fontFamily: 'Amita, serif', 
                    letterSpacing: '1px'
                  }}
                >
                  {title || "PERSONAL"}
                </h1>
              </div>

              {/* Images Section - 2 images stacked vertically - Fixed position - Desktop only */}
              <div className="absolute bottom-4 xl:bottom-6 left-3 xl:left-5 right-3 xl:right-5 space-y-4 xl:space-y-6 hidden xl:block">
                {images && images.length > 0 && images[0]?.src ? (
                  images.slice(0, 2).map((image, index) => (
                    <div key={index} className="w-40 xl:w-44 mx-auto">
                      <Image
                        src={image.src}
                        alt={image.alt || `Post image ${index + 1}`}
                        width={300}
                        height={200}
                        className="object-cover w-40 xl:w-44 h-40 xl:h-44 rounded-full"
                        onError={(e) => {
                          console.error('Image failed to load:', image.src);
                          // Hide the broken image
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ))
                ) : (
                  // Placeholder images for development
                  <>
                    <div className="w-40 xl:w-44 h-40 xl:h-44 bg-gray-300 flex items-center justify-center text-gray-600 rounded-full mx-auto">
                      <span className="text-sm">Image 1</span>
                    </div>
                    <div className="w-40 xl:w-44 h-40 xl:h-44 bg-gray-300 flex items-center justify-center text-gray-600 rounded-full mx-auto">
                      <span className="text-sm">Image 2</span>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile View - Logo and Title */}
              <div className="xl:hidden flex flex-col items-center justify-center h-full">
                {/* Logo Section */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 relative">
                    <Image
                      src="/post-template-logo.svg"
                      alt="Post Template Logo"
                      width={64}
                      height={64}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Title Section */}
                <div className="text-center">
                  <h1 
                    className="text-xl font-bold leading-tight text-white"
                    style={{ 
                      fontFamily: 'Amita, serif', 
                      letterSpacing: '1px'
                    }}
                  >
                    {title || "PERSONAL"}
                  </h1>
                </div>
              </div>
            </div>

            {/* Right Column - Light Blue Background (2/3 width) */}
            <div 
              className="xl:col-span-2 p-6 xl:p-8 flex flex-col justify-start overflow-y-auto"
              style={{ backgroundColor: "#2481C2" }}
            >
              {/* Content Section - Lorem ipsum text */}
              <div className="text-white space-y-4 xl:space-y-6" style={{ fontFamily: 'sans-serif' }}>
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .post-content p {
                      font-size: 14px !important;
                      line-height: 1.6 !important;
                      color: #ffffff !important;
                      margin-bottom: 1.2rem !important;
                      text-align: left !important;
                    }
                    .post-content h2, .post-content h3 {
                      color: #ffffff !important;
                      margin-bottom: 0.8rem !important;
                      font-weight: 600 !important;
                    }
                  `
                }} />
                <div className="post-content">
                  {content ? (
                    // New content structure - auto-break into paragraphs
                    typeof content === 'string' ? (
                      content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph.trim()}</p>
                      ))
                    ) : (
                      content
                    )
                  ) : (
                    // Backward compatibility: combine old content structure
                    <>
                      {leftContent && <div className="mb-4">{leftContent}</div>}
                      {rightContent && <div className="mb-4">{rightContent}</div>}
                      {bottomRightContent && <div className="mb-4">{bottomRightContent}</div>}
                      {!leftContent && !rightContent && !bottomRightContent && (
                        // Placeholder content for development - Lorem ipsum
                        <>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                          <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.</p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}