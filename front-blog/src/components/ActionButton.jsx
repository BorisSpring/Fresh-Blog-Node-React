import React from 'react';

const styles = {
  danger: 'text-red-700 hover:bg-red-100',
  update: 'text-green-700 hover:bg-green-100',
  main: 'text-blue-75 hover:bg-blue-200',
  replay: 'text-yellow-700 hover:bg-yellow-100',
};

const ActionButton = ({ disabled = false, onClick, icon, style }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={` p-1 transition-all h-fit text-lg md:text-xl duration-200 rounded-md ${styles[style]}`}
    >
      {icon}
    </button>
  );
};

export default ActionButton;
