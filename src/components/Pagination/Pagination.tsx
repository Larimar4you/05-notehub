import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

import css from "./Pagination.module.css";

type ReactPaginateModuleType = {
  default?: ComponentType<ReactPaginateProps>;
};

const ReactPaginate = ((
  ReactPaginateModule as unknown as ReactPaginateModuleType
).default ?? ReactPaginateModule) as ComponentType<ReactPaginateProps>;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = ({ selected }: { selected: number }): void => {
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.button}
      nextClassName={css.button}
      previousLabel="Prev"
      nextLabel="Next"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
    />
  );
}
