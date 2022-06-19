export interface Article {
  id: string,
  title: string,
  createDate: Date,
  order: number,
  slug: string,
}

export interface ArticleDetail {
  id: string,
  title: string,
  content: string,
  createDate: Date,
  lastModifiedDate: Date,
  published: boolean,
  order: number
}

export interface UpdateArticleRequest {
  id: string,
  title: string,
  content: string,
  published: boolean,
}

export interface CreateArticleRequest {
  title: string,
  content: string,
  published: boolean,
}

export interface ArticleResponse {
  id: string
}