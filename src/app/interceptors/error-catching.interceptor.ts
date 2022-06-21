import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, filter} from "rxjs/operators";
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  

        return next.handle(request).pipe(catchError(err => {  
            if (err.status === 401) {  
                this.authenticationService.logout();  
                this.router.navigate(['/admin/login']);  
            }  
  
            return throwError(err);  
        }))  
    }  
}