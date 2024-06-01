import React from 'react';
import { Link } from 'react-router-dom';

// compoonents
import Loader from './Loader';

// custom hooks
import { useFindAllCategories } from '../hooks/categories/useFindAllCategories';

const Categories = () => {
  const { categories, isLoadingCategories } = useFindAllCategories();

  if (isLoadingCategories) return <Loader height='h-[150px]' />;

  return (
    <div className='font-roboto'>
      <h5 className='text-16 md:text-[20px] font-medium mb-3'>Categories</h5>
      <div className='flex gap-3 flex-wrap'>
        {categories?.data.map(({ name, id }) => (
          <Link
            to={`/?category=${name}`}
            key={id}
            className='text-[10px] px-3 py-1 md:py-1 rounded-md capitalize  hover:bg-blue-85 hover:shadow-md transition-all duration-300 bg-blue-75 md:text-[14px] text-white'
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
