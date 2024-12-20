import React from 'react';

export const YTvideos = ({ videoId, darkMode }) => {
  return (
    <div className="mb-8 animate-fadeIn">
      <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Featured Video
      </h1>
      <div className="relative w-full shadow-xl rounded-lg overflow-hidden" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default YTvideos;
