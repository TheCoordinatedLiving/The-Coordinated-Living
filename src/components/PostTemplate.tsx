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
}

export default function PostTemplate({
  title,
  content,
  images = [],
  leftContent,
  rightContent,
  bottomRightContent
}: PostTemplateProps) {
  return (
    <>
      <style jsx>{`
        .post-template-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Main container - transparent background */}
      <div className="relative xl:scale-100 scale-90">
        <div className="w-full mx-auto px-0 xl:px-6 py-0.5 xl:py-2 relative z-10">
          {/* Two-column layout - Left column smaller, right column larger */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 xl:gap-0 h-[600px] xl:h-[700px] rounded-lg overflow-hidden shadow-lg">
            {/* Left Column - Dark Blue Background (1/3 width) */}
            <div 
              className="xl:col-span-1 p-3 xl:p-5 flex flex-col items-center justify-start relative"
              style={{ backgroundColor: "#2F4C6C" }}
            >
              {/* Logo Section - post-template-logo.svg */}
              <div className="mb-6 xl:mb-8 flex justify-center">
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

              {/* Title Section - "PERSONAL" */}
              <div className="mb-8 xl:mb-12 text-center">
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

              {/* Images Section - 2 images stacked vertically - Fixed position */}
              <div className="absolute bottom-4 xl:bottom-6 left-3 xl:left-5 right-3 xl:right-5 space-y-4 xl:space-y-6">
                {images && images.length > 0 ? images.slice(0, 2).map((image, index) => (
                  <div key={index} className="w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={300}
                      height={200}
                      className={`w-full object-cover ${index === 0 ? 'h-56 xl:h-60' : 'h-32 xl:h-36'}`}
                    />
                  </div>
                )) : (
                  // Placeholder images for development
                  <>
                    <div className="w-full h-56 xl:h-60 bg-gray-300 flex items-center justify-center text-gray-600">
                      <span className="text-sm">Image 1</span>
                    </div>
                    <div className="w-full h-32 xl:h-36 bg-gray-300 flex items-center justify-center text-gray-600">
                      <span className="text-sm">Image 2</span>
                    </div>
                  </>
                )}
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