import { useState } from 'react'
import { api, apiFormData } from '../api/Api'

function UseFetch() {
  const [articles, setArticle] = useState([])
  const [galeries, setGalerie] = useState([])
  const [rapports, setRapport] = useState([]) 
  const [partenaires, setPartenaires] = useState([])
  const [commentaires, setCommentaires] = useState([])
  const [loader, setLoader] = useState(false)

  const getArticle = async () => {
    setLoader(true);
    try{
      const response = await api.get("articles/");
      setArticle(response.data)
    }
    catch (error) {
      setLoader(false);
      throw console.error(error);
    }
  }

  const getGalerie=async()=>{
    setLoader(true);
    try {
      const response=await api.get("galerie");
      setGalerie(response.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      throw console.error(error);
    }
  }
  const getRapport = async () => {
    setLoader(true);
    try {
      const response=await apiFormData.get("rapport/");
      setRapport(response.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      throw console.error(error);
    }
  }
    const getPartenaires = async () => {
    setLoader(true);
    try {
      const response=await apiFormData.get("partenaire/");
      setPartenaires(response.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      throw console.error(error);
    }
  }

    const getCommentaires = async (id) => {
  
    try {
    
      const response=await api.get(`articles/commentaire/${id}`);
      setCommentaires(response.data);
      
    } catch (error) {
  
      throw console.error(error);
    }
  }

  return {
    getArticle, 
    articles, 
    getGalerie, 
    galeries, 
    rapports, 
    getRapport,
    partenaires,
    getPartenaires,
    commentaires,
    getCommentaires,
    loader,
    setLoader,

  }
}

export default UseFetch;