import Slider from 'react-slick';



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#dbeafe" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#dbeafe" }}
      onClick={onClick}
    />
  );
}

export default function Carousel({ data, slides = 3 }) {


  const settings = {
    infinite: true,
    slidesToShow: slides,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,


    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />

  };


  return (
    <div className='w-full h-full'>

      <div className='slider-container h-full'>
        <Slider {...settings}>
          {data}
        </Slider>
      </div>


    </div>
  )
}
