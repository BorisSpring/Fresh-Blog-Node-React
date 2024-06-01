import React from 'react';

// utils
import { cn } from '../../utils/utils';

const Modal = ({
  closeModal,
  action,
  modalTitle,
  icon,
  modalAction,
  actionText,
  isPeformingAction,
}) => {
  return (
    <div
      className='fixed  top-0 left-0 h-full w-full flex items-center justify-center bg-black/30'
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='max-w-[400px] rounded-md shadow-md p-3 md:p-5  w-[80%] m-auto bg-white max-h-[80%] min-h-[150px] overflow-y-auto'
      >
        <div
          className={cn(` w-fit text-5xl mx-auto mb-3 md:mb-5 text-green-700`, {
            'text-red-700': action === 'delete',
          })}
        >
          {icon}
        </div>
        <h2
          className={cn(
            'font-sans font-semibold mb-4 md:mb-6 text-sm md:text-base leading-6  text-red-700',
            { 'text-green-700': action === 'update' }
          )}
        >
          {modalTitle}
        </h2>
        <div className='flex items-center gap-2  w-fit ml-auto'>
          <button
            className={cn(
              'outline-none transition-all duration-200 hover:shadow-md border  rounded-md px-2 py-1 border-gray-400 hover:border-white hover:bg-gray-100'
            )}
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            disabled={isPeformingAction}
            className={cn(
              'text-white min-w-[60px] bg-red-700 px-2 py-1 rounded-md hover:bg-red-800 transition-all duration-200 hover:shadow-md focus:ring-1 outline-none focus:ring-red-300',
              {
                'hover:bg-green-700 bg-green-600 focus:ring-green-200':
                  action === 'update',
              }
            )}
            onClick={() => {
              modalAction();
              closeModal();
            }}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
