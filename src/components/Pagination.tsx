interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="mt-8 flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
          currentPage === 1
            ? 'bg-white/5 text-white/50 cursor-not-allowed'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        Previous
      </button>
      <span className="px-4 py-2 text-white">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
          currentPage === totalPages
            ? 'bg-white/5 text-white/50 cursor-not-allowed'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        Next
      </button>
    </div>
  );
}; 