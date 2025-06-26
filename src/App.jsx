import { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import { CssBaseline } from '@mui/material'
import Header from './components/appbar'
import { Accueil } from './pages/accueil'
import { Photos } from './pages/photos'
import { RapportsEtPolitiques } from './pages/rapportsEtPolitiques'
import { Articles} from './pages/articles'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PublicationRapports from './pages/publicationRapports'
import PublicationArticles from './pages/publicationArticles'
import PublicationsImages from './pages/publicationsImages'
import PublicationsPartenaires from './pages/publicationPartenaires'
import { ArticleDetail } from './pages/articleDetail'
import { Login } from './pages/login'
import Deconexion from './deconexion'
import { API_BASE, safeFetch } from './hooks/config'




const router = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
    children:[
      {
        path:"",
        loader: async () => {
          const [articles, partenaires, rapports] = await Promise.all([
            safeFetch(`${API_BASE}/articles/`),
            safeFetch(`${API_BASE}/partenaire/`),
            safeFetch(`${API_BASE}/rapport/`),
          ]);
          return { articles, partenaires, rapports };
        },
        element: <Accueil/>
      },
      {
        path:"photos",
        loader: async () => await fetch(`${API_BASE}/galerie/see`),
        element: <Photos/>
      },
      {
        path:"rapports et politiques",
        loader: async () =>  await fetch(`${API_BASE}/rapport/`),
        element: <RapportsEtPolitiques/>
      },
      {
        path: "articles",
        
        element: <Outlet/>,
        children: [
          {
            path: "",
            loader: async () => await fetch(`${API_BASE}/articles/`),
            element: <Articles/>
          },
          {
            path: ":id",
            loader: async () => await fetch(`${API_BASE}/articles/`),
            element: <ArticleDetail/>
          }
        ]
      },
      {
        path: "publication",
        element: <>
        <Outlet/>
        </>,
        children: [
          {
            path: "articles",
            element: <PublicationArticles/>
          }
          ,
          {path: "rapports",
            element: <PublicationRapports/>
          },
          {
            path: "images",
            element: <PublicationsImages/>
          },
          {
            path: "partenaires",
            element: <PublicationsPartenaires/> 
          }
    ]
  }]
  },
  {
    path: "/connexion",
    element: <Login/>
  },
  {
    path: "/deconnexion",
    element: <Deconexion/>
  }
])

function App() {
 
  return (
    <>
    <CssBaseline/>
    <RouterProvider router={router}/>  
    </>
  )
}

export default App
