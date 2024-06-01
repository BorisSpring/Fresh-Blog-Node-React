import React from 'react';
import { MdClose } from 'react-icons/md';

const TagSelectBlogForm = ({ settings, setSettings, tags }) => {
  const onHandleSelectTag = (e) => {
    if (!settings?.tags?.some((tag) => tag.id === e.target.value)) {
      const selectedTag = tags?.data.find((tag) => tag.id === e.target.value);
      setSettings((prev) => ({ ...prev, tags: [...prev.tags, selectedTag] }));
    }
  };

  const onHandleUnselectTag = (selectedTag) => {
    setSettings((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag.id !== selectedTag.id),
    }));
  };
  return (
    <div className='flex flex-col gap-1'>
      <p className='font-semibold'>Tags</p>
      <div className='flex gap-2 flex-wrap my-1'>
        <p>Selected tags:</p>
        {settings?.tags?.map?.((tag) => (
          <span
            className='px-1  flex gap-1 items-center rounded-md bg-blue-75 font-medium text-white'
            key={tag.name}
          >
            {tag.name}{' '}
            <MdClose
              className='text-lg cursor-pointer'
              onClick={() => onHandleUnselectTag(tag)}
            />
          </span>
        ))}
      </div>
      <select
        onChange={onHandleSelectTag}
        className='w-full border p-1 rounded-md focus:border-blue-75'
      >
        {tags?.data?.map((tag) => (
          <option
            className='font-medium hover:text-blue-75'
            key={tag?.id}
            value={tag?.id}
          >
            {tag.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagSelectBlogForm;
