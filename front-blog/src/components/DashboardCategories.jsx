import React, { useState } from 'react';

// components
import Loader from './Loader';
import CategoryCard from './CategoryCard';

// custom hooks
import { useFindAllCategories } from '../hooks/categories/useFindAllCategories';
import { useDeleteCategory } from '../hooks/categories/useDeleteCategory';
import UpdateOrCreateCategoryAndTagsForm from './UpdateOrCreateCategoryAndTagsForm';

const DashboardCategories = () => {
  const [isAddCategory, setIsAddCategory] = useState(false);
  const { categories, isLoadingCategories } = useFindAllCategories();
  const { deleteCategory, isDeleting } = useDeleteCategory();

  if (isLoadingCategories) return <Loader />;

  const onHandleIsAddCategory = () => setIsAddCategory((prev) => !prev);

  return (
    <div className='flex flex-col gap-3  md:gap-5 overflow-y-auto h-calc-vh paddingDashboard'>
      {isAddCategory ? (
        <UpdateOrCreateCategoryAndTagsForm
          type='category'
          action='create'
          onClick={onHandleIsAddCategory}
        />
      ) : (
        <button
          className='outline-none bg-blue-75 text-white p-1 rounded-md hover:shadow-sm hover:shadow-blue-50'
          onClick={onHandleIsAddCategory}
        >
          Add Category
        </button>
      )}
      {categories?.data?.map((category) => (
        <CategoryCard
          onHandleIsAddCategory={onHandleIsAddCategory}
          key={category.name}
          {...category}
          deleteCategory={deleteCategory}
          isPeformingAction={isDeleting}
        />
      ))}
    </div>
  );
};

export default DashboardCategories;
