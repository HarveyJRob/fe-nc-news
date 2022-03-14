import React, { useState, useEffect } from "react";
import banner_speakers from "../images/banner_speakers_1000px.jpg";
import banner_reading from "../images/banner_reading_1000px.jpg";
import banner_papers from "../images/banner_papers_1000px.jpg";
import banner_news from "../images/banner_news_1000px.jpg";
import { useLocation } from "react-router-dom";

const banners = [banner_speakers, banner_papers, banner_news, banner_reading];

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(banners[0]);
  const location = useLocation();

  useEffect(() => {
    setCurrentBanner(banners[Math.floor(Math.random() * banners.length)]);
  }, [location]);

  return <img className="banner" src={currentBanner} width="100%" alt="banner" />;
};

export default Banner;
