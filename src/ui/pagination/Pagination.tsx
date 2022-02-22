import React, {FC} from 'react';
import classes from "./Pagination.module.css";
import {getPagesArray} from "../../utils/page";

interface IPagination {
  totalPages: number
  page: number
  setPage: (page: number) => void 
}

const Pagination: FC<IPagination> = ({totalPages, page, setPage}) => {
  const pages = getPagesArray(totalPages)
  
  return (
    <div className={classes.pagination}>
      {
        pages.map(p =>
          <label
            key={p}
            className={`${classes.paginationBtn} body-1 ${p === page ? classes.paginationBtnChecked : ''}`}
          >
            <input
              name='pagination'
              type='radio'
              className='hidden-visually'
              onChange={() => setPage(p)}
              value={p}
            />

            <span>
              {p}
            </span>
          </label>
        )
      }
    </div>
  );
};

export default Pagination;