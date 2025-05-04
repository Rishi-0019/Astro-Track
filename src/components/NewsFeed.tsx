// NewsFeed.tsx
import React, { useState, useEffect } from 'react';
import { fetchSpaceNews } from './nasaApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface NewsArticle {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
}

const NewsFeed = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  
  useEffect(() => {
    const getNews = async () => {
      const spaceNews = await fetchSpaceNews();
      if (spaceNews) {
        setNews([spaceNews]); // Assuming you're using APOD (Astronomy Picture of the Day)
      }
    };

    getNews();
  }, []);

  return (
    <div className="news-feed">
      <h2>Space News</h2>
      {news.length > 0 ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
        >
          {news.map((article, index) => (
            <SwiperSlide key={index}>
              <div className="news-item">
                <h3>{article.title}</h3>
                <p>{article.explanation}</p>
                {article.hdurl && <img src={article.hdurl} alt={article.title} />}
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Loading space news...</p>
      )}
    </div>
  );
};

export default NewsFeed;
