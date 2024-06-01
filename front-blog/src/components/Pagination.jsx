import React from 'react';
import { useNavigate } from 'react-router';
import ReactPaginate from 'react-paginate';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// custom hooks
import { useGetParams } from '../../../front-tours/src/hooks/universal/useGetParams';

const Pagination = ({ totalPages }) => {
  const params = useGetParams();
  const navigate = useNavigate();

  const handlePageChange = (e) => {
    params.set('page', e.selected + 1);
    navigate(`?${params.toString()}`);
  };

  if (!totalPages || totalPages < 2) return null;

  return (
    <ReactPaginate
      className='flex w-fit mx-auto items-center gap-2 text-blue-75 font-semibold'
      breakLabel='...'
      nextLabel={<MdChevronRight />}
      previousLabel={<MdChevronLeft />}
      onPageChange={handlePageChange}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
      initialPage={Number(params?.get('page') - 1) || 0}
    />
  );
};

export default Pagination;
