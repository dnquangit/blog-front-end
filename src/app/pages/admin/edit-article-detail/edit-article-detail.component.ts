import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ArticleDetail, CreateArticleRequest, UpdateArticleRequest } from 'src/app/entities/article';
import { ArticleService } from 'src/app/services/article/article.service';
import { ACTION } from 'src/app/constants/app.constant';
import { ModalConfirmUpdateComponent } from './modal-confirm-update/modal-confirm-update.component';

@Component({
  selector: 'app-edit-article-detail',
  templateUrl: './edit-article-detail.component.html',
  styleUrls: ['./edit-article-detail.component.css']
})

export class EditArticleDetailComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<void> = new Subject();

  public htmlData: string = "";
  action:ACTION = ACTION.CREATE;
  id:string = "";
  
  param$ = this.route.queryParams;

  editArticleForm = new FormGroup( {
    id: new FormControl(''),
		title: new FormControl(''),
    published : new FormControl(''),
		content: new FormControl( '' )
	});

  constructor(private route: ActivatedRoute, 
    private articleService: ArticleService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.route.params
    .pipe(takeUntil(this.unsubscribe$))
    .pipe(
      switchMap((params) => {
        let id = params['id'];
        id = atob(id??'');
        return this.articleService.getArticle(id);
      })
    )
    .subscribe((data : ArticleDetail) => {
      this.action = ACTION.UPDATE;
      this.id = data.id;
      this.editArticleForm.setValue({
        id : data.id,
        title : data.title,
        content : data.content,
        published : data.published
      })
      this.htmlData = data.content;
    })

  }

  public onSubmit(): void {
    console.log("this.htmlContent");
    console.log(this.htmlData);
   
    const valueForm = this.editArticleForm.getRawValue();

    if (this.action === ACTION.CREATE) {
      const createArticleRequest:CreateArticleRequest = {
        title : valueForm['title'],
        content :  this.htmlData,
        published : valueForm['published'],
      }

      this.articleService
        .createArticle(createArticleRequest)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          alert(data);
        });

    } else if (this.action === ACTION.UPDATE) {
     
      const updateArticleRequest:UpdateArticleRequest = {
        id : valueForm['id'],
        title : valueForm['title'],
        content :  this.htmlData,
        published : valueForm['published'],
      }
     
      this.articleService
        .updateArticle(updateArticleRequest.id, updateArticleRequest)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          if (data) {
            this.open("Cập nhật bài viết thành công");
          } else {
            this.open("Cập nhật bài viết thất bại");
          }   
        });
    } 
	}

  open(modal_content: string) {
    const modalRef = this.modalService.open(ModalConfirmUpdateComponent);
    modalRef.componentInstance.modal_content = modal_content;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

