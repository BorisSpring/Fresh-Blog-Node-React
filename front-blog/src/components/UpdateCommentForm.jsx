import React from 'react';
import { useForm } from 'react-hook-form';

// custom hook
import { useUpdateComment } from '../hooks/comments/useUpdateComment';

const UpdateCommentForm = ({ id, comment, onClick }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      comment: comment,
    },
  });
  const { updateComment, isUpdateing } = useUpdateComment();

  const onHandleSubmit = (data) => {
    updateComment({ commentId: id, comment: data.comment });
    onClick();
  };

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className='border border-gray-100 rounded-md p-2 md:p-4 flex flex-col gap-1 md:gap-2 md:text-base'
    >
      <label htmlFor='comment'>Update Comment Text</label>
      <p className='text-red-700'>{errors?.comment?.message}</p>
      <textarea
        className='outline-none p-2 border border-gray-300 rounded-md focus:shadow-md focus:border-gray-600'
        type='text'
        {...register('comment', {
          required: 'Comment is required!',
          validate: (value) =>
            value.trim().length > 8 ||
            'Comment must be at least 8 characters long!',
        })}
      />
      <div className='flex items-center justify-between mt-2'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className='outline-none focus:ring-1 border hover:shadow-md focus:ring-blue-50 bg-white text-gray-700 px-2 py-1 rounded-md'
        >
          Cancel
        </button>
        <button
          disabled={isUpdateing}
          type='submit'
          className='outline-none focus:ring-1 focus:ring-blue-50 bg-blue-75 text-white px-2 py-1 rounded-md'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateCommentForm;
