import React from 'react';
import { Carousel as AntCarousel } from 'antd';

const Carousel = () => (
    <AntCarousel autoplay>
        <div><img src="/assets/images/carousel-temp/img1.png" alt="slide1"/></div>
        <div><img src="/assets/images/carousel-temp/img2.png" alt="slide2"/></div>
        <div><img src="/assets/images/carousel-temp/img3.png" alt="slide3"/></div>
        <div><img src="/assets/images/carousel-temp/img4.png" alt="slide4"/></div>
    </AntCarousel>
);

export default Carousel;