import React, { useState, useEffect } from 'react';
import { fetchVideos } from './YoutubeAPI';
import VideoList from './VideoList.jsx';
import { YTvideos } from './ytvideos.jsx';
import { FaSun, FaMoon, FaYoutube } from 'react-icons/fa';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('React tutorials');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const { items } = await fetchVideos(searchQuery);
        setVideos(items.slice(0, 4)); // Only take the first 4 videos
        if (items.length > 0 && !selectedVideo) {
          setSelectedVideo(items[0].id.videoId);
        }
      } catch (err) {
        setError(err.message || 'Failed to load videos');
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, [searchQuery]);

  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaYoutube className="text-red-600 text-3xl" />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              YouTube Clone
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-xl" />
            ) : (
              <FaMoon className="text-gray-600 text-xl" />
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto pt-24 px-4">
        {error && (
          <div className={`text-center p-4 mb-4 rounded-lg ${
            darkMode ? 'bg-red-900 text-white' : 'bg-red-100 text-red-700'
          }`}>
            {error}
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        )}
        
        <div className="animate-fadeIn">
          {selectedVideo && <YTvideos videoId={selectedVideo} darkMode={darkMode} />}
          <VideoList 
            videos={videos.filter(v => v.id.videoId !== selectedVideo)} 
            onVideoSelect={handleVideoSelect} 
            darkMode={darkMode} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;