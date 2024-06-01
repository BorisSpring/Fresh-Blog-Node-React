import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

// components
import FormGroupElement from './FormGroupElement';

// custom hooks
import { useSendMessage } from '../hooks/messages/useSendMessage';

// utils
import { cn } from '../../utils/utils';

const SendMessageForm = () => {
  const [serverValidation, setServerValidation] = useState();
  const {
    formState: { errors },
    handleSubmit,
    reset,
    register,
  } = useForm();
  const { sendMsg, isSending } = useSendMessage(setServerValidation, reset);

  const onHandleSubmit = (data) => {
    sendMsg(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className='w-full max-w-[900px] mx-auto gap-5 text-textColor md:gap-10 grid md:grid-cols-2 grid-cols-1'
    >
      {/* receipt */}
      <FormGroupElement
        label='Receipt'
        name='from'
        type='email'
        id='from'
        // isTextArea={true}
        stylesLabel='text-blue-75 md:text-xl'
        stylesInput='focus:border-blue-75 transition-all duration-300 '
        errorMsgTwo={serverValidation?.from?.message}
        errorMsg={errors?.from?.message}
        placeholder='Enter your email address'
        register={{
          ...register('from', {
            required: 'Receipt is required!',
          }),
        }}
      />

      {/* subject */}
      <FormGroupElement
        label='Subject'
        name='subject'
        id='subject'
        stylesLabel='text-blue-75 md:text-xl'
        stylesInput='focus:border-blue-75 transition-all duration-300 '
        errorMsgTwo={serverValidation?.name?.message}
        errorMsg={errors?.subject?.message}
        placeholder='Subject'
        register={{
          ...register('subject', {
            required: 'Subject is required!',
            minLength: {
              value: 10,
              message: 'Subject must be at least 10 characters long',
            },
            maxLength: {
              value: 255,
              message: 'Subject must be at most 255 characters long',
            },
          }),
        }}
      />

      {/* message --- div used for grid col span */}
      <div className='w-full bg red-200 col-span-2'>
        <FormGroupElement
          label='Message'
          name='message'
          id='message'
          rows={5}
          stylesLabel='text-blue-75 md:text-xl'
          stylesInput='focus:border-blue-75 transition-all duration-300'
          isTextArea={true}
          errorMsgTwo={serverValidation?.name?.message}
          errorMsg={errors?.subject?.message}
          placeholder='Write message here'
          register={{
            ...register('message', {
              required: 'Message is required!',
              validate: (value) =>
                (value.trim().length > 9 && value.trim().length < 256) ||
                'Message but be between 10 and 255 characters long',
            }),
          }}
        />
      </div>

      {/* submit button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isSending}
        className={cn(
          'outline-none lg:col-span-2 rounded-md hover:bg-blue-700 transition-all duration-300 border-none w-full bg-blue-75 text-white py-1 text-base md:text-lg lg:text-2xl',
          { grayscale: isSending }
        )}
      >
        Send Message
      </motion.button>
    </form>
  );
};

export default SendMessageForm;
