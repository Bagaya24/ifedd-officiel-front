import { useState } from 'react'
import { api, apiFormData } from '../api/Api'

function UseFetch() {
    const [likes, setLikes] = useState(0);
    const [articles, setArticle] = useState([]);
    const [galeries, setGalerie] = useState([]);
    const [rapports, setRapport] = useState([]);
    const [partenaires, setPartenaires] = useState([]);
    const [commentaires, setCommentaires] = useState([]);
    const [loader, setLoader] = useState(false);
    const [loaderDelete, setLoaderDelete] = useState(false);

    const formatDate = () => {
        const date = new Date();
        const jour = String(date.getDate()).padStart(2, '0');
        const mois = String(date.getMonth() + 1).padStart(2, '0');
        const annee = date.getFullYear();
        return annee + '-' + mois + "-" + jour
    }

    // Articles
    const getArticle = async () => {
        setLoader(true);
        try {
            const response = await api.get("articles/");
            setArticle(response.data)
            setLoader(false);
        }
        catch (error) {
            setLoader(false);
            throw console.error(error);
        }
    };

    const addArticle = async ({ title, image, description, date }) => {
        setLoader(true);
        try {

            if (!date) {
                date = formData();
            };
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", description);
            formData.append("image", image);
            formData.append("date", date);
            formData.append("author", "communication IFEDD");
            const response = await apiFormData.post("articles/publication/", formData);
            if (!response) {
                setLoader(false)
                throw new Error("Erreur serveur");
            }
            setLoader(false);
            return response.data.message;
        } catch (error) {
            setLoader(false);
            throw console.error(error);
        }
    };

    const deleteArticle = async (id) => {
        setLoaderDelete(true);
        try {
            await api.delete(`articles/delete/${id}/`);
            setLoaderDelete(false);
            return true;
        } catch (error) {
            setLoaderDelete(false);
            console.error(error);
            return false;
        }
    };

    const updateArticle = async (id, data) => {
        setLoader(true);
        try {

            const response = await api.patch(`articles/update/${id}/`, data);
            setLoader(false);
            return response.data;
        } catch (error) {
            setLoader(false);
            console.error(error);
            return null;
        }
    };

    const uploadFile = async (file) => {
        setLoader(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            const response = await apiFormData.post(`articles/upload-image/`, formData);

            setLoader(false);

            return response.data;
        } catch (error) {
            setLoader(false);
            console.error(error);
            return null;
        }
    };

    const getGalerie = async () => {
        setLoader(true);
        try {
            const response = await api.get("gallery/");
            setGalerie(response.data);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            throw console.error(error);
        }
    };

    const addGalerie = async (title, image) => {
        setLoader(true);
        try {
            const formData = new FormData();
            const date = formatDate();
            formData.append("image", image);
            formData.append("legend", title);
            formData.append("date", date)

            const response = await apiFormData.post("gallery/publication/", formData);
            setLoader(false);
            return response.data.message;
        } catch (error) {
            setLoader(false);
            console.error(error);
            return null;
        }
    };

    const deleteGalerie = async (id) => {
        setLoaderDelete(true);
        try {
            const response = await api.delete(`gallery/delete/${id}/`);
            setLoaderDelete(false);
            return response.data;
        } catch (error) {
            setLoaderDelete(false);
            console.error(error);
            return null;
        }
    };

    const getRapport = async () => {
        setLoader(true);
        try {
            const response = await api.get("rapports/");
            setRapport(response.data);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            throw console.error(error);
        }
    };

    const addRapport = async (title, image, file) => {
        setLoader(true);
        try {
            const date = formatDate();
            const formData = new FormData();
            formData.append("title", title);
            formData.append("image", image);
            formData.append("document", file);
            formData.append("date", date)
            const response = await apiFormData.post("rapports/publication/", formData);
            setLoader(false);
            return response.data.message;
        } catch (error) {
            setLoader(false);
            console.error(error);
            return null;
        }
    };

    const deleteRapport = async (id) => {
        setLoaderDelete(true);
        try {
            const response = await api.delete(`rapports/delete/${id}`);
            setLoaderDelete(false);
            return response.data;
        } catch (error) {
            setLoaderDelete(false);
            console.error(error);
            return null;
        }
    }

    const getPartenaires = async () => {
        setLoader(true);
        try {
            const response = await apiFormData.get("partenaire/");
            setPartenaires(response.data);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            throw console.error(error);
        }
    };

    const addPartenaire = async (name, logo) => {
        setLoader(true);
        try {
            const date = formatDate();
            const formData = new FormData();
            formData.append("name", name);
            formData.append("logo", logo);
            formData.append("date", date)
            const response = await apiFormData.post("partenaire/publication/", formData);
            setLoader(false);
            return response.data.message;
        } catch (error) {
            setLoader(false);
            console.error(error);
            return null;
        }
    };

    const deletePartenaire = async (id) => {
        setLoaderDelete(true);
        try {
            const response = await api.delete(`partenaire/delete/${id}`);
            setLoaderDelete(false);
            return response.data;
        } catch (error) {
            setLoaderDelete(false);
            console.error(error);
            return null;
        }
    };

    const getCommentaires = async (id) => {

        try {

            const response = await api.get(`articles/commentaire/${id}/`);
            setCommentaires(response.data);

        } catch (error) {

            throw console.error(error);
        }
    };

    const getLike = async (id) => {
        try {
            const response = await api.get(`articles/len-like/${id}/`);
            setLikes(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const addLike = async (id) => {
        try {
            const response = await api.post(`articles/add-like/${id}/`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const addComment = async (id, pseudo, content) => {
        try {
            const comment = {
                pseudo: pseudo,
                content: content
            }

            const response = await api.post(`articles/add-commentaire/${id}/`, comment);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        getArticle,
        articles,
        addArticle,
        deleteArticle,
        updateArticle,
        uploadFile,

        getGalerie,
        addGalerie,
        deleteGalerie,
        galeries,

        rapports,
        getRapport,
        addRapport,
        deleteRapport,

        partenaires,
        getPartenaires,
        addPartenaire,
        deletePartenaire,

        commentaires,
        getCommentaires,
        addLike,
        getLike,
        likes,
        addComment,
        loader,
        loaderDelete

    }
}

export default UseFetch;