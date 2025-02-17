import { UserPreferences } from "../types";

type PreferencesPanelProps = {
  preferences: UserPreferences;
  onPreferencesChange: (newPreferences: UserPreferences) => void;
  availableSources: string[];
  availableCategories: string[];
  availableAuthors: string[];
};

export const PreferencesPanel: React.FC<PreferencesPanelProps> = ({
  preferences,
  onPreferencesChange,
  availableSources,
  availableCategories,
  availableAuthors,
}) => {
  const handleSourceToggle = (source: string) => {
    const newSources = preferences.sources.includes(source)
      ? preferences.sources.filter((s) => s !== source)
      : [...preferences.sources, source];

    onPreferencesChange({
      ...preferences,
      sources: newSources,
    });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = preferences.categories.includes(category)
      ? preferences.categories.filter((c) => c !== category)
      : [...preferences.categories, category];

    onPreferencesChange({
      ...preferences,
      categories: newCategories,
    });
  };

  const handleAuthorToggle = (author: string) => {
    const newAuthors = preferences.authors.includes(author)
      ? preferences.authors.filter((a) => a !== author)
      : [...preferences.authors, author];

    onPreferencesChange({
      ...preferences,
      authors: newAuthors,
    });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <h3 className="font-bold mb-2">Sources</h3>
        <div className="space-y-2">
          {availableSources.map((source) => (
            <label key={source} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.sources.includes(source)}
                onChange={() => handleSourceToggle(source)}
                className="form-checkbox"
              />
              <span>{source}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2">Categories</h3>
        <div className="space-y-2">
          {availableCategories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="form-checkbox"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2">Authors</h3>
        <div className="space-y-2">
          {availableAuthors.map((author) => (
            <label key={author} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.authors.includes(author)}
                onChange={() => handleAuthorToggle(author)}
                className="form-checkbox"
              />
              <span>{author}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
