import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import { ChevronRightIcon, ShareIcon, HeartIcon, PlayIcon } from '@heroicons/react/24/solid';
import { IMAGE_BASE_URL, POSTER_SIZES } from '../config';

export const MovieDetails = () => {
  const { id } = useParams();
  const { selectedMovie, fetchMovieDetails, isLoading } = useMovieStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'trailer' | 'similar'>('overview');

  useEffect(() => {
    if (id) {
      fetchMovieDetails(Number(id));
    }
  }, [id, fetchMovieDetails]);

  if (isLoading || !selectedMovie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffbade]"></div>
      </div>
    );
  }

  const duration = Math.floor(selectedMovie.runtime / 60);
  const minutes = selectedMovie.runtime % 60;
  const trailer = selectedMovie.videos?.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      {/* Hero Section with Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[500px] z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#201f31] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#201f31] to-transparent" />
        <img
          src={`${IMAGE_BASE_URL}/${POSTER_SIZES.large}${selectedMovie.backdrop_path}`}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm mb-6">
          <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
          <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          <Link to="/movies" className="text-gray-400 hover:text-white">Movie</Link>
          <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          <span className="text-[#ffbade]">{selectedMovie.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Poster */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <img
                src={`${IMAGE_BASE_URL}/${POSTER_SIZES.large}${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                className="w-full rounded-lg shadow-lg"
              />
              
              {/* Social Actions */}
              <div className="flex justify-center gap-4 mt-4">
                <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors group">
                  <HeartIcon className="w-6 h-6 text-[#ffbade] group-hover:scale-110 transition-transform" />
                </button>
                <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors group">
                  <ShareIcon className="w-6 h-6 text-[#ffbade] group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-3/4">
            <h1 className="text-4xl font-bold text-white mb-4">
              {selectedMovie.title}
            </h1>

            {/* Movie Info Tags */}
            <div className="flex flex-wrap gap-4 mb-6">
              {selectedMovie.adult && (
                <span className="px-3 py-1 bg-[#ff4757] text-white text-sm font-bold rounded">
                  18+
                </span>
              )}
              <span className="px-3 py-1 bg-[#ffbade]/20 text-[#ffbade] text-sm rounded">
                HD
              </span>
              <span className="px-3 py-1 bg-[#ffbade]/20 text-[#ffbade] text-sm rounded">
                CC 1
              </span>
              <span className="px-3 py-1 bg-white/10 text-white text-sm rounded">
                Movie
              </span>
              <span className="px-3 py-1 bg-white/10 text-white text-sm rounded">
                {duration}h {minutes}m
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button className="flex items-center gap-2 px-8 py-3 bg-[#ffbade] text-[#201f31] font-semibold rounded-lg hover:bg-[#ffbade]/90 transition-colors">
                <PlayIcon className="w-5 h-5" />
                Watch now
              </button>
              <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">
                Add to List
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-white/10 mb-6">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 font-medium transition-colors relative ${
                    activeTab === 'overview' ? 'text-[#ffbade]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Overview
                  {activeTab === 'overview' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffbade]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('trailer')}
                  className={`pb-4 font-medium transition-colors relative ${
                    activeTab === 'trailer' ? 'text-[#ffbade]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Trailer
                  {activeTab === 'trailer' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffbade]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('similar')}
                  className={`pb-4 font-medium transition-colors relative ${
                    activeTab === 'similar' ? 'text-[#ffbade]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Similar Movies
                  {activeTab === 'similar' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffbade]" />
                  )}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">
                    {selectedMovie.overview}
                  </p>

                  {/* Genres */}
                  <div>
                    <h3 className="text-white font-semibold mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovie.genres.map(genre => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 bg-white/10 text-white text-sm rounded-full"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-white font-semibold mb-1">Release Date</h3>
                      <p className="text-gray-400">{new Date(selectedMovie.release_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Rating</h3>
                      <p className="text-gray-400">{selectedMovie.vote_average.toFixed(1)} / 10</p>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Duration</h3>
                      <p className="text-gray-400">{duration}h {minutes}m</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'trailer' && trailer && (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Movie Trailer"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}

              {activeTab === 'similar' && (
                <div className="text-gray-400">
                  Similar movies will be displayed here...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 