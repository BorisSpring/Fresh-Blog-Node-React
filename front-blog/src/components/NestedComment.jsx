import React from 'react';

const NestedComment = ({
  name = '  Mohammad Rezaii',
  createdAt = '15 Decembar 2020, 11:40 AM',
  comment = 'lore,m nested bla bla bal',
  img = 'img/user-1.png',
}) => {
  return (
    <div className='grid col-span-2 grid-cols-[auto,1fr] gap-3 font-roboto bg-[#F2F4F5] px-10 text-textColor'>
      <img
        src={img}
        alt='user avatar'
        className='w-8 h-8 rounded-full md:w-10 md:h-10'
      />
      <div className='flex flex-col gap-4'>
        <div className='text-[10px]'>
          <p className=' md:text-[14px] text-[#283646] font-bold'>{name}</p>
          <p>{createdAt}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='md:text-[15px] text-[12px] '>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default NestedComment;
