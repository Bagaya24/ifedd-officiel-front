import { Link } from "react-router-dom";


export default function RapportCard({ title, image, document }) {
  return (
    <Link to={import.meta.env.VITE_CLOUD_URL_FILE + document} className="no-underline">
      <div className="card card-border rounded-xl overflow-hidden cursor-pointer transition-transform duration-300  hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
        <div className="glow" />

        {/* Image (flexible) */}
        <div className="relative w-full flex-1 overflow-hidden bg-gray-900 ">
          <img
            src={import.meta.env.VITE_CLOUD_URL_FILE + image}
            alt={title}
            className="w-full lg:h-80 md:h-60 h-40 object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Content Container */}
        <div className="p-4 md:p-6 bg-gray-50 relative z-10">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-semibold  mb-2 line-clamp-2">
            {title}
          </h3>


          {/* Read More Link */}
          <div className="flex items-center text-[#1769aa] hover:text-blue-700 transition-colors duration-300">
            <span className="text-sm font-medium">Voir</span>

          </div>
        </div>
      </div>
    </Link>


  )
}
