import React from 'react';
import LayOut from '../../Components/Header/LayOut/LayOut'
import Carousel from "../../Components/Header/Carousel/Carousel";
import Category from "../../Components/Header/Category/Category";
import Product from "../../Components/Header/Product/Product";
function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
