export default function CardAbout({ title, icon, sub, scale = 1, aos = 'fade-up', aosDuration = 800, aosDelay = 500 }) {
    return (
        <div
            className="card card-border timeline-card rounded-xl p-5 mb-5 break-inside-avoid-column shadow-xl"
            data-aos={aos}
            data-aos-duration={aosDuration}
            data-aos-delay={aosDelay}
        >
            <div className="glow" />
            <div className="flex justify-center">
                <h1 className="lg:text-3xl md:text-2xl text-xl mb-2 font-bold text-[#1769aa]">{title}</h1>
            </div>
            <div className="mb-5 flex justify-center">
                <img src={icon} alt={title} style={{ scale: scale }} className="rounded-xl" />
            </div>

            <div className="mb-5">
                <p className="text-gray-700 xl:text-lg text-sm ">{sub}</p>
            </div>
        </div>
    )
}
