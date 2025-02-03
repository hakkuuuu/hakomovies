/* eslint-disable react/prop-types */

const Card = ({ movie }) => {
  // Destructure only the necessary properties from the movie object
  const { title, poster_path, release_date, vote_average } = movie;
  // Construct the full poster image URL (or use a fallback image)
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="relative group w-64 my-6 rounded-lg overflow-hidden shadow-lg bg-gray-800">
      {/* Movie Poster */}
      <img
        src={posterUrl}
        alt={title}
        className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-300">Released: {release_date}</p>
        <p className="text-sm text-yellow-400 mt-1">
          Rating: {vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default Card;
