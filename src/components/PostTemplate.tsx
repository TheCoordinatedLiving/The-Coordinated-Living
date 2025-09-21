import Image from "next/image"

interface PostTemplateProps {
  title: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  bottomRightContent?: React.ReactNode;
  currentPage?: number;
  totalPages?: number;
}

export default function PostTemplate({
  title,
  leftContent,
  rightContent,
  bottomRightContent,
  currentPage = 1,
  totalPages = 1
}: PostTemplateProps) {
  // Use title to avoid unused variable warning
  const displayTitle = title;

  return (
    <>
      <style jsx>{`
        .post-template-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="bg-white relative xl:scale-100 scale-90 xl:max-h-[80vh] xl:overflow-y-auto xl:overflow-x-hidden post-template-scroll" style={{
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none', /* Internet Explorer 10+ */
      }}>
        {/* Watermark in the center */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
        <Image
          src="/watermark.svg"
          alt="Watermark"
          width={200}
          height={200}
          className="w-72 h-72"
        />
      </div>
      
      <div className="w-full xl:max-w-2xl mx-auto px-0 xl:px-6 py-0.5 xl:py-2 relative z-10">
        {/* Header with page number and decorative elements */}
        <div className="hidden xl:flex justify-between items-center mb-0.5 xl:mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rotate-45 border-2" style={{ borderColor: "#000000" }}></div>
            <div className="w-48 h-px" style={{ backgroundColor: "#000000" }}></div>
          </div>
          <span className="text-sm xl:text-base font-medium" style={{ color: "#000000" }}>
            {currentPage}/{totalPages}
          </span>
          <div className="flex items-center space-x-3">
            <div className="w-48 h-px" style={{ backgroundColor: "#000000" }}></div>
            <div className="w-2 h-2 rotate-45 border-2" style={{ borderColor: "#000000" }}></div>
          </div>
        </div>

        {/* Logo and main content area */}
        <div className="relative">
          {/* Small circular logo */}
          <div className="absolute top-0 left-0">
            <Image
              src="/post-logo.svg"
              alt="Post Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>

          {/* Main heading and circular image */}
          <div className="flex justify-between items-start mb-0.5 xl:mb-2">
            <div className="flex-1 pt-10 xl:pt-12 ml-0">
              <h1 className="text-xl xl:text-4xl font-bold leading-tight" style={{ color: "#000000", fontFamily: 'Amita, serif' }}>
                {displayTitle}
              </h1>
            </div>
          </div>

          {/* Mobile content - all paragraphs */}
          <div className="xl:hidden mb-2 text-center mobile-content" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <div className="space-y-2">
              <style dangerouslySetInnerHTML={{
                __html: `
                  .mobile-content p {
                    font-size: 13px !important;
                    line-height: 1.5 !important;
                    color: #000000 !important;
                  }
                `
              }} />
              {leftContent}
              {rightContent}
            </div>
          </div>

          {/* Two-column text content */}
          <div className="hidden xl:grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6 mb-0.5 xl:mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <div className="space-y-1 xl:space-y-3">
              {leftContent}
            </div>
            <div className="space-y-1 xl:space-y-3">
              {rightContent}
            </div>
          </div>

          {/* Bottom section with coffee image and text */}
          <div className="hidden xl:grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6">
            <div className="hidden xl:flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden">
                <Image
                  src="/new-post-template-image.jpg"
                  alt="Post template image"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="xl:col-span-1 col-span-1 pt-0.5 xl:pt-2 relative" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {/* Watermark background */}
              <div className="absolute inset-0 flex items-end justify-end opacity-20 pointer-events-none">
                <Image
                  src="/watermark.svg"
                  alt="Watermark"
                  width={120}
                  height={120}
                  className="w-24 h-24"
                  style={{ opacity: 0.3 }}
                />
              </div>
              {/* Content on top */}
              <div className="relative z-10">
                {bottomRightContent}
              </div>
            </div>
          </div>
        </div>

        {/* Footer with contact information */}
        <div className="hidden xl:block mt-1 xl:mt-4 pt-0.5 xl:pt-2 border-t" style={{ borderColor: "#000000" }}>
          <div className="flex justify-between items-center">
            <span className="text-xs xl:text-sm" style={{ color: "#000000" }}>
              letstalk@thecoordinatedliving.com
            </span>
            <span className="text-xs xl:text-sm" style={{ color: "#000000" }}>
              www.thecoordinatedliving.com
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 