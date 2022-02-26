import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import CarouselState from "./CarouselState";
import React, { useEffect } from "react";

const handleDragStart = (e) => e.preventDefault();

// responsive carousel setting.
const responsive = {
  0: { items: 2 },
  568: { items: 4 },
  1024: { items: 6 },
};

const imageStyle = {
  height: "8rem",
  width: "8rem",
  borderRadius: "20%",
};

const Carousel = () => {
  const [trending, fetchTrendingCoin] = CarouselState();

  useEffect(() => {
    fetchTrendingCoin();
  }, [trending]);

  const items = trending.map((trend) => {
    const pic = trend["item"]["large"];
    const name = trend["item"]["name"];
    return (
      <Link to="detail">
        <img
          src={pic && pic}
          onDragStart={handleDragStart}
          role="presentation"
          style={imageStyle}
          className="rounded"
        />
      </Link>
    );
  });

  return (
    <div className="mt-32 md:w-[90%] m-auto p-8">
      <AliceCarousel
        items={items}
        mouseTracking
        infinite
        autoPlay
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
