import { useState, useMemo, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import BlotFormatter from 'quill-blot-formatter';
import NavBar from '../../../components/NavBar';
import TitleSection from '../../../components/TitleSection';
import UseFetch from '../../../hooks/useFecth';

import Alert from '../../../components/Alert';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import MFooter from '../../../components/MFooter';

// Register the module
Quill.register("modules/blotFormatter", BlotFormatter);

export default function PublicationArticles() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });
    const { addArticle, uploadFile, loader, loaderDelete, getArticle, articles, deleteArticle, updateArticle } = UseFetch();
    const quillRef = useRef(null);
    const editQuillRef = useRef(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({ id: null, title: '', content: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

  useEffect(() => {
    getArticle();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      const success = await deleteArticle(id);
      if (success) {
        setAlert({ message: "Article supprimé avec succès", type: "success" });
        getArticle();
      } else {
        setAlert({ message: "Erreur lors de la suppression", type: "error" });
      }
    }
  };

  const handleEditClick = (article) => {
    setEditData({
      id: article.id,
      title: article.title,
      content: article.content,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await updateArticle(editData.id, {
      title: editData.title,
      content: editData.content,
    });
    if (res) {
      setAlert({ message: "Article modifié avec succès", type: "success" });
      setIsEditModalOpen(false);
      getArticle();
    } else {
      setAlert({ message: "Erreur lors de la modification", type: "error" });
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
         
            const response = await addArticle({ title, image, description, date });
            setAlert({ message: response || "Article publié avec succès !", type: 'success' });

            // Reset form
            setTitle('');
            setImage(null);
            setImagePreview('');
            setDescription('');
            setDate('')
        } catch (error) {
            setAlert({ message: "Erreur lors de la publication.", type: 'error' });
        }
    };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const res = await uploadFile(file);
        if (res) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          const imageUrl = import.meta.env.VITE_CLOUD_URL_FILE + res.file_name;
          quill.insertEmbed(range.index, "image", imageUrl);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ align: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      blotFormatter: {},
    }),
    [],
  );

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'align',
        'list', 'indent',
        'link', 'image'
    ];

    // Pagination logic
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedArticles = articles.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (
        <div className="w-full">

            <NavBar />
            <div className="flex justify-center mt-24 mb-10">
                {alert.message && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert({ message: '', type: '' })}
                    />
                )}
                <div className="w-10/12 md:w-8/12">
                    <TitleSection title="PUBLIER UN ARTICLE" />

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        {/* Titre */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Titre de l'article</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg border-gray-500 placeholder:text-gray-700 text-gray-700 font-medium bg-white focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#1769aa]"
                                placeholder="Entrez le titre..."
                                required
                            />

                              <label className="block text-gray-700 font-bold mb-2">Titre de l'article</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg border-gray-500 placeholder:text-gray-700 text-gray-700 font-medium bg-white focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#1769aa]"
                                placeholder="Entrez le titre..."
                               
                            />
                        </div>

            {/* Image Principale */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Image Principale
              </label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-300 transition">
                  <span>Choisir une image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-20 w-32 object-cover rounded-lg border"
                  />
                )}
              </div>
            </div>

            {/* Description (Rich Text) */}
            <div className="h-96 pb-12">
              <label className="block text-gray-700 font-bold mb-2">
                Contenu de l'article
              </label>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                className="h-full"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-5">
              <button
                type="submit"
                disabled={loader ? true : false}
                className={`bg-[#1769aa] text-white font-bold py-2 px-6 rounded-lg  transition ${loader ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-800 cursor-pointer"}`}
              >
                {loader ? "Publiation en cours..." : "Publier l'article"}
              </button>
            </div>
          </form>

                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Liste des Articles</h2>
                        {loaderDelete && <p className="text-center text-red-600">Suppression en cours..</p>}
                        <Table
                            data={paginatedArticles}
                            onEdit={handleEditClick}
                            onDelete={handleDelete}
                            loader={loaderDelete}
                        />
                        
                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 rounded-lg">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                                        currentPage === 1
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-[#1769aa] text-white hover:bg-blue-800 cursor-pointer'
                                    }`}
                                >
                                    ← Précédent
                                </button>
                                
                                <span className="text-gray-700 font-semibold">
                                    Page {currentPage} sur {totalPages}
                                </span>
                                
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                                        currentPage === totalPages
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-[#1769aa] text-white hover:bg-blue-800 cursor-pointer'
                                    }`}
                                >
                                    Suivant →
                                </button>
                            </div>
                        )}
                    </div>

                    <Modal
                        open={isEditModalOpen}
                        setOpen={setIsEditModalOpen}
                        title="Modifier l'article"
                        size="xl"
                        headerColor='#1769aa'
                    >
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Titre</label>
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    className="w-full px-4 py-2 bg-white border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1769aa]"
                                    required
                                />
                            </div>
                            <div className="h-64 pb-12">
                                <label className="block text-gray-700 font-bold mb-2">Contenu</label>
                                <ReactQuill
                                    ref={editQuillRef}
                                    theme="snow"
                                    value={editData.content}
                                    onChange={(val) => setEditData({ ...editData, content: val })}
                                    modules={{
                                        toolbar: [
                                            [{ 'header': [1, 2, false] }],
                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                            [{ 'align': [] }],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['link'],
                                            ['clean']
                                        ],
                                        blotFormatter: {}
                                    }}
                                    className="h-full"
                                />
                            </div>
                            <div className="flex justify-end pt-5">
                                <button
                                    type="submit"
                                    disabled={loader ? true : false}
                                    className={`bg-[#1769aa] text-white font-bold py-2 px-6 rounded-lg transition ${loader ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-800 cursor-pointer"}`}
                                >
                                    {loader ? "Modification..." : "Modifier"}
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
            <MFooter />
        </div>
    );
}
