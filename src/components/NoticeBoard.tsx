import React from 'react';
import Image from 'next/image';
import styles from './NoticeBoard.module.css';

const papers = [
  {
    src: '/notice-paper1.svg',
    style: {
      left: 40,
      top: 40,
      width: 268,
      height: 320,
      transform: 'rotate(-2deg)',
      zIndex: 2,
    },
    label: 'Paper 1',
  },
  {
    src: '/notice-paper2.svg',
    style: {
      left: 340,
      top: 60,
      width: 177,
      height: 184,
      zIndex: 2,
    },
    label: 'Paper 2',
  },
  {
    src: '/notice-paper3.svg',
    style: {
      left: 340,
      top: 250,
      width: 159,
      height: 161,
      zIndex: 2,
    },
    label: 'Paper 3',
  },
  {
    src: '/notice-paper4.svg',
    style: {
      left: 600,
      top: 60,
      width: 142,
      height: 142,
      zIndex: 2,
    },
    label: 'Paper 4',
  },
  {
    src: '/notice-paper5.svg',
    style: {
      left: 600,
      top: 200,
      width: 144,
      height: 148,
      zIndex: 2,
    },
    label: 'Paper 5',
  },
  {
    src: '/notice-paper6.svg',
    style: {
      left: 750,
      top: 320,
      width: 142,
      height: 142,
      zIndex: 2,
    },
    label: 'Paper 6',
  },
];

const NoticeBoard: React.FC = () => {
  return (
    <div className={styles.boardContainer}>
      <div
        className={styles.boardBg}
        style={{
          width: 939,
          height: 493,
          background: `url('/Notice-Board.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        aria-hidden="true"
      />
      {papers.map((paper) => (
        <Image
          key={paper.src}
          src={paper.src}
          alt={paper.label}
          width={paper.style.width}
          height={paper.style.height}
          className={styles.paper}
          style={{
            position: 'absolute',
            cursor: 'pointer',
            ...paper.style,
          }}
          onClick={() => alert(`${paper.label} clicked!`)}
        />
      ))}
      
      {/* White clip-path overlay on the white card with lines (top left) */}
      <div
        className="absolute cursor-pointer"
        style={{
          left: '40px',
          top: '40px',
          width: '268px',
          height: '320px',
          transform: 'rotate(-2deg)',
          zIndex: 10,
          background: 'rgba(0, 0, 0, 0.8)',
          clipPath: 'polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)',
        }}
        onClick={() => {
          console.log('White card with lines clicked!');
          // TODO: Add interaction logic
        }}
      />
    </div>
  );
};

export default NoticeBoard; 