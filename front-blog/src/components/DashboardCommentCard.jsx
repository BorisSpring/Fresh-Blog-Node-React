import React, { useState } from 'react';
import { MdModeEdit, MdDelete, MdMarkAsUnread } from 'react-icons/md';
import { FaComment } from 'react-icons/fa';
import { IoIosWarning } from 'react-icons/io';

// components
import ActionButton from './ActionButton';
import Modal from './Modal';
import UpdateCommentForm from './UpdateCommentForm';
import UserInfoCard from './UserInfoCard';

// dodati posle button da vidi blgo gde je postavljen komentar!

const DashboardCommentCard = ({
  createdAt,
  comment,
  updatedAt,
  enabled,
  user: { email, photo, name, id: userId },
  blog,
  id,
  loggedUser,
  isPeformingAction,
  deleteComment,
}) => {
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [modalSettings, setModalSettings] = useState({
    isModalOpen: false,
    action: '',
  });

  const onHandleCloseModal = () =>
    setModalSettings(() => ({ isModalOpen: false, action: '' }));

  const onHandlePeformAction = (type) =>
    setModalSettings(() => ({ isModalOpen: true, action: type }));

  return (
    <div className='text-textColor h-fit transition-all duration-500 text-xs md:text-base flex justify-between items-center bg-white shadow-sm p-2 rounded-md lg:px-10 lg:py-3 text-[14px] md:text-[16px]'>
      <div className='flex flex-col gap-2  w-full'>
        <div className='flex justify-between'>
          {/* user informations and picture */}
          <UserInfoCard
            name={name}
            email={email}
            createdAt={createdAt}
            photo={photo}
            updatedAt={updatedAt}
          />

          {/* comment status and actions */}
          <div className='flex flex-col gap-1'>
            <p
              className={`font-semibold px-2 w-full flex items-center justify-center rounded-md ${
                enabled
                  ? 'text-green-700 bg-green-100'
                  : 'text-red-700 bg-red-100'
              }`}
            >
              {enabled ? 'Enabled' : 'Disabled'}{' '}
            </p>
            {/* comment actions */}
            <div className='flex gap-2 items-center'>
              {/* update status */}
              <ActionButton
                disabled={false}
                onClick={() => onHandlePeformAction('update')}
                icon={<MdModeEdit />}
                style='update'
              />
              {/* update comment text */}
              {loggedUser?.id === userId && (
                <ActionButton
                  disabled={false}
                  onClick={() => setIsUpdateComment((prev) => !prev)}
                  icon={<FaComment />}
                  style='main'
                />
              )}
              {/* delete comment */}
              <ActionButton
                disabled={false}
                onClick={() => onHandlePeformAction('delete')}
                icon={<MdDelete />}
                style='danger'
              />
            </div>
          </div>
        </div>
        {/* display comment text */}
        {!isUpdateComment ? (
          <p>{comment}</p>
        ) : (
          <UpdateCommentForm
            comment={comment}
            id={id}
            onClick={() => setIsUpdateComment((prev) => !prev)}
          />
        )}
      </div>

      {/* modal for delete and update status */}
      {modalSettings.isModalOpen && modalSettings.action !== 'change' && (
        <Modal
          closeModal={onHandleCloseModal}
          action={modalSettings.action}
          icon={
            modalSettings.action === 'delete' ? (
              <IoIosWarning />
            ) : (
              <MdMarkAsUnread />
            )
          }
          modalTitle={
            modalSettings.action === 'delete'
              ? 'Please confirm that you want to delete comment?'
              : `Please confirm that  you want to  mark comment as ${
                  enabled ? 'disabled' : 'enabled'
                }?`
          }
          isPeformingAction={isPeformingAction}
          modalAction={() =>
            modalSettings.action === 'delete' ? deleteComment(id) : ''
          }
          actionText={
            modalSettings.action === 'delete'
              ? 'Delete Comment'
              : enabled
              ? 'Disable Comment'
              : 'Enable Comment'
          }
        />
      )}
    </div>
  );
};

export default DashboardCommentCard;
