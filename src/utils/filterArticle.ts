import { Article, UserPreferences } from "../types";

export const filterArticlesByPreferences = (
  articles: Article[],
  preferences: UserPreferences
): Article[] => {
  return articles.filter((article) => {
    // If no preferences are set, show all articles
    if (
      preferences.sources.length === 0 &&
      preferences.categories.length === 0 &&
      preferences.authors.length === 0
    ) {
      return true;
    }

    const matchesSource =
      preferences.sources.length === 0 ||
      preferences.sources.includes(article.source);

    const matchesCategory =
      preferences.categories.length === 0 ||
      preferences.categories.includes(article.category);

    const matchesAuthor =
      preferences.authors.length === 0 ||
      preferences.authors.includes(article.author);

    return matchesSource && matchesCategory && matchesAuthor;
  });
};
