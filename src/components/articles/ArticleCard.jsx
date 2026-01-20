import { Link } from 'react-router-dom'

export default function ArticleCard({ id, title, image, description, href = `/article/${id}` }) {
  return (
    <Link to={href} className={`block no-underline h-full`}>
      <div className="card card-border rounded-xl overflow-hidden cursor-pointer transition-transform duration-300  hover:-translate-y-1 hover:shadow-lg h-full flex flex-col md:w-full w-60">
        <div className="glow" />

        {/* Image (flexible) */}
        <div className="relative w-full flex-1 overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-[200px] object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Content Container */}
        <div className="p-4 md:p-6 bg-gray-50 relative z-10">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-semibold  mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <div className="text-sm md:text-base text-gray-700 line-clamp-2 mb-4 [&_img]:hidden [&_h1]:text-2xl [&_h2]:text-xl break-words" dangerouslySetInnerHTML={{ __html: description }} />

          {/* Read More Link */}
          <div className="flex items-center text-[#1769aa] hover:text-blue-700 transition-colors duration-300">
            <span className="text-sm font-medium">Lire plus</span>
            <span className="ml-2">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
