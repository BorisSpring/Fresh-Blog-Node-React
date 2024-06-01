import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

// utils
import { cn, getImageUrl } from '../../utils/utils';

const BlogArticleCard = ({
  title,
  introduction,
  image,
  user: { name, isVerified, photo },
  createdAt,
  slug,
  index,
}) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1, transition: { duration: 0.7, delay: index * 0.1 } }}
      className='w-[288px]  md:w-[310px]  lg:w-[360px] rounded-md overflow-hidden shadow-md'
    >
      <Link to={`/blog/${slug}`}>
        <img
          src={getImageUrl(image)}
          alt='artilce image'
          className='h-[160px] w-full object-center object-cover md:h-[200px] lg:h-[255px]'
        />
        <div className='flex flex-col gap-3 lg:gap-5 p-3 md:p-4 lg:p-5'>
          <h3 className='font-roboto font-bold text-20 md:text-24 lg:text-28'>
            {title}
          </h3>
          {/* blog description */}
          <p className='md:text-16 lg:text-18 text-textColor text-14'>
            {introduction}
          </p>
          <div className='flex items-center justify-between'>
            {/* user informations box */}
            <div className='flex gap-2 items-center'>
              <img
                src={getImageUrl(photo, 'user')}
                alt='user avatar'
                className='w-9 h-9 md:w-10 md:h-10 rounded-full object-cover object-center'
              />
              <div>
                <p className='font-bold italic md:text-16 font-sans text-blue-85 text-14'>
                  {name}
                </p>
                <div className='flex items-center gap-1'>
                  <p className='italic text-[12px] text-textColor md:text-14 flex gap-1'>
                    <span
                      className={cn(
                        'bg-green-200 text-green-700 w-5 h-5 flex items-center justify-center rounded-full',
                        { 'text-red-700 bg-red-200': !isVerified }
                      )}
                    >
                      {' '}
                      {isVerified ? <FaCheck /> : <MdClose />}
                    </span>
                    {isVerified ? 'Verified Writer' : 'Not Verified Writer'}
                  </p>
                </div>
              </div>
            </div>
            <p className='font-sans font-bold italic text-14 text-textColor  md:text-16'>
              {format(new Date(createdAt), 'MMM dd')}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogArticleCard;
