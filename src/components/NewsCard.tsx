import { FC } from "react";
import { Article } from "../types";

type NewsCardProps = {
  article: Article;
};

export const NewsCard: FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {article.imageUrl && (
        <img
          className="w-full h-48 object-cover"
          src={article.imageUrl}
          alt={article.title}
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{article.title}</div>
        <p className="text-gray-700 text-base">{article.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {article.source}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {article.category}
        </span>
      </div>
    </div>
  );
};
