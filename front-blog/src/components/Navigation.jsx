import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

// utils
import { cn } from '../../utils/utils';

// custom hooks
import { useScreenDetector } from '../hooks/universal/useScreenDetector';
import { useGetLoggedUser } from '../hooks/users/useGetLoggedUser.js';
import { navLinks } from '../../utils/variants.js';

const NavigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'Articles', path: '/' },
  { label: 'Pages', path: '/' },
  { label: 'Pricing', path: '/' },
  { label: 'Faq', path: '/faq' },
];

const Navigation = () => {
  const [navOptions, setNavOptions] = useState({
    isNavOpen: false,
    isScroll: false,
  });
  const { loggedUser } = useGetLoggedUser();
  const { isMobile, isTablet } = useScreenDetector();
  const queryClient = useQueryClient();

  const onHandleLogout = () => {
    if (loggedUser?.data) {
      localStorage.removeItem('jwt');
      queryClient.removeQueries(['loggedUser']);
      setNavOptions((prev) => ({ ...prev, isNavOpen: false }));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let scrollTreshold = isMobile ? 40 : isTablet ? 48 : 68;

      setNavOptions((prev) => ({
        ...prev,
        isScroll: window.scrollY > scrollTreshold,
      }));
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, isTablet]);

  return (
    <>
      <nav
        className={cn(
          'flex items-center w-full transition-colors duration-500 bg-white font-sans justify-between relative  mx-auto padding',
          {
            'bg-blue-100 fixed  z-[999] w-full shadow-md  ':
              navOptions.isScroll,
          }
        )}
      >
        {/* logo */}
        <img
          src={!navOptions.isScroll ? '/img/Logo.svg' : '/img/logoWhite.png'}
          alt='Blog logo'
          className='h-6 w-[77px] object-contain lg:h-7 lg:w-[90px]'
        />
        {/* navigation for desktop */}
        <ul className='gap-5 text-blue-75 font-semibold text-[16px] hidden md:flex'>
          {NavigationLinks.map((nav, i) => (
            <motion.li
              variants={navLinks(i * 0.1)}
              initial='initial'
              animate='show'
              key={nav.label}
            >
              <NavLink
                to={nav.path}
                className={({ isActive }) =>
                  cn(
                    'hover:text-blue-100  footer-link outline-none  transition-all duration-500',
                    { 'text-white hover:text-gray-200': navOptions.isScroll }
                  )
                }
              >
                {nav.label}
              </NavLink>
            </motion.li>
          ))}
          {/* links for logged user and based on roles */}
          {loggedUser?.data && (
            <motion.li
              variants={navLinks(0.4)}
              initial='initial'
              animate='show'
            >
              <NavLink
                to='/dashboard'
                className={({ isActive }) =>
                  cn(
                    'hover:text-blue-100  footer-link outline-none  transition-all duration-500',
                    { 'text-white hover:text-gray-200': navOptions.isScroll }
                  )
                }
              >
                Dashboard
              </NavLink>
            </motion.li>
          )}
          <motion.li variants={navLinks(0.6)} initial='initial' animate='show'>
            <NavLink
              onClick={onHandleLogout}
              to='/signin'
              className={({ isActive }) =>
                cn(
                  'outline-none  border-blue-75 px-2 hover:bg-blue-75 hover:text-white  border rounded-lg py-1 transition-all duration-500',
                  { 'text-white hover:text-gray-200': navOptions.isScroll }
                )
              }
            >
              {!loggedUser?.data ? 'Sign in' : 'Logout'}
            </NavLink>
          </motion.li>
        </ul>
        {/* hamburger menu for navigation */}
        <button
          className={cn('md:hidden')}
          onClick={() =>
            setNavOptions((prev) => ({ ...prev, isNavOpen: !prev.isNavOpen }))
          }
        >
          <div
            className={cn(
              'w-5 h-[3px] transition-all duration-300 bg-gray-500 -translate-y-[4px]',
              {
                '-translate-y-[1px] rotate-45 ': navOptions.isNavOpen,
              },
              { 'bg-white': navOptions.isScroll }
            )}
          ></div>
          <div
            className={cn(
              'w-5 h-[3px] relative transition-all duration-300 bg-gray-500',
              {
                hidden: navOptions.isNavOpen,
              },
              { 'bg-white': navOptions.isScroll }
            )}
          ></div>
          <div
            className={cn(
              'w-5 h-[3px] transition-all duration-300 bg-gray-500 translate-y-[4px]',
              {
                '-translate-y-[4px] -rotate-45 ': navOptions.isNavOpen,
              },
              { 'bg-white': navOptions.isScroll }
            )}
          ></div>
        </button>
      </nav>
      {/* mobile navigation */}
      <div
        className={cn(
          'w-full scale-x-0 py-2  shadow-md transition-all mt-10 origin-left duration-300  fixed  z-50 bg-white',
          {
            'scale-x-100': navOptions.isNavOpen,
          }
        )}
      >
        {/* mobile links */}
        <ul className=' text-blue-75  font-semibold text-sm  flex flex-col'>
          {NavigationLinks.map(({ label, path }, i) => (
            <motion.li
              variants={navLinks(i * 0.1)}
              initial='initial'
              animate='show'
              key={label}
              className='w-full px-2'
            >
              <NavLink
                to={path}
                className={({ isActive }) =>
                  cn(
                    ' w-full transition-all px-2 py-1 rounded-md  inline-block duration-300',
                    {
                      'bg-blue-0': isActive,
                    }
                  )
                }
              >
                {label}
              </NavLink>
            </motion.li>
          ))}
          <li className='w-full px-2'>
            <NavLink
              to='/dashboard'
              className={({ isActive }) =>
                cn(
                  ' w-full transition-all px-2 py-1 rounded-md  inline-block duration-300',
                  {
                    'bg-blue-0': isActive,
                  }
                )
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className='w-full px-2'>
            <NavLink
              onClick={onHandleLogout}
              to='/signin'
              className={({ isActive }) =>
                cn(
                  ' w-full transition-all px-2 py-1 rounded-md  inline-block duration-300',
                  {
                    'bg-blue-0': isActive,
                  }
                )
              }
            >
              {!loggedUser?.data ? 'Sign In' : 'Logout'}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
