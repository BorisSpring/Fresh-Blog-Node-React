import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// custom hooks
import { useScreenDetector } from '../hooks/universal/useScreenDetector';

// utils
import { fadeIn } from '../../utils/variants';

const footerLinks = [
  {
    title: 'Product',
    links: [
      'Landingpage',
      'Features',
      'Documentationns',
      'Refereal Program',
      'Pricing',
    ],
  },
  {
    title: 'Services',
    links: ['Documentation', 'Design', 'Themes', 'Illustrations', 'UI Kit'],
  },
  {
    title: 'Company',
    links: ['About', 'Terms', 'Privacy and policy', 'Careers'],
  },
  {
    title: 'More',
    links: ['Documentation', 'License', 'Changelog'],
  },
];

const getClassName = (index, isMobile, isTablet, isDesktop) => {
  if (isMobile || isTablet) {
    return index % 2 === 0 ? 'left' : 'right';
  } else if (isDesktop) {
    return index % 2 === 0 ? 'down' : 'up';
  }
};

const Footer = () => {
  const { isMobile, isTablet, isDesktop } = useScreenDetector();

  return (
    <footer className='bg-blue-100 flex flex-col gap-5 font-sans text-textColor paddingX py-10 md:py16 lg:py-24 border border-gray-50/5'>
      <motion.div
        whileInView='show'
        viewport={{ once: true }}
        initial='hidden'
        variants={fadeIn(0.3, 0.9, isMobile ? 'down' : 'left', 'easeIn', 100)}
        className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'
      >
        <div className='col-span-2 mx-auto flex flex-col gap-5  order-5 mt-5 md:mt-0 md:order-1 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-2  '>
          <img
            src='/img/logoWhite.png'
            alt='Our logo'
            className='w-[90px] h-7'
          />
          <p className='md:max-w-[253px]'>
            Build a modern and creative website with crealand
          </p>
          <div className='flex gap-2'>
            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500'></div>
            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500'></div>
            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500'></div>
            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500'></div>
          </div>
        </div>

        {footerLinks.map(({ title, links }, index) => {
          return (
            //  (delay, duration, direction, type, distance = 200)
            <motion.ul
              variants={fadeIn(
                0.3,
                0.9,
                getClassName(index, isMobile, isTablet, isDesktop),
                'easeIn',
                200
              )}
              viewport={{ once: true }}
              initial='hidden'
              whileInView='show'
              className='flex flex-col gap-2 mx-auto'
              key={title}
            >
              <li className='md:text-[18px] mb-1 text-[16px] font-bold'>
                {title}
              </li>
              {links.map((link) => (
                <li className='text-[14px] md:text-[16px] w-fit' key={link}>
                  <Link
                    to='#'
                    className='inline-block hover:text-white transition-all duration-300 footer-link'
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </motion.ul>
          );
        })}
      </motion.div>
      <div className='flex mt-3 flex-col gap-2 items-center justify-center'>
        <div className='w-10 h-10 rounded-hull bg-blue-75 flex items-center justify-center rounded-full'>
          <img src='/img/heart.png' alt='heart icon' className='w-6 h-auto' />
        </div>
        <p className='text-textColor font-bold text-[10px] mx-auto'>
          Copyright &copy; 2024. Made By Boris Dimitrijevic
        </p>
      </div>
    </footer>
  );
};

export default Footer;
