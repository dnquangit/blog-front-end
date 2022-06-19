import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ArticleDetail } from 'src/app/entities/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  title: string = "";

  param$ = this.route.queryParams;
  public htmlData: string = "";

  constructor(private route: ActivatedRoute, 
    private articleService: ArticleService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          let id = params['id'];
          id = atob(id??'');
          return this.articleService.getArticle(id);
        })
      )
      .subscribe((data : ArticleDetail) => {
        this.title = data.title;
        this.htmlData = data.content;
      })
  }

}
