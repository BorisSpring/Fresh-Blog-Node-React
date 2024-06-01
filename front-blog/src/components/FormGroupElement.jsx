import React from 'react';
import { cn } from '../../utils/utils';

const FormGroupElement = ({
  label,
  type = 'text',
  name,
  id,
  required = false,
  placeholder,
  register,
  errorMsg,
  errorMsgTwo,
  stylesInput = {},
  stylesLabel = {},
  isTextArea = false,
  rows = 3,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={name} className={`font-semibold ${stylesLabel}`}>
        {label}
      </label>
      {!isTextArea ? (
        <input
          required={required}
          {...register}
          type={type}
          name={name}
          id={id}
          className={cn(
            `placeholder:text-textColor text-sm md:text-base placeholder:text-xs px-3 py-1 outline-none border-2 border-gray-200 rounded-md ${stylesInput}`,
            { 'border-red-700 focus:border-red-700': errorMsg || errorMsgTwo }
          )}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          required={required}
          name={name}
          rows={rows}
          id={id}
          placeholder={placeholder}
          {...register}
          className={cn(
            `placeholder:text-textColor p-3 md:p-5 text-sm md:text-base placeholder:text-xs px-3 py-1 outline-none border-2 border-gray-200 rounded-md ${stylesInput}`,
            { 'border-red-700 focus:border-red-700': errorMsg || errorMsgTwo }
          )}
        />
      )}
      <p className='text-red-700'>{errorMsg || errorMsgTwo}</p>
    </div>
  );
};

export default FormGroupElement;
