import React from 'react';
import { motion } from 'framer-motion';

// components
import LatestBlogs from './LatestBlogs';
import Tags from './Tags';
import Categories from './Categories';

// custom hooks
import { useScreenDetector } from '../hooks/universal/useScreenDetector';

// utils
import { fadeIn } from '../../utils/variants';

// variants={fadeIn(0.2, 0.7, isDesktop ? 'left' : 'down', 'easeIn')}
const BlogFilterBox = () => {
  const { isDesktop } = useScreenDetector();

  return (
    <motion.aside
      initial='hidden'
      animate='show'
      variants={fadeIn(0.2, 0.7, isDesktop ? 'right' : 'down', 'easeIn')}
      className='flex flex-col gap-5 p-5 md:p-10 shadow-xl h-fit mt-3 lg:mt-0'
    >
      <LatestBlogs />
      <Tags />
      <Categories />
    </motion.aside>
  );
};

export default BlogFilterBox;
