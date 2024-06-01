import React, { useState } from 'react';

// components
import Loader from './Loader';
import TagCard from './TagCard';

// custom hooks
import { useFindAllTags } from '../hooks/tags/useFindAllTags';
import { useDeleteTag } from '../hooks/tags/useDeleteTag';
import UpdateOrCreateCategoryAndTagsForm from './UpdateOrCreateCategoryAndTagsForm';

const DashboardTags = () => {
  const [isAddTag, setIsAddTag] = useState(false);
  const { tags, isLoadingTags } = useFindAllTags();
  const { deleteTag, isDeleting } = useDeleteTag();

  const onHandleIsAddTag = () => setIsAddTag((prev) => !prev);

  if (isLoadingTags) return <Loader />;

  return (
    <div className='flex flex-col gap-3  md:gap-5 overflow-y-auto h-calc-vh paddingDashboard'>
      {isAddTag ? (
        <UpdateOrCreateCategoryAndTagsForm
          type='tag'
          action='create'
          onClick={onHandleIsAddTag}
        />
      ) : (
        <button
          className='outline-none bg-blue-75 md:text-lg font-semibold lg:text-xl text-white p-1 rounded-md hover:shadow-sm hover:shadow-blue-50'
          onClick={onHandleIsAddTag}
        >
          Add Tag
        </button>
      )}
      {tags?.data?.map((tag) => (
        <TagCard
          isAddTag={isAddTag}
          onHandleIsAddTag={onHandleIsAddTag}
          key={tag.name}
          {...tag}
          isPeformingAction={isDeleting}
          deleteTag={deleteTag}
        />
      ))}
    </div>
  );
};

export default DashboardTags;
