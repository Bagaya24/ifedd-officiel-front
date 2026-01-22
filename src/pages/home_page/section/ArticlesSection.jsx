
import Carousel from '../../../components/carousel/Carousel'
import ArticleCard from '../../../components/articles/ArticleCard'

import { Link } from 'react-router-dom'
import TitleSection from '../../../components/TitleSection'
import UseFetch from '../../../hooks/useFecth'
import { useEffect } from 'react'
import Spinner from '../../../components/Spinner'

export default function ArticlesSection() {
    const { articles, getArticle, loader } = UseFetch();

    useEffect(() => {
        getArticle();
    }, []);

    return (
        <section className="px-5 md:px-20 w-full">
            {/* Grid Layout */}
            <div className="flex justify-center">
               <TitleSection
                title={"NOS ARTICLES ET RÉALISATIONS"}
            /> 
            </div>
            

            <div className='w-full h-full '>
                {loader ? <Spinner
                loader={loader}
                /> : (
                    <div className='flex flex-col gap-3 w-full h-full'>
                    {/* top  */}
                    <Link to={"/article/" + articles[0]?.id} className="block no-underline h-full"
                        data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                    >
                        <div className='flex md:flex-row flex-col md:h-full h-7/12 w-full my-5 gap-4'>
                            {/* Right */}
                            <div className='md:w-1/2 w-full h-full bg-cover rounded-lg overflow-hidden'>
                                <img src={import.meta.env.VITE_CLOUD_URL_FILE + articles[0]?.image} alt={articles[0]?.title}
                                    className=' h-full w-full object-cover transition-transform duration-500 hover:scale-105' />
                            </div>
                            {/* Left */}
                            <div className='md:w-1/2 w-full h-full '

                            >
                                <h1 className='lg:text-2xl md:text-xl text-lg text-[#1769aa] font-bold py-3 text-left'
                                    data-aos="fade-left"
                                    data-aos-offset="500"
                                    data-aos-duration="500">
                                    {articles[0]?.title || "Pas d'article"}
                                </h1>
                                <div className='md:text-base text-sm text-gray-600 article-content article-content-no-images lg:line-clamp-10 md:line-clamp- line-clamp-3'
                                    data-aos="fade-left"
                                    data-aos-offset="500"
                                    data-aos-duration="500"
                                    dangerouslySetInnerHTML={{ __html: articles[0]?.content }}
                                />
                            </div>
                        </div>
                    </Link>


                    {/* Right Side - Carousel */}
                    <div className=' h-full w-full  rounded-lg flex justify-center items-center'>
                        <Carousel

                            data={articles.map((card, index) => (
                                <ArticleCard
                                    key={index}
                                    id={card?.id || index}
                                    title={card?.title}
                                    image={import.meta.env.VITE_CLOUD_URL_FILE + card?.image}
                                    description={card?.content}
                                />
                            ))}
                        />
                    </div>
                </div> 
                )}
               
            </div>
        </section>
    )
}
