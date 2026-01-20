import { useState } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

/**
 * Composant DataTable générique et réutilisable avec pagination
 * 
 * @param {Array} data - Les données à afficher
 * @param {Array} columns - Configuration des colonnes à afficher
 * @param {Function} onDelete - Fonction appelée lors de la suppression (optionnel)
 * @param {Function} onEdit - Fonction appelée lors de l'édition (optionnel)
 * @param {Number} itemsPerPage - Nombre d'éléments par page (par défaut 10)
 * 
 * Exemple de configuration de columns:
 * [
 *   { key: 'id', label: 'N°', type: 'text' },
 *   { key: 'image', label: 'Image', type: 'image', imageKey: 'file_name' },
 *   { key: 'title', label: 'Titre', type: 'text' },
 *   { key: 'created_at', label: 'Date', type: 'date' }
 * ]
 */
export default function DataTable({
    data = [],
    columns = [],
    onDelete,
    onEdit,
    itemsPerPage = 10
}) {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculer les indices pour la pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Fonctions de pagination
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

    // Fonction pour rendre le contenu de la cellule selon son type
    const renderCellContent = (item, column) => {
        const value = item[column.key];

        switch (column.type) {
            case 'image':
                const imageSrc = column.imageKey
                    ? import.meta.env.VITE_CLOUD_URL_FILE + item[column.imageKey]
                    : value;
                return (
                    <img
                        src={imageSrc}
                        alt={item.title || item.name || 'Image'}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-300 shadow-sm"
                    />
                );

            case 'date':
                return value
                    ? new Date(value).toLocaleDateString('fr-FR')
                    : 'N/A';

            case 'number':
                return <span className="font-mono">{value || 0}</span>;

            case 'badge':
                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${column.badgeClass || 'bg-blue-100 text-blue-800'}`}>
                        {value}
                    </span>
                );

            case 'link':
                return (
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        {column.linkText || 'Voir'}
                    </a>
                );

            default: // 'text'
                return (
                    <span className={column.className || ''}>
                        {value || column.defaultValue || '-'}
                    </span>
                );
        }
    };

    return (
        <div className="w-full">
            {/* Table Container */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full table-auto">
                    <thead className="bg-linear-to-r from-[#1769aa] to-blue-600 text-white">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-4 text-sm font-semibold ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}`}
                                >
                                    {column.label}
                                </th>
                            ))}
                            {(onDelete || onEdit) && (
                                <th className="px-6 py-4 text-center text-sm font-semibold">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentItems.length > 0 ? (
                            currentItems.map((item, rowIndex) => (
                                <tr
                                    key={item.id || rowIndex}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`px-6 py-4 text-sm text-gray-700 ${column.truncate ? 'max-w-xs truncate' : ''} ${column.cellClassName || ''}`}
                                        >
                                            {renderCellContent(item, column)}
                                        </td>
                                    ))}

                                    {/* Actions Column */}
                                    {(onDelete || onEdit) && (
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {onEdit && (
                                                    <button
                                                        onClick={() => onEdit(item.id)}
                                                        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                                        title="Modifier"
                                                    >
                                                        <PencilIcon className="w-4 h-4" />
                                                        Modifier
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => onDelete(item.id)}
                                                        className="inline-flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                                                        title="Supprimer"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                        Supprimer
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + (onDelete || onEdit ? 1 : 0)}
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    Aucune donnée à afficher
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {data.length > itemsPerPage && (
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-md">
                    {/* Info */}
                    <div className="text-sm text-gray-600">
                        Affichage de{' '}
                        <span className="font-semibold text-gray-800">
                            {indexOfFirstItem + 1}
                        </span>
                        {' '}-{' '}
                        <span className="font-semibold text-gray-800">
                            {Math.min(indexOfLastItem, data.length)}
                        </span>
                        {' '}sur{' '}
                        <span className="font-semibold text-gray-800">{data.length}</span>
                        {' '}éléments
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
