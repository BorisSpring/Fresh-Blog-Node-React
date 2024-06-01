import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// components
import FormGroupElement from '../components/FormGroupElement';
import Loader from '../components/Loader';

// utils
import { getImageUrl } from '../../utils/utils';

// custom hooks
import { useFindAllTags } from '../hooks/tags/useFindAllTags';
import { useGetBlogBySlug } from '../hooks/blogs/useGetBlogBySlug';
import { useFindAllCategories } from '../hooks/categories/useFindAllCategories';
import { useCreateOrUpdateBlog } from '../hooks/blogs/useCreateOrUpdateBlog';
import TagSelectBlogForm from '../components/TagSelectBlogForm';
import CategorySelectBlogForm from '../components/CategorySelectBlogForm';

const CreateBlogPage = () => {
  // custom hooks for tag,blog and categories
  const { tags, isLoadingTags } = useFindAllTags();
  const { categories, isLoadingCategories } = useFindAllCategories();
  const { blog, isLoading } = useGetBlogBySlug();

  // state for tags and category and server validation
  const [settings, setSettings] = useState(() => ({
    serverValidation: '',
    tags: blog?.data?.tags || [],
    category: blog?.data?.category || '',
  }));

  // managing form state
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      title: blog?.data?.title,
      introduction: blog?.data?.introduction,
      conclusion: blog?.data?.conclusion,
      body: blog?.data?.body,
    },
  });

  // hook for updateing or creating the blog
  const { createOrUpdateBlog, isCreatingOrUpdateing } = useCreateOrUpdateBlog(
    setSettings,
    reset
  );

  // watching images change so we can display it when user add
  const images = watch('image');

  // function for handling submit
  const onHandleSubmit = (data) => {
    data.tags = settings?.tags?.map((tag) => tag.id);
    data.category = settings?.category?.id;
    const images = getValues('image');
    if (images?.length > 0) {
      data.photo = images[0];
      delete data['image'];
    }
    !blog?.data
      ? createOrUpdateBlog({ blog: data })
      : createOrUpdateBlog({ id: blog?.data.id, blog: data });
  };
  if (isLoadingTags || isLoadingCategories || isLoading) return <Loader />;

  return (
    <div className='flex flex-col gap-10  lg:gap-16 overflow-y-auto h-calc-vh paddingDashboard'>
      <form
        encType='multipart/form-data'
        onSubmit={handleSubmit(onHandleSubmit)}
        className='w-[90%] max-w-[450px] mx-auto  md:text-base text-textColor flex flex-col gap-5'
      >
        {/* blog title */}
        <FormGroupElement
          label='Blog Title'
          name='title'
          id='title'
          errorMsgTwo={settings?.serverValidation?.title}
          errorMsg={errors?.title?.message}
          placeholder='Enter blog title'
          register={{
            ...register('title', {
              required: 'Title is required!',
              validate: (value) =>
                (value.trim().length > 9 && value.trim().length < 50) ||
                `Title must be between 10 and 50 chars long!`,
            }),
          }}
        />

        {/* blog image */}
        <div className='font-semibold flex flex-col gap-2'>
          <p>Blog Image</p>
          {images?.length > 0 && (
            <img
              className='object-cover w-full max-h-[250px]'
              src={URL.createObjectURL(images[0])}
            />
          )}
          {blog?.data && images?.length < 1 && (
            <img
              src={getImageUrl(blog.data.image)}
              className='object-cover w-full max-h-[250px]'
            />
          )}
          <p className='text-red-700'>
            {errors?.image?.message || settings?.serverValidation?.image}
          </p>
          <input
            type='file'
            {...register('image', {
              ...(blog?.data ? {} : { required: 'Image is required!' }),
            })}
          />
        </div>

        {/* introduction */}
        <FormGroupElement
          label='Blog Introduction'
          name='introduction'
          id='introduction'
          isTextArea={true}
          rows={5}
          errorMsgTwo={settings?.serverValidation?.introduction}
          errorMsg={errors?.introduction?.message}
          placeholder='Write blog introduction'
          register={{
            ...register('introduction', {
              required: 'Introduction is required!',
              validate: (value) =>
                (value?.trim().length >= 30 && value?.trim().length <= 255) ||
                'Introduction must be between 30 and 255 characters long',
            }),
          }}
        />

        {/* body */}
        <FormGroupElement
          label='Blog Body'
          name='body'
          id='body'
          isTextArea={true}
          errorMsgTwo={settings?.serverValidation?.body}
          errorMsg={errors?.body?.message}
          placeholder='Write blog body'
          register={{
            ...register('body', {
              required: 'Body is required!',
              validate: (value) =>
                (value?.trim().length >= 30 && value?.trim().length <= 255) ||
                'Body must be between 30 and 255 characters long',
            }),
          }}
        />

        {/* conclusion */}
        <FormGroupElement
          label='Blog Conclusion'
          name='conclusion'
          id='conclusion'
          isTextArea={true}
          errorMsgTwo={settings?.serverValidation?.conclusion}
          errorMsg={errors?.conclusion?.message}
          placeholder='Write blog conclusion'
          register={{
            ...register('conclusion', {
              required: 'Conclusion is required!',
              validate: (value) =>
                (value?.trim().length >= 30 && value?.trim().length <= 255) ||
                'Conclusion must be between 30 and 255 characters long',
            }),
          }}
        />

        {/* tags */}
        <TagSelectBlogForm
          setSettings={setSettings}
          settings={settings}
          tags={tags}
        />

        {/* category */}
        <CategorySelectBlogForm
          setSettings={setSettings}
          settings={settings}
          categories={categories}
        />

        {/* submit button */}
        <button
          disabled={isCreatingOrUpdateing}
          className='outline-none border-none bg-blue-75 text-white font-semibold text-[18px] py-1 lg:text-[20px] rounded-md'
          type='submit'
        >
          {blog?.data ? 'Update Blog' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
