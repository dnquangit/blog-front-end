import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { Article } from 'src/app/entities/article';
import { ArticleService } from 'src/app/services/article/article.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  unsubscribe$: Subject<void> = new Subject();
  articles$ = this.articleService.getPublishedArticles();

  articles :Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articles$
      .pipe(filter(data => !!data))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Article[]) => {
        this.articles =
          data.map((article) => {
            article.slug = `article/${slugify(article.title)}/${btoa(article.id)}`;
            return article;
          });
        this.articles.sort((a , b) =>{
          if (a.createDate <= b.createDate) return -1
          return 1
        });
        console.log(this.articles);
      })
      var token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IkFETUlOIiwidXNlcmlkIjoiOThlYzY2YWEtMTNmMi00ZGFlLWE4MmQtMTM0NzY4MmJkMDY1Iiwic3ViIjoiOThlYzY2YWEtMTNmMi00ZGFlLWE4MmQtMTM0NzY4MmJkMDY1IiwiaWF0IjoxNjUwMzU3NTI2LCJleHAiOjE2NTAzNjA1ODZ9.D1BrwNartY4MUEi5t0P3DUE2FdZYwa9xl_obLtIpExY';
      var decoded = jwt_decode(token); 
      console.log(decoded);   
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

function slugify(input :string): string {
  if (!input) return "";

  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
