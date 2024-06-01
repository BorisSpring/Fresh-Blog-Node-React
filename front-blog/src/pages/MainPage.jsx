import React from 'react';

// components
import HeroSection from '../components/HeroSection';
import BlogArticleSection from '../components/BlogArticleSection';
import Cta from '../components/Cta';

const MainPage = () => {
  return (
    <main className=' rounded-bl-[100px] rounded-br-[100px]'>
      <HeroSection />
      <BlogArticleSection />
      <Cta />
    </main>
  );
};

export default MainPage;
