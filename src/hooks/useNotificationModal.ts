import { useState, useEffect } from 'react';

export const useNotificationModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if we should show the notification modal
    const shouldShowModal = () => {
      console.log('🔍 Checking if modal should show...');
      
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
      const hasSeenModal = localStorage.getItem('notification-modal-seen');
      if (hasSeenModal) {
        console.log('❌ User has already seen modal, not showing');
        return false;
      }

      // Don't show if browser doesn't support notifications
      if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        console.log('❌ Browser does not support notifications');
        return false;
      }

      console.log('✅ All checks passed, modal should show');
      return true;
    };

    // Show modal after a delay to let the page load
    const timer = setTimeout(() => {
      console.log('⏰ Timer fired, checking if modal should show...');
      if (shouldShowModal()) {
        console.log('🎉 Showing notification modal!');
        setShowModal(true);
      } else {
        console.log('🚫 Modal will not be shown');
      }
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setShowModal(false);
    // Mark that user has seen the modal
    localStorage.setItem('notification-modal-seen', 'true');
  };

  const resetModal = () => {
    // Remove the seen flag to show modal again (useful for testing)
    localStorage.removeItem('notification-modal-seen');
    setShowModal(true);
  };

  return {
    showModal,
    closeModal,
    resetModal
  };
};
