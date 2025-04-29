import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
<<<<<<< HEAD
import { UserModel } from '../models/user.model';
=======
>>>>>>> develop

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private readonly TOKEN_KEY = 'auth_token';
<<<<<<< HEAD
  private readonly USER_KEY = 'auth_user';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials).pipe(
      tap((response: any) => {
        sessionStorage.setItem(this.TOKEN_KEY, response.token);
        sessionStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
=======

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string; rememberMe: boolean }): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials).pipe(
      tap((response: any) => {
        const storage = credentials.rememberMe ? localStorage : sessionStorage;
        storage.setItem(this.TOKEN_KEY, response.token);
>>>>>>> develop
      })
    );
  }

<<<<<<< HEAD
  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): UserModel | null {
    const userJson = sessionStorage.getItem(this.USER_KEY);
    try {
      return userJson ? JSON.parse(userJson) : null;
    } catch (e) {
      console.error('Failed to parse stored user JSON:', e);
      return null;
    }
=======
  isLoggedIn(): boolean {
    return !!(localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY));
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
>>>>>>> develop
  }

}
