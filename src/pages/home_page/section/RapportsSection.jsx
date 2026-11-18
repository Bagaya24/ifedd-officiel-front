import { useEffect } from 'react';
import TitleSection from '../../../components/TitleSection'
import Carousel from '../../../components/carousel/Carousel'

import RapportCard from '../../../components/home_page/RapportCard'
import UseFetch from '../../../hooks/useFecth'
import Spinner from '../../../components/Spinner';

export default function RapportsSection() {
  const { rapports, getRapport, loader } = UseFetch();

  useEffect(() => {
    void getRapport();
  }, []);
  return (
    <section className='py-10 md:px-20 md:5'>
      <TitleSection
        title={"NOS RAPPORTS"}
  
      />
      { loader ? 
      <Spinner
      loader={loader}
      />: (
        <div className='w-full f-full'>
        <Carousel
          data={rapports.map((rapport) => (
            <RapportCard
              key={rapport.id}
              title={rapport.title}
              image={rapport.cover_image}
              document={rapport.file_name}
            />
          ))}
          slides={2}
        />
      </div>
      )}
      
    </section>
  )
}
