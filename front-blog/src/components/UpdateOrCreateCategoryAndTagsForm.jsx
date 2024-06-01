import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// components
import FormGroupElement from './FormGroupElement';

// custom hooks
import { useUpdateCategory } from '../hooks/categories/useUpdateCategory';
import { useCreateCategory } from '../hooks/categories/useCreateCategory';
import { useCreateTag } from '../hooks/tags/useCreateTag';
import { useUpdateTag } from '../hooks/tags/useUpdateTag';

const UpdateOrCreateCategoryAndTagsForm = ({
  action,
  name,
  id,
  onClick,
  type,
}) => {
  const [serverValidation, setServerValidation] = useState('');
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      name,
    },
  });
  const { updateCategory, isUpdateing } = useUpdateCategory(
    setServerValidation,
    reset
  );
  const { createCategory, isCreating } = useCreateCategory();
  const { createTag, isCreating: isCreatingTag } = useCreateTag();
  const { updateTag, isUpdateing: isUpdateingTag } = useUpdateTag();

  const onHandleSubmit = (data) => {
    if (type === 'category') {
      action === 'update'
        ? updateCategory({ id, name: data.name })
        : createCategory(data);
    } else {
      action === 'update'
        ? updateTag({ id, name: data.name })
        : createTag(data);
    }
    onClick();
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <FormGroupElement
        label='Name'
        name='name'
        id='name'
        errorMsgTwo={serverValidation?.name?.message}
        errorMsg={errors?.name?.message}
        placeholder='Enter name'
        register={{
          ...register('name', {
            required: 'Name is required!',
            validate: (value) =>
              (value.trim().length > 6 && value !== name) ||
              'Name must be above 6 characters long!',
          }),
        }}
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
          disabled={
            isUpdateing || isCreating || isCreatingTag || isUpdateingTag
          }
          type='submit'
          className='outline-none focus:ring-1 focus:ring-blue-50 bg-blue-75 text-white px-2 py-1 rounded-md'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateOrCreateCategoryAndTagsForm;
