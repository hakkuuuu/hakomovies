import { Genre } from '../types';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre?: Genre;
  onGenreChange: (genre?: Genre) => void;
}

export const GenreFilter = ({ genres, selectedGenre, onGenreChange }: GenreFilterProps) => {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        onClick={() => onGenreChange(undefined)}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
          !selectedGenre
            ? 'bg-[#ffbade] text-[#201f31]'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id || genre.name}
          onClick={() => onGenreChange(genre)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedGenre?.id === genre.id
              ? 'bg-[#ffbade] text-[#201f31]'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}; 