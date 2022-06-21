import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadRequest } from 'src/app/entities/upload';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root',
})

export class UploadService {
  
  private REST_API_SERVER = environment.apiUrl;

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  public Upload(request:UploadRequest): Observable<string> {
    const url = this.REST_API_SERVER + "/api/v1/upload";
    
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authenticationService.token
      })
    };

    const formData = new FormData();
    formData.append("file", request.file);
   
    return this.httpClient.post(url, formData, httpOptions).pipe(map((response:any) => {
      return response?.data?.url
    }));
  }
  
}