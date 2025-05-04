import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    // Fetching space news from an API or static source
    fetch('https://api.example.com/space-news')
      .then(response => response.json())
      .then(data => setNews(data.articles))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="news-section">
      <h2>Latest Space News</h2>
      <Slider {...settings}>
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSection;
