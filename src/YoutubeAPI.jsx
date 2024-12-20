import axios from 'axios';

const API_KEY = 'AIzaSyBN6e2vJ5Meu4QntZrx0orz7vxAeT74v7g';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async (query) => {
  try {
    console.log('Fetching videos for query:', query);
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        key: API_KEY,
        type: 'video',
        maxResults: 4,
        videoEmbeddable: true
      },
    });

    if (!response.data || !response.data.items) {
      console.error('Invalid response format:', response.data);
      throw new Error('Invalid response from YouTube API');
    }

    return {
      items: response.data.items
    };
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message;
    console.error('Error fetching videos:', errorMessage);
    
    if (error.response?.status === 403) {
      console.error('API Key quota exceeded or invalid. Please check your API key.');
    }
    
    throw {
      message: 'Failed to fetch videos. Please try again later.',
      details: errorMessage,
      status: error.response?.status
    };
  }
};
