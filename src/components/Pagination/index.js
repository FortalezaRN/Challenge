import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination as TransformInArrayPages } from '../../utils';
import { setCurrentPage } from '../../ducks/numbers';

const PaginationComp = () => {
  const dispatch = useDispatch();

  const {
    pages,
    currentPage,
  } = useSelector(state => state.numbers);

  const formPagination = TransformInArrayPages((currentPage+1), pages.length)

  function changePage(i){
    if(i > pages.length || i === 0)
      return;
    dispatch(setCurrentPage((i-1)));
  }

  return(
    <Pagination className="justify-content-center">
      <Pagination.Prev onClick={() => changePage(currentPage)}/>
      {
        formPagination.map((el, i) => {
          const isSelected = ((el-1) === currentPage);
          return (el === '...')
            ? <Pagination.Ellipsis key={i} />
            : <Pagination.Item onClick={() => changePage(el)} key={i} active={isSelected}>{el}</Pagination.Item>
        })
      }
      <Pagination.Next onClick={() => changePage(currentPage+2)}/>
    </Pagination>
  )
}

export default PaginationComp;