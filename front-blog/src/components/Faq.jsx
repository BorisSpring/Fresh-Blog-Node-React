import React, { useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

// utils
import { fadeIn } from '../../utils/variants';
import { cn } from '../../utils/utils';

const Faq = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const onHandleOpenClose = () => setIsOpen((prev) => !prev);
  return (
    <motion.div
      variants={fadeIn(
        0.2,
        index * 0.1,
        index % 2 === 0 ? 'left' : 'right',
        'ease'
      )}
      initial='hidden'
      animate='show'
      whileInView={{ once: true }}
      className='flex flex-col h-fit transition-all duration-500 w-full rounded-md overflow-hidden max-w-[900px] font-sans  bg-white shadow-md'
    >
      {/* question and button */}
      <div
        className={cn(
          'flex justify-between bg-blue-500 items-center hover:bg-blue-700 transition-all duration-500 p-2 gap-5 md:p-3 font-semibold  text-white text-[15px] md:text-lg ',
          { 'bg-blue-0 text-blue-75 hover:bg-blue-200': isOpen }
        )}
      >
        <h3 className='leading-5 tracking-tighter md:tracking-normal'>
          {question}
        </h3>
        <button
          onClick={onHandleOpenClose}
          className='md:text-xl  flex transition-all duration-500 outline-none focus:ring-1 focus:ring-transparent'
        >
          <FaChevronDown
            className={cn('rotate-180 transition-transform duration-[0.7s]', {
              'rotate-8': isOpen,
            })}
          />
        </button>
      </div>

      <div
        ref={contentRef}
        style={{
          animationTimingFunction: 'ease',
        }}
        className={cn('overflow-hidden transition-all  duration-[0.7s]', {
          'max-h-[300px]': isOpen,
          'max-h-0': !isOpen,
        })}
      >
        <p
          className={cn(
            'text-sm p-2 py-5 transition-opacity duration-[0.6s] text-gray-700 md:text-base opacity-1',
            { 'opacity-0': !isOpen }
          )}
        >
          {answer}
        </p>
      </div>
    </motion.div>
  );
};

export default Faq;
