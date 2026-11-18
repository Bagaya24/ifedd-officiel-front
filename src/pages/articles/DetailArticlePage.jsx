import { useParams, useNavigate } from "react-router-dom";
import ArticleCard from "../../components/articles/ArticleCard";
import NavBar from "../../components/NavBar";
import UseFetch from "../../hooks/useFecth";
import { useEffect, useState } from "react";
import TitleSection from "../../components/TitleSection";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import Alert from "../../components/Alert";
import MFooter from "../../components/MFooter";
import Spinner from "../../components/Spinner";
import Seo from "../../hooks/usePageSEO";
import { ShareIcon } from "@heroicons/react/24/outline";

export default function DetailArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    articles,
    getArticle,
    addLike,
    getLike,
    getCommentaires,
    commentaires,
    addComment,
    loader,
  } = UseFetch();
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);

  useEffect(() => {
    void getArticle();
    if (id) {
      void getCommentaires(id);
    }
  }, [id]);

  useEffect(() => {
    // Check localStorage for like status when component mounts or id changes
    const likedArticles = JSON.parse(
      localStorage.getItem("liked_articles") || "[]",
    );
    if (id && likedArticles.includes(id.toString())) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [id]);

  useEffect(() => {
    void getLike(id).then((data) => {
      if (data?.like) {
        setLocalLikes(data.like);
      }
    });
  }, [id]);

  const liked = async (articleId) => {
    if (!articleId) return;
    const strId = articleId.toString();
    const likedArticles = JSON.parse(
      localStorage.getItem("liked_articles") || "[]",
    );

    if (isLiked) {
      // User is unliking
      const newLikedArticles = likedArticles.filter((item) => item !== strId);
      localStorage.setItem("liked_articles", JSON.stringify(newLikedArticles));
      // Update local likes immediately
      setLocalLikes((prev) => Math.max(0, prev - 1));
      await addLike(articleId);
      setIsLiked(false);
    } else {
      // User is liking
      if (!likedArticles.includes(strId)) {
        likedArticles.push(strId);
        localStorage.setItem("liked_articles", JSON.stringify(likedArticles));
      }
      // Update local likes immediately
      setLocalLikes((prev) => prev + 1);
      await addLike(articleId);
      setIsLiked(true);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !pseudo.trim()) return;

    const result = await addComment(id, pseudo, newComment);
    if (result?.message === "Commentaire ajouté avec succès") {
      setAlert({ message: result?.message, type: "success" });
    } else {
      setAlert({ message: result?.message, type: "error" });
    }
    if (result) {
      setNewComment("");
      setPseudo("");
      await getCommentaires(id);
    }
  };

  const cleanQuillText = (htmlString) => {
    if (!htmlString) return "";

    const doc = new DOMParser().parseFromString(htmlString, "text/html");

    let text = doc.body.textContent || "";

    return text.replaceALL(/\u00a0/g, " ").trim();
  };

  const article_principale = articles.find(
    (article) => article.id.toString() === id,
  );
  const autre_articles = articles.filter(
    (article) => article.id.toString() !== id,
  );

  const description = cleanQuillText(article_principale?.content);
  const titles = article_principale?.title;

  const handleShare = async () => {
    if (!article_principale.image) {
      setAlert({ message: "Données de l'article manquantes", type: "error" });
      return;
    }

    const url = window.location.href;
    try {
      // 1. Préparer d'abord les données textuelles (pour éviter le undefined)
      const shareData = {
        title: titles || "Titre de l'article",
        text: description?.substring(0, 150) + "...",
        url: url,
      };

      const response = await fetch(
        "https://api.akiba.ifedd-rdc.org/cEjDKc-Logo.png",
      );
      if (!response.ok) throw new Error("Erreur image");

      const blob = await response.blob();
      const file = new File([blob], "article-image.jpg", { type: blob.type });

      // 2. Vérifier si on peut partager le fichier
      if (navigator.canShare?.({ files: [file] })) {
        // On ajoute le fichier aux données de base
        await navigator.share({
          //   title: titles,
          text: titles + "\n \n" + description?.substring(0, 150) + "...",
          url: url,
          files: [file],
        });
      } else {
        // On partage uniquement le texte et l'URL
        await navigator.share(shareData);
      }
    } catch (err) {
      console.error("Erreur de partage:", err);
      await navigator.clipboard.writeText(url);
      setAlert({ message: "Lien copié !", type: "success" });
    }
  };

  return (
    <div className="w-full">
      <Seo
        title={article_principale?.title}
        ogtitle={article_principale?.title}
        description={description.substring(0, 150) + "..."}
        ogDescription={description.substring(0, 150) + "..."}
        ogImage={
          import.meta.env.VITE_CLOUD_URL_FILE + article_principale?.image
        }
        ogType="article"
        canonicalUrl={window.location.href}
      />
      <NavBar />
      <div className="flex justify-center mt-24 mb-8">
        <div className="w-11/12 ">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-[#1769aa] text-white rounded-lg hover:bg-blue-800 transition flex items-center gap-2 text-sm font-semibold"
          >
            ← Retour
          </button>

          {loader ? (
            <Spinner loader={loader} />
          ) : (
            <>
              <TitleSection title={`${article_principale?.title}`} />
              <div className="flex md:flex-row flex-col w-full gap-4">
                {/* Article principal */}
                <div className="md:w-8/12">
                  <div className="w-full lg:h-150 md:h-100 h-50 relative bg-cover overflow-hidden rounded-t-xl">
                    <img
                      src={
                        import.meta.env.VITE_CLOUD_URL_FILE +
                        article_principale?.image
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 h-auto min-h-100">
                    <p className="text-base text-gray-500 font-semibold">
                      {article_principale?.created_at &&
                        new Date(
                          article_principale?.created_at,
                        ).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 flex gap-1">
                      <UserCircleIcon className="w-5 h-5" />{" "}
                      <span className="text-base font-semibold">
                        {article_principale?.author}
                      </span>
                    </p>
                    <h2 className="md:text-3xl text-2xl text-gray-700 text-center font-bold mb-2">
                      {article_principale?.title}
                    </h2>

                    <div className="h-0.5 w-full bg-gray-200 rounded-full mt-2 mb-2" />

                    <div
                      className={`relative ${!isExpanded ? "max-h-50 overflow-hidden" : ""} transition-all duration-300`}
                    >
                      <div
                        className="article-content mb-4"
                        dangerouslySetInnerHTML={{
                          __html: article_principale?.content,
                        }}
                      />
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-white to-transparent"></div>
                      )}
                    </div>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-blue-500 hover:text-[#1769aa] font-semibold mt-2 focus:outline-none cursor-pointer"
                    >
                      {isExpanded ? "Lire moins" : "Lire la suite"}
                    </button>
                  </div>
                  {/* Like et partage */}
                  <div className="flex justify-end items-center gap-4 mr-4 mb-4">
                    {/* Bouton Partager */}
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition cursor-pointer"
                    >
                      <ShareIcon className="w-6 h-6" />
                      <span className="font-semibold text-sm">Partager</span>
                    </button>

                    {/* Bouton Like */}
                    <div className="flex items-center gap-1">
                      <HeartIcon
                        className={`w-9 h-9 cursor-pointer transition ${isLiked ? "text-red-500" : "text-gray-200 hover:text-red-200"}`}
                        onClick={() => liked(article_principale?.id)}
                      />
                      <span className="font-bold text-gray-600">
                        {localLikes}
                      </span>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-8 border-t border-gray-300 pt-8">
                    {alert.message && (
                      <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert({ message: "", type: "" })}
                      />
                    )}
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      Commentaires
                    </h3>

                    {/* Add Comment Form */}
                    <form
                      onSubmit={handleCommentSubmit}
                      className="mb-8 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="mb-4">
                        <label
                          htmlFor="pseudo"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Pseudo
                        </label>
                        <input
                          type="text"
                          id="pseudo"
                          className="w-full p-2 bg-white placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Votre nom ou pseudo"
                          value={pseudo}
                          onChange={(e) => setPseudo(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="comment"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Message
                        </label>
                        <textarea
                          id="comment"
                          className="w-full p-4 bg-white placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                          rows="3"
                          placeholder="Votre commentaire..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end mt-2">
                        <button
                          type="submit"
                          disabled={!newComment.trim() || !pseudo.trim()}
                          className="px-6 py-2 bg-[#1769aa] text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                          Envoyer
                        </button>
                      </div>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-6">
                      {commentaires && commentaires.length > 0 ? (
                        commentaires.map((comment) => (
                          <div
                            key={comment?.pseudo}
                            className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg uppercase">
                                  {(comment.pseudo || "U").charAt(0)}
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-800 block leading-tight">
                                    {comment.pseudo || "Utilisateur"}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {comment.created_at &&
                                      new Date(
                                        comment.created_at,
                                      ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 ml-13 mt-1 pl-1">
                              {comment.message || comment.content}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic text-center">
                          Aucun commentaire pour le moment.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Articles secondaire */}

                <div className="md:w-4/12 w-full md:overflow-y-auto overflow-x-auto flex md:flex-col flex-row md:h-360 h-auto md:space-y-2 space-x-4 pb-2">
                  {autre_articles.map((article) => (
                    <ArticleCard
                      key={article?.id}
                      id={article?.id}
                      description={article?.content}
                      image={
                        import.meta.env.VITE_CLOUD_URL_FILE + article?.image
                      }
                      title={article?.title}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <MFooter />
    </div>
  );
}
