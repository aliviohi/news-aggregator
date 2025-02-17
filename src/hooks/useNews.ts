import { useEffect, useState } from "react";
import { Article, UserPreferences } from "../types";
import { NewsService } from "../services/api";
import { filterArticlesByPreferences } from "../utils/filterArticle";

export const useNews = (preferences: UserPreferences) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  useEffect(() => {
    const applyFilters = () => {
      const filteredArticles = filterArticlesByPreferences(
        allArticles,
        preferences
      );
      setArticles(filteredArticles);
    };

    if (allArticles.length) {
      applyFilters();
    }
  }, [preferences, allArticles]);

  const fetchNews = async (query?: string) => {
    setLoading(true);
    setError(null);

    try {
      const newsService = NewsService.getInstance();
      const results = await Promise.all([
        newsService.fetchFromNewsAPI(query),
        newsService.fetchFromGuardian(query),
        newsService.fetchFromNYT(query),
      ]);

      const fetchedArticles = results.flat();
      setAllArticles(fetchedArticles);
    } catch {
      setError("Failed to fetch news articles");
    } finally {
      setLoading(false);
    }
  };

  return {
    articles,
    loading,
    error,
    fetchNews,
    availableSources: [
      ...new Set(allArticles.map((article) => article.source)),
    ],
    availableCategories: [
      ...new Set(allArticles.map((article) => article.category)),
    ],
    availableAuthors: [
      ...new Set(allArticles.map((article) => article.author)),
    ],
  };
};
