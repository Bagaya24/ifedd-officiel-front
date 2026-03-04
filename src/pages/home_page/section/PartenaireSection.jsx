import PartenairesCarousel from '../../../components/carousel/PartenairesCarousel'
import TitleSection from '../../../components/TitleSection'

export default function PartenaireSection() {
  return (
    <section className='py-10 md:px-20 md:5'>
      <TitleSection
        title={"NOS PARTENAIRES"}

      />
      
      <PartenairesCarousel />
      <PartenairesCarousel direction='rtl' />
    </section>
  )
}
