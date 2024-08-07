import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = `${environment.apiUrl}/auth`;

  isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  authenticatedUser = new BehaviorSubject<any | null>(null);
  authenticatedUser$ = this.authenticatedUser.asObservable();

  tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.authenticatedUser.asObservable();


  getToken(){
    return this.tokenSubject.value;
  }

  setToken(token: string){
    localStorage.setItem("opm_token", token)
  }


  readonly OPM_APP_KEY = "OPM_APP_PROLOGIC"
  private tokenExpirationTimer: any;


  getAuthUser(){
    return this.authenticatedUser.value;
  }

  constructor(private _http: HttpClient,
    private _router: Router,
  ) { }

  login(auth: any) {
    return this._http.post(`${this.baseUrl}/login`, auth).pipe(
      tap((response: any) => {
        // console.log(response)
        const p = response.payload;
        const t = response.accessToken;
        const d = { ...t, ...p };
        // console.log(t)
        this.setToken(t)
        this.saveAuthToLS(d)
        this.isAuthenticated.next(true);
        this.authenticatedUser.next(response.data);
        this._router.navigate(['/sample-page'])
      })
    )
  }
  signup(data: any) {
    return this._http.post<any>(`${this.baseUrl}/register`, data).pipe(
      tap(response => {
      })
    )
  }

  saveAuthToLS(data: any) {
    localStorage.setItem(this.OPM_APP_KEY, JSON.stringify(data))
  }

  loadAuthFromLS(): any | null {
    let auth = localStorage.getItem(this.OPM_APP_KEY);
    if (auth) {
      return JSON.parse(auth);
    }
    return null;
  }

  autoLogin() {
    let auth = this.loadAuthFromLS();
    if (auth != null) {
      this.isAuthenticated.next(true);
      this.authenticatedUser.next(auth);
    }
  }

  logout() {
    this.authenticatedUser.next(null);
    this.isAuthenticated.next(false)
    localStorage.removeItem(this.OPM_APP_KEY);
    this._router.navigateByUrl("/")
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}