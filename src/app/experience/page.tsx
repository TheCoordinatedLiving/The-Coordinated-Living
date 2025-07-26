"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ExperiencePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page immediately
    router.replace('/');
  }, [router]);

  // Return null or a loading state while redirecting
  return null;
};

export default ExperiencePage;