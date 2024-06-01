import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { formatDate } from 'date-fns';

// components
import ActionButton from './ActionButton';
import UpdateCommentForm from './UpdateCommentForm';
import Modal from './Modal';

// utils
import { formatDistanceUtils, getImageUrl } from '../../utils/utils';

const Comment = ({
  createdAt,
  comment,
  user,
  loggedUser,
  deleteComment,
  isDeletingComment,
  id,
}) => {
  const [modalSettings, setModalSettings] = useState({
    isModalOpen: false,
    action: '',
  });

  const onHandleCloseModal = () =>
    setModalSettings(() => ({ isModalOpen: false, action: '' }));

  const onHandlePeformAction = (type) =>
    setModalSettings(() => ({ isModalOpen: true, action: type }));

  return (
    <>
      <div className='grid grid-cols-[auto,1fr] gap-3 font-roboto bg-[#F2F4F5] p-3 text-textColor'>
        <img
          src={getImageUrl(user?.photo, 'user')}
          alt='user avatar'
          className='w-8 h-8 rounded-full md:w-10 md:h-10'
        />
        <div className='flex flex-col gap-2'>
          <div className='text-[10px]'>
            <p className=' md:text-[14px] text-[#283646] font-bold'>
              {user?.name}
            </p>
            <p>{formatDate(createdAt, 'dd MMM, yyy')}</p>
            <p>{formatDistanceUtils(createdAt)}</p>
          </div>
          <div className='flex flex-col  gap-2'>
            <p className='md:text-[15px] text-[12px] '>{comment}</p>
            <div className='flex gap-2'>
              <ActionButton />
              {loggedUser?.data?.id === user?.id && (
                <>
                  <button
                    onClick={() => onHandlePeformAction('edit')}
                    className='flex hover:bg-blue-0 px-2 py-1 rounded-md items-center text-blue-75 md:text-base gap-1 text-[12px]'
                  >
                    <MdEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => onHandlePeformAction('delete')}
                    className='flex text-red-700 hover:bg-red-100 px-2 py-1 rounded-md items-center gap-1 md:text-base text-[12px]'
                  >
                    <MdDelete />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {modalSettings?.action === 'delete' && (
          <Modal
            closeModal={onHandleCloseModal}
            actino='delete'
            modalTitle='Please confirm that you want to delete comment!'
            icon={<MdDelete />}
            modalAction={() => deleteComment(id)}
            actionText='Delete Comment'
            isPeformingAction={isDeletingComment}
          />
        )}
      </div>
      {modalSettings?.action === 'edit' && (
        <UpdateCommentForm
          onClick={onHandleCloseModal}
          id={id}
          comment={comment}
        />
      )}
    </>
  );
};

export default Comment;
