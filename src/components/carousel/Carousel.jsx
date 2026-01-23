import Slider from 'react-slick';



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#dbeafe"}}
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

        responsive: [
              { breakpoint: 1536, settings: { slidesToShow: 4 } },
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
      { breakpoint: 375, settings: { slidesToShow: 1 } },
      { breakpoint: 0, settings: { slidesToShow: 1 } },
        ],
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
