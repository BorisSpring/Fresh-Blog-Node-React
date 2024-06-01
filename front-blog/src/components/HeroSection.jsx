import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

// components
import Loader from './Loader';
import { fadeIn } from '../../utils/variants';

// custom hooks
import { useFindPopularTags } from '../hooks/tags/useFindPopularTags';
import { useScreenDetector } from '../hooks/universal/useScreenDetector';

const HeroSection = () => {
  const { tags, isLoadingTags } = useFindPopularTags();
  const { isDesktop } = useScreenDetector();
  const navigate = useNavigate();

  return (
    <header className='container mx-auto paddingX pt-6 md:pt-12 lg:pt-24 text-textColor text-center lg:text-left flex items-center  justify-between'>
      <motion.div
        variants={fadeIn(0.5, 0.5, isDesktop ? 'left' : 'down', 'easeIn')}
        initial='hidden'
        animate='show'
        className='flex flex-col gap-5  justify-between'
      >
        <h1 className='font-roboto text-[31px] md:text-[47px] md:leading-[44px] lg:text-[51px] lg:leading-[52px] font-semibold text-blue-85 leading-9 '>
          Read the most interesting articles
        </h1>
        <p className='text-16 md:text-20 max-w-[540px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <div className='mt-5 md:mt-0 flex flex-col gap-3 relative'>
          <input
            type='text'
            placeholder='Search Article'
            className='outline-none placeholder:font-semibold bg-white  rounded-md shadow-lg  h-[48px] md:h-[56px] px-2 py-1'
          />
          <button className='text-white md:absolute md:w-[94px] md:h-10 font-bold md:top-1/2  md:right-2 md:-translate-y-1/2 bg-blue-75 rounded-md w-full py-2 text-16 '>
            Search
          </button>
        </div>
        <div className='flex gap-2 items-center flex-wrap'>
          <p className='font-bold italic text-14 w-fit  '>Popular Tags:</p>
          {isLoadingTags ? (
            <Loader height='h-[30px]' />
          ) : (
            <ul className='flex gap-2 whitespace-nowrap flex-wrap'>
              {tags?.data?.map(({ name }, index) => (
                <motion.li
                  variants={fadeIn(
                    index * 0.1,
                    0.3,
                    index % 2 === 0 ? 'up' : 'down',
                    'easeIn',
                    15
                  )}
                  initial='hidden'
                  animate='show'
                  className='text-blue-75 hover:bg-white hover:shadow-md text-14 md:text-16 rounded-md font-sans font-bold italic px-2 py-1 bg-blue-0 hover:blue-10 transition-all duration-200'
                  key={name}
                >
                  <button
                    onClick={() => {
                      navigate(`?tag=${name}`);
                    }}
                  >
                    {name}
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
      <motion.img
        variants={fadeIn(0.5, 0.5, 'right', 'easeIn')}
        initial='hidden'
        animate='show'
        src='img/heroImage.svg'
        alt='Hero iamge'
        className='hidden lg:block lg:w-[700px] lg:h-[525px]'
      />
    </header>
  );
};

export default HeroSection;
