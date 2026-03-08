import { useState, useEffect } from "react";
import "./HeroCarousel.css";
import img1 from "../../assets/corousel-1.jpeg";
import img2 from "../../assets/corousel-2.jpeg";
import img3 from "../../assets/corousel-3.jpeg";
import img4 from "../../assets/corousel-4.jpeg";
import img5 from "../../assets/corousel-5.jpeg";
import img6 from "../../assets/corousel-6.jpeg";

const images = [img1, img2, img3, img4, img5, img6];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-carousel">
      <img src={images[index]} alt="carousel" />
    </div>
  );
};

export default HeroCarousel;