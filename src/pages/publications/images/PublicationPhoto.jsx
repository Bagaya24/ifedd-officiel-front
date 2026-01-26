import { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import TitleSection from "../../../components/TitleSection";
import UseFetch from "../../../hooks/useFecth";
import Alert from "../../../components/Alert";
import DataTable from "../../../components/DataTable";
import MFooter from "../../../components/MFooter";


export default function PublicationPhoto() {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [alert, setAlert] = useState({ message: "", type: "" });

    const { galeries, getGalerie, loader, loaderDelete, deleteGalerie, addGalerie } = UseFetch();

    useEffect(() => {
        getGalerie();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
            const success = await deleteGalerie(id);
            if (success) {
                setAlert({ message: "Image supprimée avec succès", type: 'success' });
                getGalerie();
            } else {
                setAlert({ message: "Erreur lors de la suppression", type: 'error' });
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (title.length > 250) {
                setAlert({ message: "Le titre ne doit pas dépasser 250 caractères.", type: 'error' });
                return;
            };
            const response = await addGalerie(title, image);
            setAlert({ message: response.message || "Photo publiee avec succes !", type: "success" });

            setTitle("");
            setImage(null);
            setImagePreview("");
            getGalerie();
        } catch (error) {
            console.error(error);
            setAlert({ message: "Erreur lors de la publication", type: "error" });
        }
    };

    // Configuration des colonnes pour DataTable
    const columns = [
        {
            key: 'file_name',
            label: 'Image',
            type: 'image',
            imageKey: 'file_name'
        },
        {
            key: 'legend',
            label: 'Légende',
            type: 'text',
            truncate: true
        }
    ];

    return (
        <div className="w-full">
            <NavBar />
            <div className="mt-24 mb-10 flex justify-center">
                {alert.message && (
                    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            onClose={() => setAlert({ message: '', type: '' })}
                        />
                    </div>
                )}
                <div className="w-10/12">

                    <TitleSection
                        title={"Publication des images"}

                    />
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-100 ">
                        {/* Titre */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Titre de l'image</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg border-gray-500 placeholder:text-gray-700 text-gray-700 font-medium bg-white focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#1769aa]"
                                placeholder="Entrez le titre..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Image</label>
                            <div className="flex items-center space-x-4">
                                <label className="cursor-pointer text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-300 transition">
                                    <span>Choisir une image</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="h-20 w-32 object-cover rounded-lg border" />
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-5">
                            <button
                                type="submit"
                                disabled={loader ? true : false}
                                className={`bg-[#1769aa] text-white font-bold py-2 px-6 rounded-lg  transition ${loader ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-800 cursor-pointer"}`}
                            >
                                {loader ? "Publication en cours..." : "Publier l'image"}
                            </button>
                        </div>
                    </form>

                    {/* Liste des images avec pagination */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Liste des Images</h2>
                        {loaderDelete && <p className="text-center text-red-600">Suppression en cours..</p>}
                        <DataTable
                            data={galeries}
                            columns={columns}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
            <MFooter />
        </div>
    );
}