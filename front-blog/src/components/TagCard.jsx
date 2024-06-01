import React, { useState } from 'react';
import { formatDate } from 'date-fns';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoIosCreate, IoIosWarning } from 'react-icons/io';

// componennts
import Modal from './Modal';
import ActionButton from './ActionButton';

// custom hooks
import UpdateOrCreateCategoryForm from './UpdateOrCreateCategoryAndTagsForm';

const TagCard = ({
  name,
  createdAt,
  id,
  isPeformingAction,
  deleteTag,
  onHandleIsAddTag,
  isAddTag,
}) => {
  const [modalSettings, setModalSettings] = useState({
    isModalOpen: false,
    action: '',
  });

  const onHandleCloseModal = () =>
    setModalSettings(() => ({ isModalOpen: false, action: '' }));

  const onhandleOpenModal = (type) =>
    setModalSettings(() => ({ isModalOpen: true, action: type }));

  return (
    <div className='p-3 md:p-5 text-textColor bg-white rounded-md shadow-sm hover:border-2 border-2 border-white hover:border-gray-200 transition-all duration-200'>
      {/* category info */}
      <p>
        <span className='font-semibold'>Name: </span>
        {name}
      </p>
      <p>
        <span className='font-semibold'>CreatedAt: </span>
        {formatDate(createdAt, 'dd MMM , yyyy')}
      </p>
      {/* actions */}
      <div className='flex gap-1 items-center'>
        <ActionButton
          disabled={false}
          onClick={() => onhandleOpenModal('delete')}
          icon={<MdDelete />}
          style='danger'
        />
        <ActionButton
          disabled={false}
          onClick={() => onhandleOpenModal('update')}
          icon={<MdEdit />}
          style='update'
        />
        {!isAddTag && (
          <ActionButton
            disabled={false}
            onClick={onHandleIsAddTag}
            icon={<IoIosCreate />}
            style='main'
          />
        )}
      </div>

      {/* update category form */}
      {modalSettings?.action === 'update' && (
        <UpdateOrCreateCategoryForm
          type='tag'
          action={modalSettings.action}
          onClick={onHandleCloseModal}
          name={name}
          id={id}
        />
      )}

      {/* modal for confirming actions  */}
      {modalSettings?.action === 'delete' && (
        <Modal
          isPeformingAction={isPeformingAction}
          closeModal={onHandleCloseModal}
          action={modalSettings?.action}
          icon={<IoIosWarning />}
          modalTitle='Please confirm that you want to delete category?'
          modalAction={() => deleteTag(id)}
          actionText='Delete Category'
        />
      )}
    </div>
  );
};

export default TagCard;
