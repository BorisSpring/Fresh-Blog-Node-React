import React, { useState } from 'react';
import { format } from 'date-fns';
import { MdCheck, MdClose, MdDelete } from 'react-icons/md';
import { FaBan, FaUserEdit } from 'react-icons/fa';
import { IoIosWarning } from 'react-icons/io';

// components
import Modal from './Modal';
import ActionButton from './ActionButton';

// utils
import { cn, formatDistanceUtils, getImageUrl } from '../../utils/utils';

const UserCard = ({
  name,
  createdAt,
  email,
  photo,
  isActive,
  isBanned,
  role,
  isVerified,
  id,
  isPeformingAction,
  banOrUnban,
  deleteUser,
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
      <div className='p-3 bg-white shadow-sm rounded-md text-textColor text-xs md:text-sm flex flex-col gap-3'>
        {/* user info (image, when is created and how long ago it was created) */}
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden'>
            <img
              src={getImageUrl(photo, 'user')}
              alt='user avatar'
              className='w-8 h-8 rounded-full md:w-10 md:h-10 hover:scale-125 transition-all duration-500'
            />
          </div>
          <div className='flex flex-col'>
            <p>
              <span className='font-semibold'>Joined: </span>{' '}
              {format(createdAt, 'dd MMM, yyyy')}
            </p>
            <p>({formatDistanceUtils(createdAt)})</p>
          </div>
        </div>
        <div className='flex flex-col'>
          {/* user name */}
          <p>
            <span className='font-semibold'>Name: </span> {name}
          </p>
          {/* user email */}
          <p>
            <span className='font-semibold'>Email: </span> {email}
          </p>

          {/* user role */}
          <p>
            <span className='font-semibold'>Role: </span> {role}
          </p>

          {/* account activated status */}
          <div className='flex items-center gap-1 mt-1'>
            <p className='font-semibold'>Is Acc. Active: </p>{' '}
            <div
              className={cn(
                'text-green-700 flex bg-green-100 px-2 rounded-md items-center gap-1',
                {
                  'text-red-700 bg-red-100': !isActive,
                }
              )}
            >
              {isActive ? 'Activated' : 'Deactivated'}
              {isActive ? <MdCheck /> : <MdClose />}
            </div>
          </div>

          {/* is banned status */}
          <div className='flex items-center gap-1 mt-1'>
            <p className='font-semibold'>Is Acc. Banned: </p>{' '}
            <div
              className={cn(
                'text-green-700 flex bg-green-100 px-2 rounded-md items-center gap-1',
                {
                  'text-red-700 bg-red-100': isBanned,
                }
              )}
            >
              {isBanned ? 'Banned' : 'Not Banned'}
              {isBanned ? <FaBan /> : <MdCheck />}
            </div>
          </div>

          {/* is verified status */}
          <div className='flex items-center gap-1 mt-1'>
            <p className='font-semibold'>Is Acc. Verified: </p>{' '}
            <div
              className={cn(
                'text-blue-700 flex bg-blue-100 px-2 rounded-md items-center gap-1',
                {
                  'text-yellow-700 bg-yellow-100': !isVerified,
                }
              )}
            >
              {isVerified ? 'Verified' : 'Not Verified'}
              {isVerified ? <FaBan /> : <MdCheck />}
            </div>
          </div>
        </div>
        {/* users actions */}
        <div className='flex gap-1'>
          {/* delete action */}
          <ActionButton
            disabled={isPeformingAction}
            onClick={() => onHandlePeformAction('delete')}
            icon={<MdDelete />}
            style='danger'
          />
          {/* ban unban account action */}
          <ActionButton
            disabled={isPeformingAction}
            onClick={() => onHandlePeformAction('update')}
            icon={<FaUserEdit />}
            style='update'
          />
        </div>
      </div>

      {/* user modal */}
      {modalSettings.isModalOpen && (
        <Modal
          closeModal={onHandleCloseModal}
          action={modalSettings?.action}
          icon={
            modalSettings.action === 'delete' ? (
              <IoIosWarning />
            ) : (
              <FaUserEdit />
            )
          }
          modalTitle={`Please confirm that u want to ${
            modalSettings.action === 'delete'
              ? `delete ${name}!`
              : `${isBanned ? 'unban!' : 'ban!'}`
          }`}
          modalAction={() =>
            modalSettings.action === 'update'
              ? banOrUnban({ userId: id, isBanned: !isBanned })
              : deleteUser(id)
          }
          isPeformingAction={isPeformingAction}
          actionText={
            modalSettings.action === 'delete'
              ? 'Delete'
              : isBanned
              ? 'Ban'
              : 'Unban'
          }
        />
      )}
    </>
  );
};

export default UserCard;
