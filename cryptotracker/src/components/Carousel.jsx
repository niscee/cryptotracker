import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import CarouselState from "./CarouselState";
import React, { useEffect } from "react";

const pics = [
  "https://assets.coingecko.com/coins/images/16125/large/Baby_Doge.png?1",
  "https://assets.coingecko.com/coins/images/13256/large/api3.jpg?1606751424",
  "https://assets.coingecko.com/coins/images/10354/large/logo-grey-circle.png?1614910406",
  "https://assets.coingecko.com/coins/images/23267/large/Ix-ms0fq_400x400.jpg?1643414048",
  "https://assets.coingecko.com/coins/images/16125/large/Baby_Doge.png?1",
  "https://assets.coingecko.com/coins/images/13256/large/api3.jpg?1606751424",
];

const handleDragStart = (e) => e.preventDefault();

// responsive carousel setting.
const responsive = {
  0: { items: 2 },
  568: { items: 2 },
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
  }, []);

  // const items = trending.map((trend) => {
  //   const pic = trend["item"]["large"];
  //   const name = trend["item"]["name"];
  //   return (
  //     <Link to="detail">
  //       <img
  //         src={pic && pic}
  //         onDragStart={handleDragStart}
  //         role="presentation"
  //         style={imageStyle}
  //         className="rounded"
  //       />
  //     </Link>
  //   );
  // });

  const items = pics.map((trend) => {
    return (
      <Link to="detail">
        <img
          src={trend}
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
