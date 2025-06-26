import { useState } from 'react'

function UseFetch() {
  const [articles, setArticle] = useState()
  const [galeries, setGalerie] = useState()
  const [rapports, setRapport] = useState() 

  const getArticle = async () => {
    const response = await fetch("http://127.0.0.1:8000/articles")
    if (response.ok) {
      setArticle(response.json().then((d) => d))
    }
  }

  const getGalerie = async () => {
    const response = await fetch("http://127.0.0.1:8000/galerie")
    
    if (response.ok) {
      setGalerie(response.json().then((d) => d))
      
    }
  }
 
  const getRapport = async () => {
    const response = await fetch("http://127.0.0.1:8000/rapports")
    if (response.ok) {
      setRapport(response.json().then((d) => d))
    }
  }

  return {
    getArticle, 
    articles, 
    getGalerie, 
    galeries, 
    rapports, 
    getRapport
  }
}

export default UseFetch;