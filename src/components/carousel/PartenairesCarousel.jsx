import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { logo } from "../../constants";
import UseFetch from "../../hooks/useFecth";
import { useEffect } from "react";
import Spinner from "../Spinner";



export default function PartenairesCarousel({ direction = 'ltr' }) {
  const { partenaires, getPartenaires, loader } = UseFetch();

  useEffect(() => {
    getPartenaires()
  }, []);
  const rtl = direction === 'rtl';

  const settings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rtl, // true => animation goes right-to-left
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 8 } },
      { breakpoint: 1280, settings: { slidesToShow: 6 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 640, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
      { breakpoint: 375, settings: { slidesToShow: 2 } },
      { breakpoint: 0, settings: { slidesToShow: 1 } },
    ],
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
