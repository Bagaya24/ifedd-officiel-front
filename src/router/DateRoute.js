import ArticlesPage from "../pages/articles/ArticlesPage";
import DetailArticlePage from "../pages/articles/DetailArticlePage";
import GalleryPage from "../pages/gallerie/GalleryPage";
import HomePage from "../pages/home_page/HomePage";
import LoginPage from "../pages/connexion/LoginPage";
import Logout from "../pages/connexion/Logout";
import PublicationArticles from "../pages/publications/articles/PublicationArticles";
import PublicationPhoto from "../pages/publications/images/PublicationPhoto";
import PublicationRapport from "../pages/publications/rapports/PublicationRapport";
import PublicationPartenaire from "../pages/publications/partenaires/PublicationPartenaire";
import ErrorPage from "../pages/error_page/ErrorPage";



export const protectedRoute = [
  { path: "/publication/article", component: PublicationArticles },
  { path: "/publication/photo", component: PublicationPhoto },
  { path: "/publication/rapport", component: PublicationRapport },
  { path: "/publication/partenaire", component: PublicationPartenaire },
];


export const publiqueRoute = [
  { path: "/", component: HomePage },
  { path: "/galleries", component: GalleryPage },
  { path: "/articles", component: ArticlesPage },
  { path: "/article/:id", component: DetailArticlePage },
  { path: "/login", component: LoginPage },
  { path: "/logout", component: Logout },
  { path: "*", component: ErrorPage }
  //  protected route

]