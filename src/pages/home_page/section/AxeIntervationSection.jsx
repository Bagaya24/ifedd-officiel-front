import { cardIntervation } from '../../../constants'
import TitleSection from '../../../components/TitleSection'
import Carousel from '../../../components/carousel/Carousel'


export default function AxeIntervationSection() {


  return (
    <section className="py-10 md:px-20 md:5">
      <TitleSection
        title={"NOS AXES D'INTERVATIONS"}

      />
      <Carousel
        data={cardIntervation.map((card, index) => (
          <div key={index}>
            <div className='bg-gray-50 rounded-lg shadow-lg  h-37.5'>
              <div className='flex justify-center items-center py-2'>
                <img src={card.icon} alt={card.title} />
              </div>
              <div className='flex justify-center items-center py-1 px-1'>
                <h1 className={`md:text-lg text-sm text-[${card.color}] font-semibold`}>
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
