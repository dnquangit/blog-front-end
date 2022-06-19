import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditArticleDetailComponent } from './pages/admin/edit-article-detail/edit-article-detail.component';
import { HomeAdminComponent } from './pages/admin/home/home.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'article/:name/:id', component: ArticleDetailComponent },
  { path: 'admin/home', component: HomeAdminComponent },
  { path: 'admin/edit/article/:name/:id', component: EditArticleDetailComponent },
  { path: 'admin/create/article', component: EditArticleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
