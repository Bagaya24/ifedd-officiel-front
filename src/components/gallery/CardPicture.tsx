export default function CardPicture({ image, title, onClick }: { image: string, title: string, onClick?: () => void }) {
    return (
        <div className="card card-border rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm h-auto break-inside-avoid mb-4 group" onClick={onClick}>
            <div className="glow" />

            {/* Image (flexible) */}
            <div className="relative w-full overflow-hidden bg-gray-900">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Title Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-black/50 backdrop-blur-[2px] p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex items-center justify-center">
                    <p className="text-white text-sm font-medium text-center line-clamp-2 drop-shadow-md">
                        {title}
                    </p>
                </div>
            </div>
        </div>
    )
}