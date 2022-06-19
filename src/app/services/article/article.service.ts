import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, ArticleDetail, ArticleResponse, CreateArticleRequest, UpdateArticleRequest } from 'src/app/entities/article';

@Injectable({
  providedIn: 'root',
})

export class ArticleService {
  
  private REST_API_SERVER = "http://localhost:10000";

  constructor(private httpClient: HttpClient) { }
  
  public getPublishedArticles(): Observable<Article[]> {

    const url = this.REST_API_SERVER + "/api/v1/post/find?published=true";
    return this.httpClient.get(url).pipe(map((response: any) => {
      const articleJson = response['data'];
      console.log(articleJson);
      const articles: Article[] = [];

      for (let index = 0; index < articleJson.length; index++) {
        const element = articleJson[index];
        console.log(element);
        const article:Article = {
          id : element["id"],
          title : element["title"],
          createDate : element["created_at"],
          order : index,
          slug : ""
        };
        articles.push(article);
      }

      console.log(articles);
      return articles;

    }));

  }

  public getArticle(id:string): Observable<ArticleDetail> {

    const url = this.REST_API_SERVER + "/api/v1/post/find/" + id;
    return this.httpClient.get(url).pipe(map((response: any) => {
      const articleJson = response['data'];
      const result:ArticleDetail = {
        id : articleJson["id"],
        title : articleJson["title"],
        content : articleJson["content"],
        createDate : articleJson["created_at"],
        lastModifiedDate : articleJson["updated_at"],
        published : articleJson["published"],
        order : 1,
      };
      console.log(result);
      return result;
    }));

  }

  public updateArticle(id:string, article:UpdateArticleRequest): Observable<boolean> {

    const url = this.REST_API_SERVER + "/api/v1/post/" + id;
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.put(url, article, {headers}).pipe(map((data:any) => {
      return true
    }));
  }

  public createArticle(article:CreateArticleRequest): Observable<ArticleResponse> {

    const url = this.REST_API_SERVER + "/api/v1/post";
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.post(url, article, {headers}).pipe(map((articleJson:any) => {
      return {
        id : articleJson["id"]
      } as ArticleResponse;
    }));
  }
  
}