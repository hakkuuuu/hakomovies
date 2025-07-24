import { Genre } from '../../types';
import { GenreFilter } from '../GenreFilter';
import { Pagination } from '../Pagination';
import { Card } from '../movie/MovieCard';

interface MediaGridProps {
  title: string;
  items: any[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  selectedGenre?: Genre;
  genres: Genre[];
  onItemClick: (item: any) => void;
  onGenreChange: (genre: Genre | undefined) => void;
  onPageChange: (page: number) => void;
  onRetry?: () => void;
}

export const MediaGrid = ({
  title,
  items,
  loading,
  error,
  currentPage,
  totalPages,
  selectedGenre,
  genres,
  onItemClick,
  onGenreChange,
  onPageChange,
  onRetry = () => window.location.reload(),
}: MediaGridProps) => {
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-[#ffbade] text-[#201f31] rounded-lg hover:bg-[#ffbade]/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-[2000px] mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white">{title}</h1>
          
          {/* Genre Filter */}
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={onGenreChange}
          />

          {/* Media Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-[2/3] rounded-lg bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-white">No items found for this genre.</p>
              <button
                onClick={() => onGenreChange(undefined)}
                className="mt-4 px-6 py-2 bg-[#ffbade] text-[#201f31] rounded-lg hover:bg-[#ffbade]/90 transition-colors"
              >
                View All
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
                {items.map((item) => (
                  <Card key={item.id} movie={item} onClick={onItemClick} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 mb-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 