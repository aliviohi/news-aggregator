import { FC, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { NewsCard } from "./components/NewsCard";
import { useNews } from "./hooks/useNews";
import { UserPreferences } from "./types";
import { PreferencesPanel } from "./components/PreferencesPanel";

const App: FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    sources: [],
    categories: [],
    authors: [],
  });

  const {
    articles,
    loading,
    error,
    fetchNews,
    availableSources,
    availableCategories,
    availableAuthors,
  } = useNews(preferences);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">News Aggregator</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside>
          <PreferencesPanel
            preferences={preferences}
            onPreferencesChange={setPreferences}
            availableSources={availableSources}
            availableCategories={availableCategories}
            availableAuthors={availableAuthors}
          />
        </aside>

        <main className="md:col-span-3">
          <SearchBar onSearch={fetchNews} />

          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
