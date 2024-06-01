import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/variants';
import { useScreenDetector } from '../hooks/universal/useScreenDetector';

const Cta = () => {
  const { isDesktop } = useScreenDetector();

  return (
    <>
      <svg
        className='w-full lg:hidden mt-5 h-auto max-h-40'
        width='2160'
        height='263'
        viewBox='0 0 2160 263'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          id='Wave'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z'
          fill='#0D2436'
        />
      </svg>
      <section className='bg-blue-100 lg:mt-24 md:py-16  lg:flex-row-reverse lg:gap-16  paddingX py-10 flex flex-col gap-10 justify-center items-center'>
        <div className='md:w-[466px] hidden md:inline-block  md:h-[385px] lg:w-[578px] lg:h-[427px] relative'>
          <motion.img
            initial='hidden'
            whileInView={'show'}
            variants={fadeIn(0.2, 0.5, 'right', 'easeIn')}
            src='img\Right.png'
            alt='the best article ever image'
            className='h-full w-full absolute z-[11]'
          />
          <div className='w-[237px] h-[200px] absolute bg-red-500/90 rounded-md z-[9] top-10 -right-10   lg:top-10 lg:-right-10 '></div>
          <div className='w-[237px] h-[200px] absolute bg-gray-300/45 z-10 rounded-md -left-10 bottom-8 lg:right-[380px] lg:-bottom-[30px]'></div>
        </div>
        <motion.div
          initial='hidden'
          whileInView='show'
          variants={fadeIn(0.2, 0.5, isDesktop ? 'left' : 'down', 'easeIn')}
          className='flex flex-col lg:gap-10 gap-5 lg:max-w-[555px]'
        >
          <h3 className='font-roboto text-24  lg:text-left md:text-[36px] md:text-center leading-8 md:leading-10 text-white font-bold'>
            Get our stories delivered From us to your inbox weekly.
          </h3>
          <form action='#' className='flex flex-col md:flex-row gap-3 md:gap-1'>
            <input
              placeholder='Your Email'
              type='email'
              required
              className='outline-none rounded-md md:w-[320px] bg-white text-textColor placeholder:text-textColor px-5 py-2 h-12'
            />
            <button
              type='submit'
              className='font-bold text-[16px] md:w-[166px] font-sans text-white md:text-[18px] rounded-md bg-blue-75 hover:bg-blue-40 transition-all duration-300 focus:ring-1 h-12 focus:ring-blue-50'
            >
              Get Started
            </button>
          </form>
          <p className='text-14 md:text-[16px] md:text-center lg:text-left  text-textColor'>
            <span className='font-bold md:font-normal md:text-textColor font-sans italic text-[#B3BAC5]'>
              {' '}
              Get a response tomorrow
            </span>{' '}
            if you submit by 9pm today. If we received after 9pm will get a
            reponse the following day.
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default Cta;
