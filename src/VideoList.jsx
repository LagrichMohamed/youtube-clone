import React from 'react';

const VideoList = ({ videos, onVideoSelect, darkMode }) => {
  if (!videos) {
    return (
      <div className={`text-center p-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Loading videos...
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={`text-center p-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        No videos found. Try a different search term.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <div
          key={video.id.videoId}
          className={`${
            darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
          } rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          onClick={() => onVideoSelect(video.id.videoId)}
        >
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <img 
              src={video.snippet.thumbnails.high.url} 
              alt={video.snippet.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white px-2 py-1 text-sm">
              Click to Play
            </div>
          </div>
          <div className="p-4">
            <h3 className={`font-bold text-lg mb-2 truncate ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {video.snippet.title}
            </h3>
            <p className={`text-sm overflow-hidden line-clamp-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {video.snippet.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
