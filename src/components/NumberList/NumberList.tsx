import Style from "./NumberList.module.css";

interface Props {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const NumberList = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: Props) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={Style.pagination}>
      <button
        onClick={goPrev}
        className={Style.arrow}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`${Style.page} ${
            page === currentPage ? Style.active : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={goNext}
        className={Style.arrow}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default NumberList;
