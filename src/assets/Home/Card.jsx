// src/assets/Home/Card.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-flip';
import './Card.css';

export default function CardSwiper() {
  return (
    <Swiper
      effect="flip"
      grabCursor={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[EffectFlip, Autoplay]}
      className="mySwiper"
    >
      {Array(6).fill().map((_, i) => (
        <SwiperSlide key={i}>
          <img
            src={`/img/pic1.jpg`}
            alt={`Slide ${i + 1}`}
            className="img-fluid rounded-0 shadow-0"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
