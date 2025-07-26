"use client";
import { useState, useEffect, useCallback } from 'react';

interface OverlayPosition {
  left: string;
  top?: string;
  width: string;
  height: string;
  bottom?: string;
  right?: string;
}

interface ResponsivePositions {
  laptop: OverlayPosition;
  phone: OverlayPosition;
  profileImage: OverlayPosition;
  todoDocument: OverlayPosition;
  abstractImage: OverlayPosition;
  threeLinesImage: OverlayPosition;
}

const CHROME_BREAKPOINTS = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 426,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop4K: 2560
};



const getResponsivePositions = (screenWidth: number): ResponsivePositions => {
  console.log("📐 Screen width:", screenWidth);

  if (screenWidth <= CHROME_BREAKPOINTS.mobileS) {
    // Mobile S (≤ 320px)
    return {
      laptop: { left: '40%', top: '76%', width: '80%', height: '70%' },
      phone: { left: '6%', bottom: '2%', width: '38%', height: '30%' },
      profileImage: { left: '68%', top: '-15%', width: '20%', height: '20%' },
      todoDocument: { left: '66%', top: '-100%', width: '26%', height: '52%' },
      abstractImage: { left: '41%', top: '-43%', width: '13%', height: '15%' },
      threeLinesImage: { left: '40%', top: '0%', width: '14%', height: '14%' }
    };
  }

  if (screenWidth <= CHROME_BREAKPOINTS.mobileM) {
    // Mobile M (321px–375px)
    return {
      laptop: { left: '42%', top: '73%', width: '70%', height: '70%' },
      phone: { left: '7%', bottom: '3%', width: '36%', height: '29%' },
      profileImage: { left: '66%', top: '-5%', width: '15%', height: '14%' },
      todoDocument: { left: '64%', top: '-80.3%', width: '22%', height: '52%' },
      abstractImage: { left: '43%', top: '-30%', width: '10%', height: '12%' },
      threeLinesImage: { left: '43%', top: '6%', width: '10%', height: '15%' }
    };
  }

  if (screenWidth <= CHROME_BREAKPOINTS.mobileL) {
    // Mobile L (376px–425px) 6
    return {
      laptop: { left: '43%', top: '70%', width: '60%', height: '50%' },
      phone: { left: '8%', bottom: '4%', width: '34%', height: '27%' },
      profileImage: { left: '94%', top: '-46%', width: '9%', height: '9%' },
      todoDocument: { left: '62%', top: '-62%', width: '19%', height: '40%' },
      abstractImage: { left: '44%', top: '-20%', width: '9%', height: '9%' },
      threeLinesImage: { left: '44%', top: '15%', width: '9%', height: '11%' }
    };
  }

  if (screenWidth <= CHROME_BREAKPOINTS.tablet) {
    // Tablet (426px–768px)
    return {
      laptop: { left: '46%', top: '62%', width: '32%', height: '30%' },
      phone: { left: '12%', bottom: '6%', width: '25%', height: '26%' },
      profileImage: { left: '74%', top: '-5%', width: '7%', height: '8%' },
      todoDocument: { left: '57%', top: '-12%', width: '10%', height: '22%' },
      abstractImage: { left: '47%', top: '10%', width: '5%', height: '7%' },
      threeLinesImage: { left: '46.5%', top: '29%', width: '5%', height: '8%' }
    };
  }

  if (screenWidth <= CHROME_BREAKPOINTS.laptop) {
    // Laptop (769px–1024px)
    return {
      laptop: { left: '47%', top: '59%', width: '25%', height: '23%' },
      phone: { left: '13%', bottom: '8%', width: '22%', height: '28%' },
      profileImage: { left: '68%', top: '9%', width: '6%', height: '6%' },
      todoDocument: { left: '55%', top: '3%', width: '8%', height: '17%' },
      abstractImage: { left: '47%', top: '20%', width: '5%', height: '5%' },
      threeLinesImage: { left: '47%', top: '34%', width: '5%', height: '5%' }
    };
  }

  if (screenWidth <= CHROME_BREAKPOINTS.laptopL) {
    // Laptop L (1025px–1440px)
    return {
      laptop: { left: '46.7%', top: '60%', width: '28%', height: '24%' },
      phone: { left: '12%', bottom: '7%', width: '21%', height: '27%' },
      profileImage: { left: '71%', top: '6%', width: '4.8%', height: '4.8%' },
      todoDocument: { left: '56%', top: '1%', width: '8%', height: '15%' },
      abstractImage: { left: '47%', top: '18%', width: '5%', height: '5%' },
      threeLinesImage: { left: '47%', top: '34%', width: '5%', height: '5%' }
    };
  }

  if (screenWidth <= CHROME_BREAKPOINTS.desktop4K) {
    // Desktop (1441px–2560px)
    return {
       laptop: { left: '46.7%', top: '60%', width: '28%', height: '24%' },
      phone: { left: '12%', bottom: '7%', width: '21%', height: '27%' },
      profileImage: { left: '71%', top: '6%', width: '4.8%', height: '4.8%' },
      todoDocument: { left: '56%', top: '1%', width: '8%', height: '15%' },
      abstractImage: { left: '47%', top: '18%', width: '5%', height: '5%' },
      threeLinesImage: { left: '47%', top: '34%', width: '5%', height: '5%' }
    };
  }

  // 4K and beyond (> 2560px)
  return {
    laptop: { left: '47%', top: '60%', width: '10%', height: '23%' },
    phone: { left: '13%', bottom: '8%', width: '20%', height: '26%' },
    profileImage: { left: '69.5%', top: '7%', width: '4.5%', height: '4.5%' },
    todoDocument: { left: '54.2%', top: '11.2%', width: '8%', height: '18%' },
    abstractImage: { left: '44.8%', top: '11.3%', width: '7.8%', height: '5.8%' },
    threeLinesImage: { left: '46.2%', top: '26.5%', width: '5.8%', height: '5.8%' }
  };
};




export const useResponsiveOverlays = () => {
  const [positions, setPositions] = useState<ResponsivePositions>(() =>
    getResponsivePositions(typeof window !== 'undefined' ? window.innerWidth : 1920)
  );

  const updatePositions = useCallback(() => {
    const newPositions = getResponsivePositions(window.innerWidth);
    setPositions(newPositions);
  }, []);

  useEffect(() => {
    updatePositions();

    const handleResize = () => {
      updatePositions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updatePositions]);

  return positions;
};
