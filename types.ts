export interface Source {
  web: {
    uri: string;
    title: string;
  };
}

export interface NewsArticle {
  title: {
    zh: string;
    en: string;
  };
  summary: {
    zh: string;
    en: string;
  };
  source: string;
}
