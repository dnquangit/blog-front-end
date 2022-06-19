import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadRequest } from 'src/app/entities/upload';

@Injectable({
  providedIn: 'root',
})

export class UploadService {
  
  private REST_API_SERVER = "http://localhost:10000";

  constructor(private httpClient: HttpClient) { }

  public Upload(request:UploadRequest): Observable<string> {
    console.log(request);
    const url = this.REST_API_SERVER + "/api/v1/upload";
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const formData = new FormData();
    formData.append("file", request.file);
    console.log(formData);
   
    return this.httpClient.post(url, formData).pipe(map((response:any) => {
      console.log("response");
      console.log(response);
      return response.data.url
    }));
  }
  
}