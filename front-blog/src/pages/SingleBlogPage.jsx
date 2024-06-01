import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// components
import SingleBlogArticle from '../components/SingleBlogArticle';
import Comment from '../components/Comment';
import BlogFilterBox from '../components/BlogFilterBox';
import Loader from '../components/Loader';

// custom hooks
import { useGetBlogBySlug } from '../hooks/blogs/useGetBlogBySlug';
import { useGetLoggedUser } from '../hooks/users/useGetLoggedUser';
import { useDeleteComment } from '../hooks/comments/useDeleteComment';
import { fadeIn } from '../../utils/variants';

const SingleBlogPage = () => {
  const { blog, isError, isLoading, error } = useGetBlogBySlug();
  const navigate = useNavigate();
  const { loggedUser, isLoadingUser } = useGetLoggedUser();
  const { deleteComment, isDeletingComment } = useDeleteComment();
  const {
    image,
    introduction,
    conclusion,
    createdAt,
    category,
    body,
    title,
    comments,
    tags,
    id,
  } = blog?.data ?? {};

  useEffect(() => {
    if (isError || error?.response?.status === 404) {
      navigate(
        `/error/404?message=${error?.response?.data?.message.replaceAll(
          ' ',
          '-'
        )}`
      );
    }
  }, [error, navigate, isError]);

  if (isLoading || isLoadingUser) return <Loader />;

  return (
    <section className='grid grid-cols-1 lg:grid-cols-3 gap-5  px-5 py-10 md:py-16 lg:py-24 md:px-10 lg:px-16'>
      {/* blog description and content */}
      <article className='flex flex-col gap-5 font-roboto lg:col-span-2'>
        <SingleBlogArticle
          image={image}
          introduction={introduction}
          conclusion={conclusion}
          createdAt={createdAt}
          body={body}
          title={title}
          category={category?.name}
          loggedUser={loggedUser}
          id={id}
        />
        {/* blogTags */}
        <div className='flex flex-col gap-1'>
          <h5 className='text-blue-75 font-semibold'>Blog Tags</h5>
          <div className='flex flex-wrap gap-2'>
            {tags?.map(({ name }, index) => (
              <motion.span
                variants={fadeIn(
                  0.3,
                  0.3 + index * 0.1,
                  index % 2 === 0 ? 'up' : 'down',
                  'easeIn',
                  20
                )}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true }}
                key={name}
              >
                <Link
                  to={`/?tag=${name}`}
                  key={name}
                  className='text-[10px] px-3 py-1 md:py-1 rounded-md capitalize  hover:bg-blue-85 hover:shadow-md transition-all duration-300 bg-blue-75 md:text-[14px] text-white'
                >
                  {name}
                </Link>
              </motion.span>
            ))}
          </div>
        </div>
        {/* blog comments */}
        <h4 className='font-semibold text-[#283646]'>
          All Comments ({comments?.length ?? 0})
        </h4>
        <div className='max-h-[750px] overflow-y-auto flex flex-col gap-3 md:gap-5'>
          {comments?.map((comment, index) => (
            <Comment
              key={index}
              {...comment}
              loggedUser={loggedUser}
              deleteComment={deleteComment}
              isDeletingComment={isDeletingComment}
            />
          ))}
        </div>
      </article>
      <BlogFilterBox />
    </section>
  );
};

export default SingleBlogPage;
