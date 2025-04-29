import {Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal(false);
  private baseUrl = 'http://localhost:8080/auth';
  userInfo = signal<{ firstName: string; lastName: string; email: string } | null>(null);

  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    const loginData = { email: email, mdp: password };

    return this.http.post<any>(`${this.baseUrl}/connexion`, loginData).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.jeton);
        this.userInfo.set(response.user);
        this.isAuthenticated.set(true);
      }),
      map(() => true),
      catchError(error => {
        console.error('Erreur login', error);
        this.isAuthenticated.set(false);
        return of(false);
      })
    );
  }

  logout(): void {
    this.isAuthenticated.set(false);
    this.userInfo.set(null);
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }


  getUserInfo(): any {
    return this.userInfo;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
