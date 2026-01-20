import React from 'react'
import bgHero from "/bg_hero.jpg"
import Button from '../../../components/home_page/Button'

export default function HeroSection() {
    return (
        <section className="relative h-screen">

            <div
                className={`absolute inset-x-0 top-0 h-4/5 bg-cover bg-center bg-[url(/bg_hero.jpg)] flex justify-center items-center`}>

                <div className="absolute inset-0 bg-black/40" />

                <div className='relative flex flex-col w-3/4'>
                    <div>
                        <h1 className="text-4xl md:text-7xl lg:text-6xl  text-white font-bold px-2">
                            Initiative des Femmes Entrepreneurs pour le Développement Durable (IFEDD)
                        </h1>
                    </div>
                    <div className='w-full flex justify-center'>
                        <div className='md:w-100 lg:w-80 w-60 p-2'>
                            <Button
                                id={"download"}
                                text={"Brochure"}
                            />
                        </div>
                    </div>


                </div>
            </div>





        </section>
    )
}
