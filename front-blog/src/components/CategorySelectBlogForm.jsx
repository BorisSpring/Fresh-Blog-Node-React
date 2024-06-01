import React from 'react';

const CategorySelectBlogForm = ({ settings, categories, setSettings }) => {
  const onHandleSelectCategory = (e) => {
    setSettings((prev) => ({
      ...prev,
      category: categories?.data?.find(
        (category) => category.id === e.target.value
      ),
    }));
  };
  return (
    <div className='flex flex-col gap-1'>
      <p className='font-semibold'>Category</p>
      <div className='flex gap-2 flex-wrap my-1'>
        <p>
          Selected category:{' '}
          <span className='text-blue-75 font-semibold'>
            {' '}
            {settings?.category?.name}
          </span>
        </p>
      </div>
      <select
        onChange={onHandleSelectCategory}
        className='w-full border p-1 rounded-md focus:border-blue-75'
      >
        {categories?.data?.map(({ id, name }) => (
          <option
            className='font-medium hover:text-blue-75'
            key={id}
            value={id}
          >
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelectBlogForm;
