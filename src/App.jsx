import { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider, useRouteError } from 'react-router'
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
    errorElement: <PageError/>,
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
        loader: async () => {
          const [photos] = await Promise.all([
            safeFetch(`${API_BASE}/galerie/see`)
          ]);
          return {photos};
        },
        element: <Photos/>
      },
      {
        path:"rapports et politiques",
        loader: async () => {
          const [rapports] = await Promise.all([
            safeFetch(`${API_BASE}/rapport/`)
          ]);
          return {rapports};
        },
        element: <RapportsEtPolitiques/>
      },
      {
        path: "articles",
        
        element: <Outlet/>,
        children: [
          {
            path: "",
            loader: async () => {
              const [articles] = await Promise.all([
                safeFetch(`${API_BASE}/articles/`)
              ]);
              return { articles};
            },
            element: <Articles/>
          },
          {
            path: ":id",
            loader: async () =>{
              const [articles] = await Promise.all([
              safeFetch(`${API_BASE}/articles/`)
              ]);
              return { articles };
            },
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

function PageError() {
  const  error = useRouteError();
  console.error("Page Error:", error);
  return (
    <div>
      <h1>Erreur</h1>
      <p>{error?.error?.toString ?? error?.toString}</p>
    </div>
  );
}

function App() {
 
  return (
    <>
    <CssBaseline/>
    <RouterProvider router={router}/>  
    </>
  )
}

export default App
