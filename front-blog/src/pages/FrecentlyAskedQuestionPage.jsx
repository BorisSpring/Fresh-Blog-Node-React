import React from 'react';
import { motion } from 'framer-motion';

// questions object
import { faqQuestions } from '../../utils/faqQuetions';

// components
import Faq from '../components/Faq';
import SendMessageForm from '../components/SendMessageForm';

// utils
import { fadeIn } from '../../utils/variants';

const FrecentlyAskedQuestionPage = () => {
  return (
    <div className='px-5 flex flex-col gap-10  py-[32px] md:px-10  md:py-[64px] lg:py-[95px]'>
      <motion.h2
        variants={fadeIn(0, 1, 'up', 'easeOut')}
        initial='hidden'
        animate='show'
        className='text-center text-[20px] font-bold md:text-[26px] lg:text-[30px] text-blue-75'
      >
        Frecently Asked Questions
      </motion.h2>
      <div className='mx-auto w-fit flex flex-col gap-5 md:gap-10 '>
        {faqQuestions.map((question, i) => (
          <Faq key={i} {...question} index={i} />
        ))}
      </div>
      <motion.h4
        variants={fadeIn(0, 1, 'up', 'easeOut')}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='text-center mt-5 md:mt-12 text-[17px] font-bold md:text-[22px] lg:text-[26px] text-blue-75'
      >
        Do u have any more unaswered questions? Feel free to contact us{' '}
      </motion.h4>
      <SendMessageForm />
    </div>
  );
};

export default FrecentlyAskedQuestionPage;
