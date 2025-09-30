"use client";

import { useEffect } from 'react';

export default function SharedPostProtection() {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Prevent common keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent copy, cut, paste, select all
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'v' || e.key === 'a')) {
        e.preventDefault();
      }
      
      // Prevent F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
      }
      
      // Prevent Ctrl+Shift+I (Developer Tools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      
      // Prevent Ctrl+Shift+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }
      
      // Prevent Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
      }
      
      // Prevent Ctrl+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
      
      // Prevent Ctrl+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
      }
    };

    // Prevent drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Prevent text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);

    // Disable text selection globally
    document.body.style.userSelect = 'none';
    // Use bracket notation to access vendor-prefixed properties
    (document.body.style as Record<string, string>)['-webkit-user-select'] = 'none';
    (document.body.style as Record<string, string>)['-moz-user-select'] = 'none';
    (document.body.style as Record<string, string>)['-ms-user-select'] = 'none';

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      
      // Re-enable text selection
      document.body.style.userSelect = '';
      // Use bracket notation to access vendor-prefixed properties
      (document.body.style as Record<string, string>)['-webkit-user-select'] = '';
      (document.body.style as Record<string, string>)['-moz-user-select'] = '';
      (document.body.style as Record<string, string>)['-ms-user-select'] = '';
    };
  }, []);

  return null; // This component doesn't render anything
}
