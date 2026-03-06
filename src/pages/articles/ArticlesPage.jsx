import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import TitleSection from "../../components/TitleSection";
import ArticleCard from "../../components/articles/ArticleCard";
import UseFetch from "../../hooks/useFecth";
import Spinner from "../../components/Spinner";
import MFooter from "../../components/MFooter";

export default function ArticlesPage() {
    const [page, setPage] = useState(0);
    const { articles, getArticle, loader } = UseFetch();
    const [searchArticles, setSearchArticles] = useState('');
    const articlesPerPage = 12;

    useEffect(() => {
        getArticle();
    }, []);

    // Réinitialiser la page quand on cherche
    useEffect(() => {
        setPage(0);
    }, [searchArticles]);

    // Filtrer les articles
    const filteredArticles = articles
        ?.filter((article) =>
            article?.title?.toLowerCase().includes(searchArticles.toLowerCase())
        ) || [];

    // Paginer les articles filtrés
    const startIndex = page * articlesPerPage;
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);
    const hasPrev = page > 0;
    const hasNext = startIndex + articlesPerPage < filteredArticles.length;

    return (
        <div className="w-full">
            <NavBar />
            <div className="flex justify-center mb-4">
                <div className="w-9/12 mt-20">
                    <TitleSection
                        title={"ARTICLES"}
                    />
                    <div className="mb-6">
                        <input
                            type="text"
                            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#1769aa] focus:outline-none transition"
                            placeholder="Chercher un article..."
                            value={searchArticles}
                            onChange={(e) => setSearchArticles(e.target.value)}
                        />
                        {searchArticles && (
                            <p className="text-sm text-gray-600 mt-2">
                                {paginatedArticles.length} article(s) trouvé(s)
                            </p>
                        )}
                    </div>
                    {loader ? <Spinner /> : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {paginatedArticles.map((article, index) => (
                                <ArticleCard
                                    key={index}
                                    id={article?.id}
                                    image={import.meta.env.VITE_CLOUD_URL_FILE + article?.image}
                                    title={article?.title}
                                    description={article?.content}

                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-between mt-4">

                        <button
                            className="bg-white border-2 border-[#1769aa] p-2 rounded-lg text-[#1769aa] font-medium cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                            disabled={!hasPrev}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Précédent
                        </button>


                        <button
                            className="bg-[#1769aa] py-2 px-5 rounded-lg text-white font-medium cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                            disabled={!hasNext}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Suivant
                        </button>
                    </div>

                </div>
            </div>

            <MFooter />
        </div>
    )
}