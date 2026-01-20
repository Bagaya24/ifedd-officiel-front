import Slider from 'react-slick';


export default function Carousel({ data, slides = 3 }) {


    const settings = {
        infinite: true,
        slidesToShow: slides,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,

        responsive: [
            { // <= 1024px
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            { // <= 768px
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            { // <= 480px (phones)
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
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
