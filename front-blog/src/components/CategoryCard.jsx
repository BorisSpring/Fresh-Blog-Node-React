import React, { useState } from 'react';
import { formatDate } from 'date-fns';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoIosWarning } from 'react-icons/io';
import { IoIosCreate } from 'react-icons/io';

// components
import ActionButton from './ActionButton';
import Modal from './Modal';
import UpdateOrCreateCategoryAndTagsForm from './UpdateOrCreateCategoryAndTagsForm';

const CategoryCard = ({
  createdAt,
  name,
  id,
  deleteCategory,
  isPeformingAction,
  onHandleIsAddCategory,
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
    <div className='text-textColor text-base bg-white rounded-md shadow-sm p-3 md:p-5'>
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
        <ActionButton
          disabled={false}
          onClick={onHandleIsAddCategory}
          icon={<IoIosCreate />}
          style='main'
        />
      </div>

      {/* update category form */}
      {modalSettings?.action === 'update' && (
        <UpdateOrCreateCategoryAndTagsForm
          action={modalSettings.action}
          onClick={onHandleCloseModal}
          name={name}
          type='category'
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
          modalAction={() => deleteCategory(id)}
          actionText='Delete Category'
        />
      )}
    </div>
  );
};

export default CategoryCard;
