import React from 'react';

export const processTextContent = (text: string): React.ReactNode[] => {
  if (!text) return [];
  
  // URL regex pattern
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // Quote regex pattern - matches text within quotes
  const quoteRegex = /"([^"]+)"/g;
  
  const processedText = text;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // First, handle URLs
  const urlMatches = Array.from(processedText.matchAll(urlRegex));
  urlMatches.forEach((match, index) => {
    const url = match[0];
    const startIndex = match.index!;
    
    // Add text before URL
    if (startIndex > lastIndex) {
      const beforeText = processedText.slice(lastIndex, startIndex);
      elements.push(beforeText);
    }
    
    // Add clickable URL
    elements.push(
      React.createElement('a', {
        key: `url-${index}`,
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'text-blue-600 hover:text-blue-800 underline'
      }, url)
    );
    
    lastIndex = startIndex + url.length;
  });
  
  // Add remaining text after last URL
  if (lastIndex < processedText.length) {
    elements.push(processedText.slice(lastIndex));
  }
  
  // Now process quotes in each text element
  const finalElements: React.ReactNode[] = [];
  
  elements.forEach((element, elementIndex) => {
    if (typeof element === 'string') {
      const text = element;
      let quoteLastIndex = 0;
      const quoteMatches = Array.from(text.matchAll(quoteRegex));
      
      if (quoteMatches.length === 0) {
        finalElements.push(element);
        return;
      }
      
      quoteMatches.forEach((match, quoteIndex) => {
        const quotedText = match[1];
        const startIndex = match.index!;
        
        // Add text before quote
        if (startIndex > quoteLastIndex) {
          const beforeText = text.slice(quoteLastIndex, startIndex);
          finalElements.push(beforeText);
        }
        
        // Add bold quoted text
        finalElements.push(
          React.createElement('strong', {
            key: `quote-${elementIndex}-${quoteIndex}`
          }, `"${quotedText}"`)
        );
        
        quoteLastIndex = startIndex + match[0].length;
      });
      
      // Add remaining text after last quote
      if (quoteLastIndex < text.length) {
        finalElements.push(text.slice(quoteLastIndex));
      }
    } else {
      finalElements.push(element);
    }
  });
  
  return finalElements;
};

// Content parsing function for single content field
export interface ParsedContent {
  leftContent: string;
  rightContent: string;
  bottomRightContent: string;
}

export const parseContentByParagraphs = (content: string): ParsedContent => {
  if (!content || content.trim() === '') {
    return {
      leftContent: '',
      rightContent: '',
      bottomRightContent: ''
    };
  }

  // Split content by double line breaks (paragraphs)
  const paragraphs = content
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  // Default values
  let leftContent = '';
  let rightContent = '';
  let bottomRightContent = '';

  // Assign paragraphs based on position
  if (paragraphs.length >= 1) {
    leftContent = paragraphs[0];
  }
  
  if (paragraphs.length >= 2) {
    rightContent = paragraphs[1];
  }
  
  if (paragraphs.length >= 3) {
    bottomRightContent = paragraphs[2];
  }

  // If there are more than 3 paragraphs, combine the extra ones into bottom right
  if (paragraphs.length > 3) {
    const extraParagraphs = paragraphs.slice(3);
    bottomRightContent += '\n\n' + extraParagraphs.join('\n\n');
  }

  return {
    leftContent,
    rightContent,
    bottomRightContent
  };
}; 