import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginRequest } from 'src/app/entities/auth';
import { environment } from 'src/environments/environment';
 
@Injectable()
export class AuthenticationService {
    private REST_API_SERVER = environment.apiUrl;;
 
    private _token: string;
    
    get token() : string {
        if (this._token === '') {
            return this.getTokenFromStorage()
        } 
        return this._token;
    }

    getTokenFromStorage():string{
        var userStorage = localStorage.getItem('currentUser');
        var currentUser = (userStorage != null) ? JSON.parse(userStorage) : null;
        return currentUser && currentUser.token ? currentUser.token : "";
    }
    
    constructor(private http: HttpClient) {
        // set token if saved in local storage
        this._token = this.getTokenFromStorage();
    }
 
    login(request:LoginRequest): Observable<boolean> {
        const url = this.REST_API_SERVER + "/api/v1/auth/login";

        return this.http.post(url, request).pipe(map((response: any) => {
            const token = response?.data?.token;
            if (token) {
                localStorage.setItem('currentUser', JSON.stringify({ username: request.username, token: token }));
                return true;
            } 
            return false;
        }));
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this._token = "";
        localStorage.removeItem('currentUser');
    }
}
