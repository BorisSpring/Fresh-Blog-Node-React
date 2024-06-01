import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from 'date-fns';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

// cusotm hooks
import { useScreenDetector } from '../hooks/universal/useScreenDetector';
import { useCreateComment } from '../hooks/comments/useCreateComment';

// utils
import { getImageUrl } from '../../utils/utils';
import { fadeIn } from '../../utils/variants';

const SingleBlogArticle = ({
  image,
  introduction,
  body,
  conclusion,
  createdAt,
  category,
  title,
  id,
  loggedUser,
}) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm();
  const { addComment, isAddingComment } = useCreateComment(reset);
  const { isDesktop } = useScreenDetector();

  const onHandleSubmit = (data) => {
    addComment({ blogId: id, comment: data.comment });
  };

  return (
    <>
      <div className='flex gap-1 text-[12px] text-textColor md:text-14'>
        <Link to='/'>Home</Link> / Blog / {title}
      </div>
      <motion.img
        initial='hidden'
        animate='show'
        variants={fadeIn(0.2, 0.7, isDesktop ? 'left' : 'down', 'easeIn')}
        src={getImageUrl(image)}
        alt='blog image'
        className='max-h-[171px] md:max-h-[405px] rounded-lg'
      />
      <div className='flex items-center justify-between text-blue-75 text-14 md:text-[16px] font-[500] tracking-[2px]'>
        <p>{category}</p>
        <p className='text-sm tracking-[0px]'>
          {createdAt && formatDate(createdAt, 'dd MMM, yyyy')}
        </p>
      </div>
      <h2 className='font-medium text-[22px] md:text-[26px]'>{title}</h2>
      <div className='flex flex-col gap-3 text-textColor font-[16px]'>
        <p>{introduction}</p>
        <p>{body}</p>
        <p>{conclusion}</p>
      </div>
      {/* comment form */}
      <form onSubmit={handleSubmit(onHandleSubmit)} className='w-full relative'>
        <p className='text-red-700'>{errors?.comment?.message}</p>
        <textarea
          {...register('comment', {
            required: 'Comment is required!',
            minLength: { value: 6, message: 'Min length is 6 characters!' },
            maxLength: {
              value: '255',
              message: `Max length is 255 characters!`,
            },
          })}
          name='comment'
          id='comment'
          rows={4}
          className='text-textColor outline-none w-full placeholder:text-textColor text-[16px] rounded border-[#76AEFF] border-2 p-2 md:p-3 lg:p-4'
          placeholder='Leave your comment here...'
        ></textarea>
        {loggedUser?.data ? (
          <button
            disabled={isAddingComment}
            className='outline-none whitespace-nowrap right-1 bottom-3 bg-blue-75 text-white font-semibold text-sm md:text-base lg:text-lg hover:shadow-md hover:shadow-blue-50 px-2 py-1 rounded-md focus:ring-1 focus:ring-blue-50  transition-all duration-300 absolute'
          >
            Post Comment
          </button>
        ) : (
          <Link
            to='/signin'
            className='outline-none whitespace-nowrap right-1 bottom-3 bg-blue-75 text-white font-semibold text-sm md:text-base lg:text-lg hover:shadow-md hover:shadow-blue-50 px-2 py-1 rounded-md focus:ring-1 focus:ring-blue-50  transition-all duration-300 absolute'
          >
            Login to post comment
          </Link>
        )}
      </form>
    </>
  );
};

export default SingleBlogArticle;
