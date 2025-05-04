// src/components/NewsSlider.tsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./NewsSlider.css";

interface Article {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  url: string;
  publishedAt: string;
}

const NewsSlider: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles?limit=10&ordering=-publishedAt")
      .then((res) => res.json())
      .then((data) => setArticles(data.results))
      .catch((err) => console.error("News fetch error:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="news-slider">
      <h2 className="news-heading">🚀 Latest Space & Satellite News</h2>
      <Slider {...settings}>
        {articles.map((article) => (
          <div className="news-card" key={article.id}>
            <img src={article.imageUrl} alt={article.title} className="news-img" />
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.summary.slice(0, 100)}...</p>
              <a href={article.url} target="_blank" rel="noreferrer">Read More →</a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSlider;
