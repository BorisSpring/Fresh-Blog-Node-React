import React from 'react';

// components
import Loader from './Loader';

// utils
import { getImageUrl } from '../../utils/utils';

// custom hooks
import { useGetLoggedUser } from '../hooks/users/useGetLoggedUser';
import { useChangePicture } from '../hooks/users/useChangePicutre';

const ChangePictureForm = () => {
  const { loggedUser, isLoadingUser } = useGetLoggedUser();
  const { changePicutre, isChangingPicture } = useChangePicture();

  if (isLoadingUser) return <Loader />;

  return (
    <form
      encType='multipart/form-data'
      className='w-[90%] max-w-[400px] bg-white  mx-auto rounded-md p-3 md:p-5 lg:p-8 shadow-md'
    >
      <h3 className=' text-center font-semibold  mb-3 md:mb-5 lg:mb-8 text-blue-75 text-lg md:text-xl'>
        Update Picture
      </h3>
      <div className='flex gap-2 items-center'>
        <div className='w-8 md:w-10 h-8 md:h-10 lg:w-16  lg:h-16 rounded-full overflow-hidden'>
          <img
            className='w-8 md:w-10 h-8 md:h-10  lg:w-16  lg:h-16 transition-all duration-500 rounded-full hover:scale-125'
            src={getImageUrl(loggedUser?.data?.photo, 'user')}
            alt='user avatar'
          />
        </div>
        <label
          htmlFor='photo'
          className='cursor-pointer text-textColor text-text-color text-sm md:text-base'
        >
          Chose new profile picture
        </label>
        <input
          disabled={isChangingPicture}
          onChange={(e) => changePicutre(e.target.files[0])}
          name='photo'
          id='photo'
          type='file'
          accept='image/**'
          className='w-[0.1px] h-[0.1px]'
        />
      </div>
    </form>
  );
};

export default ChangePictureForm;
