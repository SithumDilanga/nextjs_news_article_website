export interface NewsArticle {
  title: string,
  author: string,
  description: string,
  url: string,
  urlToImage?: string,
  publishedAt: string,
  content: string,
}

export interface NewsResponse {
  articles: NewsArticle[],
}