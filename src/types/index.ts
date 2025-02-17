export interface Article {
  id: string;
  title: string;
  description: string;
  author: string;
  source: string;
  category: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
}

export interface NewsSource {
  id: string;
  name: string;
  enabled: boolean;
}

export interface UserPreferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

// News API types
export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

export interface NewsAPIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category?: string;
}

// Guardian API types
export interface GuardianResponse {
  response: {
    status: string;
    total: number;
    results: GuardianArticle[];
  };
}

export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields?: {
    headline: string;
    thumbnail: string;
    shortUrl: string;
    byline: string;
    bodyText: string;
  };
}

// NYT API types
export interface NYTResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface NYTArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section?: string;
  print_page?: string;
  source: string;
  multimedia: Array<{
    url: string;
    type: string;
    subtype: string;
    caption: string;
    height: number;
    width: number;
  }>;
  headline: {
    main: string;
    kicker?: string;
    content_kicker?: string;
    print_headline?: string;
    name?: string;
    seo?: string;
    sub?: string;
  };
  byline: {
    original: string | null;
    person: Array<{
      firstname: string;
      middlename: string | null;
      lastname: string;
      qualifier: string | null;
      role: string;
      organization: string;
    }>;
    organization: string | null;
  };
  pub_date: string;
  section_name: string;
}
