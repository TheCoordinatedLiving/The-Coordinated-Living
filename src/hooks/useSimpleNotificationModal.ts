import { useState, useEffect } from 'react';

export const useSimpleNotificationModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if we should show the notification modal
    const shouldShowModal = () => {
      console.log('🔍 Checking if simple notification modal should show...');

      // Don't show if browser doesn't support notifications
      if (!('Notification' in window)) {
        console.log('❌ Browser does not support notifications');
        return false;
      }

      // Don't show if notifications are already granted
      if (Notification.permission === 'granted') {
        console.log('❌ Notifications already granted, not showing modal');
        return false;
      }

      // Don't show if user has already declined
      if (Notification.permission === 'denied') {
        console.log('❌ Notifications denied, not showing modal');
        return false;
      }

      // Don't show if user has already seen the modal
      const hasSeenModal = localStorage.getItem('simple-notification-modal-seen');
      if (hasSeenModal) {
        console.log('❌ User has already seen simple notification modal, not showing');
        return false;
      }

      console.log('✅ All checks passed, simple notification modal should show');
      return true;
    };

    // Function to show modal after welcome screen completes
    const showModalAfterWelcome = () => {
      console.log('⏰ Welcome screen completed, checking if modal should show...');
      if (shouldShowModal()) {
        console.log('🎉 Showing simple notification modal after welcome screen!');
        setShowModal(true);
      } else {
        console.log('🚫 Simple notification modal will not be shown');
      }
    };

    // Listen for welcome screen completion
    const handleWelcomeComplete = () => {
      // Check if we're on mobile (screen width < 1280px which is xl breakpoint)
      const isMobile = window.innerWidth < 1280;
      
      if (isMobile) {
        // For mobile: show modal after 3 seconds as requested
        console.log('📱 Mobile detected: showing modal after 3 seconds');
        setTimeout(showModalAfterWelcome, 3000); // 3 seconds after welcome completes
      } else {
        // For desktop: show modal after 1.5 seconds (existing behavior)
        console.log('🖥️ Desktop detected: showing modal after 1.5 seconds');
        setTimeout(showModalAfterWelcome, 1500); // 1.5 seconds after welcome completes
      }
    };

    // Check if we're on a page that has a welcome screen
    const hasWelcomeScreen = document.querySelector('.welcome-container');
    
    if (hasWelcomeScreen) {
      // Listen for custom event when welcome screen completes
      window.addEventListener('welcomeScreenComplete', handleWelcomeComplete);
      
      // Fallback: if no custom event is fired, use a longer delay
      const fallbackTimer = setTimeout(() => {
        console.log('⏰ Fallback timer: Welcome screen should be complete by now');
        showModalAfterWelcome();
      }, 8000); // 8 seconds fallback

      return () => {
        window.removeEventListener('welcomeScreenComplete', handleWelcomeComplete);
        clearTimeout(fallbackTimer);
      };
    } else {
      // No welcome screen, show modal after a short delay
      const timer = setTimeout(() => {
        console.log('⏰ No welcome screen detected, showing modal after delay...');
        if (shouldShowModal()) {
          console.log('🎉 Showing simple notification modal!');
          setShowModal(true);
        } else {
          console.log('🚫 Simple notification modal will not be shown');
        }
      }, 3000); // 3 seconds for pages without welcome screen (consistent with mobile timing)

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    // Mark that user has seen the modal
    localStorage.setItem('simple-notification-modal-seen', 'true');
  };

  const resetModal = () => {
    setShowModal(false);
    localStorage.removeItem('simple-notification-modal-seen');
    console.log('🔄 Simple notification modal state reset.');
  };

  return { showModal, closeModal, resetModal };
};
