import React from 'react';
import { format } from 'date-fns';

// utils
import { cn, formatDistanceUtils, getImageUrl } from '../../utils/utils';

const UserInfoCard = ({
  photo,
  name,
  email,
  createdAt,
  updatedAt = null,
  isJustify = true,
  styles,
}) => {
  return (
    <div
      className={cn(`flex gap-3 items-center ${styles}`, {
        ' justify-between': isJustify,
      })}
    >
      <img
        src={getImageUrl(photo, 'user')}
        alt='user avatar'
        className='md:w-[50px] w-8 h-8 md:h-[50px] object-contain rounded-full object-center'
      />
      <div className='flex flex-col '>
        <p>{name}</p>
        <p>{email}</p>
        <p className='text-[10px] md:text-[11px] lg:text-[12px]'>
          {' '}
          {format(createdAt, 'MMMM do, yyyy hh:mm aa')}
        </p>
        <p>Posted: {formatDistanceUtils(createdAt)}</p>
        {updatedAt && <p>Updated : {formatDistanceUtils(updatedAt)}</p>}
      </div>
    </div>
  );
};

export default UserInfoCard;
