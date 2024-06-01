import React, { useState } from 'react';
import { format } from 'date-fns';
import { IoIosWarning } from 'react-icons/io';
import { MdModeEdit, MdReply, MdDelete, MdMarkAsUnread } from 'react-icons/md';

// components
import Modal from './Modal';
import ActionButton from './ActionButton';

// utils
import { cn, formatDistanceUtils } from '../../utils/utils';

const Message = ({
  from,
  subject,
  message,
  createdAt,
  isRead,
  deleteMessage,
  isActionPeforming,
  updateMessageStatus,
  id,
}) => {
  const [modalSettings, setModalSettings] = useState({
    isOpen: false,
    action: '',
  });

  const onHandleCloseModal = () => {
    setModalSettings(() => ({ isOpen: false, action: '' }));
  };

  const onHandleOpenModal = (type) =>
    setModalSettings(() => ({ isOpen: true, action: type }));

  return (
    <div
      className={cn(
        'p-2 rounded-md bg-white shadow-sm flex flex-col gap-3 text-[14px] md:text-[16px] text-textColor',
        {
          grayscale: isActionPeforming,
        }
      )}
    >
      <div className='flex flex-col md:items-start text-xs md:text-sm font-medium gap-1 md:flex-row md:justify-between md:gap-3'>
        <p>From: {from}</p>
        {/* messages dates */}
        <div className='flex gap-2 items-center md:items-start'>
          <div>
            <p>{formatDistanceUtils(createdAt)}</p>
            <p className='text-[9px]'>
              {format(createdAt, 'MMMM do, yyyy hh:mm aa')}
            </p>
          </div>
          {/* message status */}
          <p
            className={` font-bold w-fit  rounded-md px-2 py-[2px] ${
              isRead
                ? 'bg-emerald-200 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {isRead ? 'Read' : 'Not Readed'}
          </p>
        </div>
        {/* message options to peform */}
        <div className='flex gap-2 items-center'>
          <ActionButton
            disabled={isActionPeforming}
            onClick={() => onHandleOpenModal('delete')}
            icon={<MdDelete />}
            style='danger'
          />
          <ActionButton
            disabled={isActionPeforming}
            onClick={() => onHandleOpenModal('update')}
            icon={<MdModeEdit />}
            style='update'
          />
          <ActionButton
            disabled={isActionPeforming}
            onClick={() => onHandleOpenModal('replay')}
            icon={<MdReply />}
            style='main'
          />
        </div>
      </div>
      {/* subject and message */}
      <div>
        <p>
          <span className='font-bold'>Subject:</span> {subject}
        </p>
        <p>
          <span className='font-bold'>Message:</span> {message}
        </p>
      </div>
      {/* modal for confirming actions  */}
      {modalSettings.isOpen && (
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
              ? 'Please confirm that you want to delete message?'
              : `Please confirm that  you want to  mark message as ${
                  isRead ? 'unread' : 'readed'
                }?`
          }
          modalAction={() =>
            modalSettings.action === 'delete'
              ? deleteMessage(id)
              : updateMessageStatus({ msgId: id, isRead: !isRead })
          }
          actionText={
            modalSettings.action === 'delete'
              ? 'Delete Message'
              : isRead
              ? 'Unread Message'
              : 'Mark As Read'
          }
        />
      )}
    </div>
  );
};

export default Message;
