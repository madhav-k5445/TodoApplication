import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = "https://localhost:7017/api/Auth";
  private TOKEN_KEY = 'authToken';


  constructor(private http: HttpClient, private router : Router) {}

  login(credentials: { userName: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials )
  }

  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data ,{
      responseType: 'text' as 'json'
    }).pipe(
    
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Authentication error: ", error);

    return throwError(() => new Error(error.error?.message || "Authentication failed"));
  }
}
