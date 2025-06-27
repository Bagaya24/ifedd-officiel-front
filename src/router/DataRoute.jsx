// router/DataRoute.jsx
import { Accueil } from "../pages/accueil";
import { Photos } from "../pages/photos";
import { RapportsEtPolitiques } from "../pages/rapportsEtPolitiques";
import { Articles } from "../pages/articles";
import { ArticleDetail } from "../pages/articleDetail";
import PublicationArticles from "../pages/publicationArticles";
import PublicationRapports from "../pages/publicationRapports";
import PublicationsImages from "../pages/publicationsImages";
import PublicationsPartenaires from "../pages/publicationPartenaires";
import PageError from "../pages/error/PageError";


export const publicRoutes = [
  { path: "/", component: <Accueil /> },
  { path: "/photos", component: <Photos /> },
  { path: "/rapports et politiques", component: <RapportsEtPolitiques /> },
  { path: "/articles", component: <Articles /> },
  { path: "/articles/:id", component: <ArticleDetail /> },
  { path: "*", component: <PageError/> }
];

export const protectedRoutes = [
  { path: "/publication/articles", component: <PublicationArticles /> },
  { path: "/publication/rapports", component: <PublicationRapports /> },
  { path: "/publication/images", component: <PublicationsImages /> },
  { path: "/publication/partenaires", component: <PublicationsPartenaires /> }
];
