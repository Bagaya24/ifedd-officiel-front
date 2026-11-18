import { cardIntervation } from '../../../constants'
import TitleSection from '../../../components/TitleSection'
import Carousel from '../../../components/carousel/Carousel'
import { useEffect, useState } from 'react';


export default function AxeIntervationSection() {
  const [slides, setSlides] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width >= 1536) setSlides(4);
      if (width >= 1280) setSlides(3);
      if (width >= 768) setSlides(2);
      if (width < 768) setSlides(1);
    };

    updateSlides();
    window.addEventListener('resize', updateSlides);

    return () => {
      window.removeEventListener('resize', updateSlides);
    };
  }, []);

  return (
    <section className="py-10 md:px-20 px-5">
      <TitleSection
        title={"NOS AXES D'INTERVENTIONS"}

      />
      <Carousel
        slides={slides}
        data={cardIntervation.map((card) => (
          <div key={card.title}>
            <div className='bg-gray-50 rounded-lg shadow-lg  h-37.5'>
              <div className='flex justify-center items-center py-2'>
                <img src={card.icon} alt={card.title} />
              </div>
              <div className='flex justify-center items-center py-1 px-1'>
                <h1 className="md:text-lg text-sm font-semibold" style={{ color: card.color }}>
                  {card.title}
                </h1>
              </div>
            </div>
          </div>
        ))}
      />
    </section>
  )
}
