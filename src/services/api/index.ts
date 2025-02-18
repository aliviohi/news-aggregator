import axios from "axios";
import {
  Article,
  NewsAPIResponse,
  GuardianResponse,
  NYTResponse,
  NewsAPIArticle,
  GuardianArticle,
  NYTArticle,
} from "../../types";

const NEWS_API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_APP_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_APP_NYT_API_KEY;

const isLocalhost = (): boolean => {
  return Boolean(
    window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]" ||
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
};

export class NewsService {
  private static instance: NewsService;

  private constructor() {}

  static getInstance(): NewsService {
    if (!NewsService.instance) {
      NewsService.instance = new NewsService();
    }
    return NewsService.instance;
  }

  async fetchFromNewsAPI(
    query?: string,
    category?: string
  ): Promise<Article[]> {
    if (isLocalhost()) {
      const response = await axios.get<NewsAPIResponse>(
        `https://newsapi.org/v2/everything`,
        {
          params: {
            q: query || "",
            category,
            apiKey: NEWS_API_KEY,
          },
        }
      );

      return this.transformNewsAPIResponse(response.data);
    } else {
      console.warn("NewsAPI is only available on localhost for free tier.");
      return this.transformNewsAPIResponse({
        status: "ok",
        totalResults: 0,
        articles: [],
      });
    }
  }

  async fetchFromGuardian(
    query?: string,
    category?: string
  ): Promise<Article[]> {
    const response = await axios.get<GuardianResponse>(
      `https://content.guardianapis.com/search`,
      {
        params: {
          q: query || "",
          section: category,
          "api-key": GUARDIAN_API_KEY,
          "show-fields": "headline,thumbnail,shortUrl,byline,bodyText",
        },
      }
    );

    return this.transformGuardianResponse(response.data);
  }

  async fetchFromNYT(query?: string, category?: string): Promise<Article[]> {
    const response = await axios.get<NYTResponse>(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
      {
        params: {
          q: query || "",
          fq: category ? `news_desk:("${category}")` : "",
          "api-key": NYT_API_KEY,
        },
      }
    );

    return this.transformNYTResponse(response.data);
  }

  private transformNewsAPIResponse(data: NewsAPIResponse): Article[] {
    return data.articles.map((article: NewsAPIArticle) => ({
      id: article.url,
      title: article.title,
      description: article.description || "",
      author: article.author || "Unknown",
      source: article.source.name,
      category: article.category || "General",
      publishedAt: article.publishedAt,
      url: article.url,
      imageUrl: article.urlToImage || undefined,
    }));
  }

  private transformGuardianResponse(data: GuardianResponse): Article[] {
    return data.response.results.map((article: GuardianArticle) => ({
      id: article.id,
      title: article.webTitle,
      description: article.fields?.bodyText?.substring(0, 200) || "",
      author: article.fields?.byline || "The Guardian",
      source: "The Guardian",
      category: article.sectionName,
      publishedAt: article.webPublicationDate,
      url: article.webUrl,
      imageUrl: article.fields?.thumbnail,
    }));
  }

  private transformNYTResponse(data: NYTResponse): Article[] {
    return data.response.docs.map((article: NYTArticle) => ({
      id: article.web_url,
      title: article.headline.main,
      description: article.abstract || article.snippet || "",
      author: article.byline.original || "The New York Times",
      source: "The New York Times",
      category: article.section_name || "General",
      publishedAt: article.pub_date,
      url: article.web_url,
      imageUrl:
        article.multimedia.length > 0
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : undefined,
    }));
  }
}
