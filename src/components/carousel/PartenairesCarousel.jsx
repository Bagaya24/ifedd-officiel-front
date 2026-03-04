import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { logo } from "../../constants";
import UseFetch from "../../hooks/useFecth";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";



export default function PartenairesCarousel({ direction = 'ltr' }) {
  const { partenaires, getPartenaires, loader } = UseFetch();
  const [slides, setSlides] = useState(8);

  useEffect(() => {
    getPartenaires()
  }, []);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width >= 1536) setSlides(8);
      if (width >= 1280) setSlides(6);
      if (width >= 1024) setSlides(5);
      if (width >= 768) setSlides(4);
      if (width >= 640) setSlides(4);
      if (width >= 480) setSlides(3);
      if (width >= 375) setSlides(3);
      if (width < 375) setSlides(3);
    };

    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => {
      window.removeEventListener('resize', updateSlides);
    };
  }, []);

  const rtl = direction === 'rtl';

  const settings = {
    infinite: true,
    slidesToShow: slides,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rtl, // true => animation goes right-to-left

  };
  return (
    <div className="slider-container">
      {loader ? 
      <Spinner
      loader={loader}
      /> : (
         <Slider {...settings}>
        {partenaires.map((partenaire, index) => (
          <div key={index} className="flex items-center justify-center p-4">
            <img
              src={import.meta.env.VITE_CLOUD_URL_FILE + partenaire?.file_name}
              alt={partenaire?.name || `logo-${index}`}
              className="max-h-16 md:max-h-20 lg:max-h-24 w-auto object-contain mx-auto"
            />
          </div>
        ))}
      </Slider>
      ) }
     
    </div>
  );
}
