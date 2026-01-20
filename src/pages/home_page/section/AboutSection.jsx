import CardAbout from '../../../components/home_page/CardAbout'
import TitleSection from '../../../components/TitleSection'
import { cardAbout } from '../../../constants'


export default function AboutSection() {

    return (
        <section className='mt-[-100px]'>
            <TitleSection
                title={"Qui sommes-nous?"}
                sub={"Objectif, Mission, Vision"}
            />

            <div className=' flex flex-col justify-center md:mx-40 mx-5'>
                {/* En haut */}

                <div className=' flex flex-col md:flex-row justify-center' >
                    {/* Gauche */}
                    <div className='bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl'>
                        <p className='lg:text-xl md:text-lg text-base text-justify text-gray-700 leading-relaxed'>
                            <span className='font-bold text-[#1769aa] text-xl md:text-2xl mr-1'>
                                Initiative des Femmes Entrepreneurs pour le Développement Durable (IFEDD)
                            </span>
                            est une organisation non gouvernementale de{' '}
                            <span className='font-bold text-[#1769aa] bg-blue-50 px-2 py-1 rounded'>
                                droit congolais
                            </span>
                            , créée en{' '}
                            <span className='font-semibold text-gray-800'>2016</span>
                            {' '}à{' '}
                            <span className='font-semibold text-gray-800'>Goma</span>.
                            Elle œuvre dans les domaines{' '}
                            <span className='font-bold text-[#1769aa] bg-blue-50 px-2 py-1 rounded'>
                                humanitaire
                            </span>
                            {' '}et du{' '}
                            <span className='font-bold text-[#1769aa] bg-blue-50 px-2 py-1 rounded'>
                                développement durable
                            </span>.
                        </p>
                    </div>
                    {/* Droite */}
                    <div className='md:w-3/4 w-9/12 md:h-96 h-64  bg-cover rounded-2xl bg-[url(/image_a_propos.jpg)] mx-10 hover:rotate-3 transition-ease-in-out duration-800'
                        data-aos="fade-left"

                        data-aos-offset="500"
                        data-aos-duration="500" />

                </div>

                {/* En bas */}
                <div className='w-full flex md:flex-row flex-col gap-5 md:mt-8 mt-5 justify-center items-center'>
                    {cardAbout.map(({ title, icon, sub, scale }) => (
                        <CardAbout
                            title={title}
                            icon={icon}
                            sub={sub}
                            scale={scale}
                            key={title}
                        />
                    ))}
                </div>
            </div>

        </section>
    )
}
