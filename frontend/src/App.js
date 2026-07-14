import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const SECTIONS = [
  { id: "home", Component: Home },
  { id: "about", Component: About },
  { id: "skills", Component: Skills },
  { id: "projects", Component: Projects },
  { id: "contact", Component: Contact },
];

function App() {
  const swiperRef = useRef(null);

  return (
    <div className="w-screen h-screen bg-term-bg" data-testid="portfolio-app">
      <Swiper
        modules={[Keyboard, Pagination]}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        speed={550}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full h-full"
        data-testid="section-swiper"
      >
        {SECTIONS.map(({ id, Component }) => (
          <SwiperSlide key={id} data-testid={`slide-${id}`}>
            <Component />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;
