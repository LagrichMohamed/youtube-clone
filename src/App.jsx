import React, { useState, useEffect } from 'react';
import { fetchVideos } from './YoutubeAPI';
import VideoList from './VideoList.jsx';
import { YTvideos } from './ytvideos.jsx';
import { FaSun, FaMoon, FaYoutube, FaSearch } from 'react-icons/fa';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('React tutorials');
  const [searchInput, setSearchInput] = useState('');
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
        setVideos(items.slice(0, 6)); // Show 6 videos
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      setSelectedVideo(null);
    }
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
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search videos..."
                className={`w-full px-4 py-2 rounded-full ${
                  darkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400' 
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="submit"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <FaSearch />
              </button>
            </div>
          </form>
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
            videos={selectedVideo ? videos.filter(v => v.id.videoId !== selectedVideo) : videos} 
            onVideoSelect={handleVideoSelect} 
            darkMode={darkMode} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;