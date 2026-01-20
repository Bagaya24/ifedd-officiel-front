import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import TitleSection from "../../../components/TitleSection";
import Alert from "../../../components/Alert";
import DataTable from "../../../components/DataTable";
import UseFetch from "../../../hooks/useFecth";

export default function PublicationPartenaire() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [alert, setAlert] = useState({ message: "", type: "" });

    const { partenaires, getPartenaires, loader, deletePartenaire, addPartenaire } = UseFetch();

    useEffect(() => {
        getPartenaires();
    }, []);
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
            const response = await addPartenaire(title, image);
            setAlert({ message: response.message || "Partenaire publiee avec succes !", type: "success" });

            setTitle("");
            setImage(null);
            setImagePreview("");
            getPartenaires();
        } catch (error) {
            console.error(error);
            setAlert({ message: "Erreur lors de la publication", type: "error" });
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce partenaire ?")) {
            const success = await deletePartenaire(id);
            if (success) {
                setAlert({ message: "Partenaire supprimee avec succes !", type: "success" });
                getPartenaires();
            } else {
                setAlert({ message: "Erreur lors de la suppression", type: "error" });
            }
        }
    };

    const column = [
        {
            key: 'name',
            label: 'Titre',
            type: 'text',
            truncate: true
        },
        {
            key: 'image',
            label: 'Logo',
            type: 'image',
            imageKey: 'file_name'
        }
    ]
    return (
        <div className="w-full">
            <NavBar />
            <div className="mt-24 mb-10 flex justify-center">
                {alert.message && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert({ message: "", type: "" })}
                    />
                )}
                <div className="w-10/12">
                    <TitleSection
                        title={"Publication des partenaires"}
                        sub={"Administration"}
                    />
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-100 ">
                        {/* Titre */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Titre du partenaire</label>
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
                            <label className="block text-gray-700 font-bold mb-2">Logo</label>
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
                                className="bg-[#1769aa] text-white px-6 py-2 rounded-lg hover:bg-[#1769aa]/90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loader ? "Publication en cours..." : "Publier"}
                            </button>
                        </div>
                    </form>
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-4">Liste des partenaires</h2>
                        {loader && <p className="text-center text-red-600">Suppression en cours..</p>}
                        <DataTable
                            columns={column}
                            data={partenaires}
                            onDelete={handleDelete}

                        />
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}