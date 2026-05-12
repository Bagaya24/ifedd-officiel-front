
export default function Table({ data, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10 w-full">
            <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                        <th scope="col" className="py-3 px-6">Image</th>
                        <th scope="col" className="py-3 px-6">Titre</th>
                        <th scope="col" className="py-3 px-6">Contenu</th>
                        <th scope="col" className="py-3 px-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="py-4 px-6">
                                    {item.image ? (
                                        <img src={import.meta.env.VITE_CLOUD_URL_FILE + item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs">No Img</div>
                                    )}
                                </td>
                                <td className="py-4 px-6 font-medium text-gray-900">
                                    {item.title}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="truncate w-64 text-gray-600 line-clamp-2">
                                        {item.content ? item.content.replace(/<[^>]+>/g, '') : ''}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="font-semibold bg-blue-100 text-blue-950 border border-blue-400 rounded-xl  py-1 px-1 cursor-pointer mr-4 mb-2"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="font-semibold bg-red-100 text-red-800 border border-red-400 rounded-xl  py-1 px-1 cursor-pointer mr-4"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">Aucun article trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
