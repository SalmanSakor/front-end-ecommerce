import ReactPaginate from "react-paginate";

const PaginatedItems = (props) => {
  let pageCount = props.total / props.itemsPerPage;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >>"
        previousLabel="<< "
        pageCount={pageCount}
        pageRangeDisplayed={1}
        renderOnZeroPageCount={null}
        onPageChange={(e) => props.setPage(e.selected + 1)}
        containerClassName="paginate-container"
        activeLinkClassName="paginate-active-link"
        pageLinkClassName="paginate-page-link"
      />
    </>
  );
};

export default PaginatedItems;
