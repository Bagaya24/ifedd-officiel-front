import { useEffect, useState } from "react"
import UseFetch from "../../../hooks/useFecth";
import NavBar from "../../../components/NavBar";
import TitleSection from "../../../components/TitleSection";
import DataTable from "../../../components/DataTable";
import Alert from "../../../components/Alert";
import MFooter from "../../../components/MFooter";

export default function PublicationRapport() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [alert, setAlert] = useState({ message: "", type: "" });

    const { getRapport, rapports, loader, addRapport, deleteRapport } = UseFetch();

    useEffect(() => {
        getRapport();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addRapport(title, image, file);
            setAlert({ message: response.message || "rapport ajouté avec succès", type: "success" });
            setTitle("");
            setImage(null);
            setImagePreview(null);
            setFile(null);
            setFilePreview(null);
            getRapport();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce rapport ?")) {
            try {
                const response = await deleteRapport(id);
                setAlert({ message: response.message || "rapport supprimé avec succès", type: "success" });
                getRapport();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const columns = [
        {
            key: 'title',
            label: 'Titre',
            type: 'text',
            truncate: true
        },
        {
            key: 'image',
            label: 'Image',
            type: 'image',
            imageKey: 'cover_image'
        }
    ];
    return (
        <div className="w-full">
            <NavBar />
            <div className="mt-24 mb-10 flex justify-center">
                {alert.message && <Alert message={alert.message} type={alert.type} />}
                <div className="w-10/12">
                    <TitleSection
                        title={"Publication des rapports"}
                        sub={"Administration"}
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
                            <label className="block text-gray-700 font-bold mb-2">Image de la couverture</label>
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

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Fichier du rapport</label>
                            <div className="flex items-center space-x-4">
                                <label className="cursor-pointer text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-300 transition">
                                    <span>Choisir un fichier</span>
                                    <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                                </label>
                                {filePreview && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-700 font-medium">{file.name}</span>
                                        <a href={filePreview} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Voir</a>
                                    </div>
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

                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-4">Liste des rapports </h2>
                        {loader && <p className="text-center text-red-600">Suppression en cours..</p>}
                        <DataTable
                            data={rapports}
                            columns={columns}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>


            </div>
            <MFooter />
        </div>
    )
}