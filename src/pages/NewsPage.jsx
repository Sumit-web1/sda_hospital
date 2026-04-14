import React, { useState, useEffect } from "react";
import "./NewsPage.css";

import image1 from "../assets/news/image1.jpg";
import image2 from "../assets/news/image2.jpg";
import image3 from "../assets/news/image3.jpg";
import image4 from "../assets/news/image4.jpg";
import image5 from "../assets/news/image5.jpg";
import image6 from "../assets/news/image6.jpg";
import image7 from "../assets/news/image7.jpg";
import image8 from "../assets/news/image8.jpg";
import image9 from "../assets/news/image9.jpg";
import image10 from "../assets/news/image10.jpg";

const NewsPage = () => {
  const images = [
    image1, image2, image3, image4, image5,
    image6, image7, image8, image9, image10,
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const nextImage = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 200);
  };

  const prevImage = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
      setFade(true);
    }, 200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="news-page">
      <main className="news-container">
        <h2 className="news-title">Health Camp Organized at AMEN Conference 2025</h2>

        <p>
          We are delighted to share that <strong>SDAMC</strong> successfully organized
          and sponsored a comprehensive <strong>Health Camp</strong> during the
          <strong> AMEN Conference 2025</strong>, held at Carmeleram from
          <strong> 14–16 November 2025</strong>.
        </p>

        <p>
          The camp provided a range of medical services including basic health check-ups,
          screenings, wellness guidance, and consultations. A dedicated team of doctors,
          nurses, and support staff from SDAMC worked with great commitment throughout
          the three-day event.
        </p>

        <p>
          We extend our heartfelt gratitude to all staff members who contributed their
          time and effort to ensure the camp was conducted smoothly and efficiently.
        </p>

        <p>
          The <strong>AMEN (Adventist Medical Empowerment Networks)</strong> conference
          aims to empower healthcare professionals through collaboration, education,
          and service.
        </p>

        <p className="news-highlight">
          We are grateful for the opportunity to participate and serve the community
          in alignment with our mission of promoting health and healing.
        </p>

        <p className="news-signoff">— SDAMC Management</p>

        <div className="slider-box">
          <button className="slider-btn left" onClick={prevImage}>❮</button>

          <img
            src={images[index]}
            alt="news"
            className={`slider-image fade-animation ${fade ? "fade-in" : "fade-out"}`}
          />

          <button className="slider-btn right" onClick={nextImage}>❯</button>

          <div className="slider-dots">
            {images.map((_, i) => (
              <div
                key={i}
                className={`slider-dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsPage;
