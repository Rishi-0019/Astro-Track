// src/utils/nasaApi.ts

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY; // Use REACT_APP_ prefix if using Create React App

const NASA_API_URL = 'https://api.nasa.gov/planetary/apod'; // Astronomy Picture of the Day (APOD)

export interface NasaNews {
  title: string;
  explanation: string;
  url: string;
  date: string;
}

export const fetchSpaceNews = async (): Promise<NasaNews | null> => {
  try {
    const response = await fetch(`${NASA_API_URL}?api_key=${NASA_API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch from NASA API');
    }

    const data = await response.json();
    return {
      title: data.title,
      explanation: data.explanation,
      url: data.url,
      date: data.date,
    };
  } catch (error) {
    console.error('NASA API fetch error:', error);
    return null;
  }
};
