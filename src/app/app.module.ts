import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from './services/article/article.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EditArticleDetailComponent } from './pages/admin/edit-article-detail/edit-article-detail.component';
import { ModalConfirmUpdateComponent } from './pages/admin/edit-article-detail/modal-confirm-update/modal-confirm-update.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { UploadService } from './services/upload/upload-file.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorComponent } from './components/ckeditor/component/editor.component';
import { AuthenticationService } from './services/auth/authentication.service';
import 'tw-elements';
import { AuthGuard } from './guards';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleDetailComponent,
    EditArticleDetailComponent,
    ModalConfirmUpdateComponent,
    LoginComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    ArticleService,
    NgbActiveModal, 
    UploadService, 
    AuthenticationService, 
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
