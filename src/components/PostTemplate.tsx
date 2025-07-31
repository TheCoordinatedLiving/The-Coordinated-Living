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
    <div className="bg-white relative">
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
      
      <div className="max-w-2xl mx-auto px-6 py-2 relative z-10">
        {/* Header with page number and decorative elements */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rotate-45 border-2" style={{ borderColor: "#000000" }}></div>
            <div className="w-48 h-px" style={{ backgroundColor: "#000000" }}></div>
          </div>
          <span className="text-base font-medium" style={{ color: "#000000" }}>
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
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 pt-12 ml-0">
              <h1 className="text-4xl font-bold leading-tight" style={{ color: "#000000", fontFamily: 'Amita, serif' }}>
                {displayTitle}
              </h1>
            </div>
          </div>

          {/* Two-column text content */}
          <div className="grid grid-cols-2 gap-6 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <div className="space-y-3">
              {leftContent}
            </div>
            <div className="space-y-3">
              {rightContent}
            </div>
          </div>

          {/* Bottom section with coffee image and text */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden">
                <Image
                  src="/post-hero.png"
                  alt="Open book with pen"
                  width={256}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="pt-2 relative" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
        <div className="mt-4 pt-2 border-t" style={{ borderColor: "#000000" }}>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: "#000000" }}>
              letstalk@thecoordinatedliving.com
            </span>
            <span className="text-sm" style={{ color: "#000000" }}>
              www.thecoordinatedliving.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 