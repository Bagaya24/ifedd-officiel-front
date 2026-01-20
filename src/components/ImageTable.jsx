import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function ImageTable({ images, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 10;

    // Calculer les indices pour la pagination
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(images.length / imagesPerPage);

    // Fonction pour changer de page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="w-full">
            {/* Table Container */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full table-auto">
                    <thead className="bg-gradient-to-r from-[#1769aa] to-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Legend</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentImages.length > 0 ? (
                            currentImages.map((image, index) => (
                                <tr
                                    key={image.id || index}
                                    className="hover:bg-gray-50 transition-colors"
                                >

                                    {/* Image Miniature */}
                                    <td className="px-6 py-4">
                                        <img
                                            src={import.meta.env.VITE_CLOUD_URL_FILE + image.file_name}
                                            alt={image.title || 'Image'}
                                            className="w-20 h-20 object-cover rounded-lg border border-gray-300 shadow-sm"
                                        />
                                    </td>

                                    {/* Titre */}
                                    <td className="px-6 py-4 text-sm text-gray-700 font-medium max-w-xs truncate">
                                        {image.legend || 'Sans titre'}
                                    </td>


                                    {/* Actions */}
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => onDelete(image.id)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                                            title="Supprimer cette image"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    Aucune image à afficher
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {images.length > imagesPerPage && (
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-md">
                    {/* Info */}
                    <div className="text-sm text-gray-600">
                        Affichage de{' '}
                        <span className="font-semibold text-gray-800">
                            {indexOfFirstImage + 1}
                        </span>
                        {' '}-{' '}
                        <span className="font-semibold text-gray-800">
                            {Math.min(indexOfLastImage, images.length)}
                        </span>
                        {' '}sur{' '}
                        <span className="font-semibold text-gray-800">{images.length}</span>
                        {' '}images
                    </div>

                    {/* Boutons de navigation */}
                    <div className="flex items-center gap-2">
                        {/* Bouton Précédent */}
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-[#1769aa] text-white hover:bg-blue-700'
                                }`}
                        >
                            Précédent
                        </button>

                        {/* Numéros de page */}
                        <div className="hidden md:flex items-center gap-1">
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1;
                                // Afficher seulement quelques pages autour de la page actuelle
                                if (
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => goToPage(pageNumber)}
                                            className={`px-3 py-2 rounded-lg font-medium transition-colors ${currentPage === pageNumber
                                                ? 'bg-[#1769aa] text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                } else if (
                                    pageNumber === currentPage - 2 ||
                                    pageNumber === currentPage + 2
                                ) {
                                    return (
                                        <span key={pageNumber} className="px-2 text-gray-500">
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Affichage mobile de la page actuelle */}
                        <div className="md:hidden text-sm text-gray-600 font-medium">
                            Page {currentPage} / {totalPages}
                        </div>

                        {/* Bouton Suivant */}
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === totalPages
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-[#1769aa] text-white hover:bg-blue-700'
                                }`}
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
