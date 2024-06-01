import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

const Loader = ({ height = 'h-[450px]' }) => {
  return (
    <div
      className={`grow -ml-10 ${height} md:ml-0 flex items-center justify-center`}
    >
      <PulseLoader color='#1565D8' size={10} />
    </div>
  );
};

export default Loader;
