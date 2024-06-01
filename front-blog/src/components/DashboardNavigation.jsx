import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu, RxDashboard } from 'react-icons/rx';
import { FaHashtag, FaRegComments, FaBlog, FaUserEdit } from 'react-icons/fa';
import { MdCategory, MdMessage, MdLogout } from 'react-icons/md';
import { IoIosSettings, IoMdHome, IoMdAddCircle } from 'react-icons/io';

// utils
import { cn } from '../../utils/utils';

// custom hook
import { useGetLoggedUser } from '../hooks/users/useGetLoggedUser';
import { useScreenDetector } from '../hooks/universal/useScreenDetector';
import { useQueryClient } from '@tanstack/react-query';

const links = [
  {
    path: '/',
    icon: <IoMdHome className='w-5 h-5' />,
    label: 'Home',
    role: ['admin', 'user'],
  },
  {
    path: '/dashboard/settings',
    icon: <IoIosSettings className='w-5 h-5' />,
    label: 'Settings',
    role: ['admin', 'user'],
  },
  {
    path: '/dashboard/statistics',
    icon: <RxDashboard className='w-5 h-5' />,
    label: 'Dashboard',
    role: ['admin'],
  },
  {
    path: '/dashboard/blogs?page=1',
    icon: <FaBlog className='w-5 h-5' />,
    label: 'Blogs',
    role: ['admin', 'user'],
  },
  {
    path: '/dashboard/comments?page=1',
    icon: <FaRegComments className='w-5 h-5' />,
    label: 'Comments',
    role: ['admin', 'user'],
  },
  {
    path: '/dashboard/messages?page=1',
    icon: <MdMessage className='w-5 h-5' />,
    label: 'Messages',
    role: ['admin'],
  },
  {
    path: '/dashboard/users?page=1',
    icon: <FaUserEdit />,
    label: 'Users',
    role: ['admin'],
  },
  {
    path: '/dashboard/categories',
    icon: <MdCategory />,
    label: 'Categories',
    role: ['admin'],
  },
  {
    path: '/dashboard/tags',
    icon: <FaHashtag />,
    label: 'Tags',
    role: ['admin'],
  },
  {
    path: '/dashboard/addBlog',
    icon: <IoMdAddCircle className='w-5 h-5' />,
    label: 'Add Blog',
    role: ['admin', 'user'],
  },
  {
    path: '/signin',
    icon: <MdLogout className='w-5 h-5' />,
    label: 'Logout',
    role: ['admin', 'user'],
  },
];

const DashboardNavigation = () => {
  const { isMobile } = useScreenDetector();
  const [isNavOpen, setisNavOpen] = useState(() => (isMobile ? false : true));
  const { loggedUser } = useGetLoggedUser();
  const queryClient = useQueryClient();

  return (
    <aside
      className={cn(
        'bg-white w-[52px] fixed md:relative h-full whitespace-nowrap p-2  transition-all duration-500 flex flex-col items-center py-5 gap-5',
        {
          'w-36 ': isNavOpen,
        }
      )}
    >
      <img
        src='/img/Logo.svg'
        alt='blog logo'
        className={cn('w-10 h-5 transition-all duration-300', {
          'w-full': isNavOpen,
        })}
      />
      {/* hamburgerMenu */}
      <button
        className='md:hidden'
        onClick={() => setisNavOpen((prev) => !prev)}
      >
        <RxHamburgerMenu
          className={cn('text-2xl transition-all duration-500', {
            'rotate-[360deg]': isNavOpen,
          })}
        />
      </button>
      <h4
        className={cn(
          'text-14 md:text-[14px] hidden md:inline transition-all duration-100 text-textColor font-bold opacity-100',
          { 'opacity-0 ': !isNavOpen }
        )}
      >
        MAIN MENU
      </h4>

      <ul className='flex flex-col gap-2 md:gap-3'>
        {links.map(
          ({ path, icon, label, role }) =>
            role.includes(loggedUser?.data?.role) && (
              <li
                key={path}
                className={cn({
                  'w-8 mx-auto': !isNavOpen,
                })}
              >
                <NavLink
                  onClick={() => {
                    if (path === '/signin') {
                      localStorage.removeItem('jwt');
                      queryClient.removeQueries(['loggedUser']);
                    }
                  }}
                  to={`${path}`}
                  className={({ isActive }) =>
                    cn(
                      'flex gap-2 hover:bg-blue-0 items-center p-1 rounded-md   text-textColor font-bold text-[14px] md:text-[16px]',
                      { 'text-blue-75 bg-blue-0 ': isActive }
                    )
                  }
                >
                  {icon}
                  <span
                    className={cn('opacity-0 w-0 transition-all duration-100', {
                      'opacity-100 w-fit': isNavOpen,
                    })}
                  >
                    {label}
                  </span>
                </NavLink>
              </li>
            )
        )}
      </ul>
    </aside>
  );
};

export default DashboardNavigation;
