import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatDate } from 'date-fns';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { IoIosWarning } from 'react-icons/io';
import { RxUpdate } from 'react-icons/rx';

// components
import UserInfoCard from './UserInfoCard';
import ActionButton from './ActionButton';
import Modal from './Modal';

// utils
import { cn, getImageUrl } from '../../utils/utils';

const DashboardBlogCard = ({
  title,
  introduction,
  user: { photo, name, email },
  image,
  createdAt,
  enabled,
  id,
  isPeformingAction,
  deleteBlog,
  enableDisable,
  slug,
}) => {
  const navigate = useNavigate();
  const [modalSettings, setModalSettings] = useState({
    isModalOpen: false,
    action: '',
  });

  const onHandleCloseModal = () =>
    setModalSettings(() => ({ isModalOpen: false, action: '' }));

  const onHandlePeformAction = (type) =>
    setModalSettings(() => ({ isModalOpen: true, action: type }));

  const onHandleNavigateToBlog = () => {
    navigate(`/blog/${slug}`);
  };

  const onHandleUpdateBlog = () => {
    navigate(`/dashboard/addBlog/${slug}`);
  };

  return (
    <div className='text-textColor md:text-base text-sm  flex flex-col rounded-md border-2 border-blue-75'>
      <img
        src={getImageUrl(image)}
        alt='blog image'
        className='h-[100px] md:max-h-[150px] w-full object-cover object-center'
      />
      <div className='flex flex-col p-3 md:p-5 md:flex-row justify-between'>
        {/* blog details */}
        <div className=' flex flex-col gap-1'>
          {/* blog details */}
          <p>
            <span className='text-blue-75 font-semibold'>Title: </span>
            {title}
          </p>
          <p>
            <span className='text-blue-75 font-semibold'>Introduction: </span>
            {introduction}
          </p>
          <p>
            <span className='text-blue-75 font-semibold'>Status: </span>
            <span
              className={cn(
                'text-green-700 px-2 py-[2px] rounded-md bg-green-100',
                {
                  'text-red-700 bg-red-100': !enabled,
                }
              )}
            >
              {enabled ? 'Enabled' : 'Disabled'}
            </span>
          </p>
          <p>
            <span className='text-blue-75 font-semibold'>Posted: </span>
            {formatDate(createdAt, 'dd MMM, yyyy')}
          </p>
          {/* informations abotu user who post the blog */}
          <UserInfoCard
            name={name}
            email={email}
            createdAt={createdAt}
            photo={photo}
            isJustify={false}
          />
        </div>
        {/* actions to peform on blog */}
        <div className='flex gap-1 md:gap-2'>
          <ActionButton
            disabled={isPeformingAction}
            style='danger'
            icon={<MdDelete />}
            onClick={() => onHandlePeformAction('delete')}
          />
          <ActionButton
            disabled={isPeformingAction}
            style='update'
            icon={<MdEdit />}
            onClick={() => onHandlePeformAction('update')}
          />
          <ActionButton
            disabled={false}
            style='main'
            icon={<FaEye />}
            onClick={onHandleNavigateToBlog}
          />
          <ActionButton
            disabled={false}
            style='replay'
            icon={<RxUpdate />}
            onClick={onHandleUpdateBlog}
          />
        </div>
      </div>
      {/* modal  */}
      {modalSettings.isModalOpen && (
        <Modal
          closeModal={onHandleCloseModal}
          action={modalSettings.action}
          icon={
            modalSettings.action === 'delete' ? <MdDelete /> : <IoIosWarning />
          }
          modalTitle={
            modalSettings.action === 'delete'
              ? `Please confirm that you want to delete blog ${name}?`
              : `Please confirm that  you want to  mark blog as ${
                  enabled ? 'disabled' : 'enabled'
                }?`
          }
          modalAction={() =>
            modalSettings.action === 'delete'
              ? deleteBlog(id)
              : enableDisable({ id, enabled: !enabled })
          }
          isPeformingAction={isPeformingAction}
          actionText={
            modalSettings.action === 'delete'
              ? 'Delete Blog'
              : enabled
              ? 'Disable Blog'
              : 'Enable Blog'
          }
        />
      )}
    </div>
  );
};

export default DashboardBlogCard;
