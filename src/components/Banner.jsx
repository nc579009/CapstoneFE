import React, { useState, useEffect } from "react";
import "../css/banner.css"; // Make sure this path is correct

const Banner = () => {
  const images = [
    //"https://images.pexels.com/photos/1089451/pexels-photo-1089451.jpeg?auto=compress&cs=tinysrgb&w=1200", //leaves
    //"https://images.pexels.com/photos/2534524/pexels-photo-2534524.jpeg?auto=compress&cs=tinysrgb&w=300", // flowers
    "https://images.pexels.com/photos/5659772/pexels-photo-5659772.jpeg?auto=compress&cs=tinysrgb&w=300", //jars
    "https://images.pexels.com/photos/6399519/pexels-photo-6399519.jpeg?auto=compress&cs=tinysrgb&w=300", //tomato
    "https://images.pexels.com/photos/113335/pexels-photo-113335.jpeg?auto=compress&cs=tinysrgb&w=300", //seedling
    "https://images.pexels.com/photos/17365924/pexels-photo-17365924/free-photo-of-cool-leaves-background-bokeh.jpeg?auto=compress&cs=tinysrgb&w=300", //dark leaves
    "https://images.pexels.com/photos/17098293/pexels-photo-17098293/free-photo-of-a-blindfolded-shirtless-man-standing-on-a-field-and-smelling-a-flower.jpeg?auto=compress&cs=tinysrgb&w=300" //man in the garden
  ];

  const [bannerImage, setBannerImage] = useState("");

  useEffect(() => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBannerImage(randomImage); // Set the random image on mount
  }, []);

  return (
    <div className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
      <h1>Homestead Hero</h1>
    </div>
  );
};

export default Banner;
