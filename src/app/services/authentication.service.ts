import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users:AppUser[]=[];
  authenticatedUser:AppUser | undefined;

  constructor() {
    this.users.push({
      "usId":UUID.UUID(),
      "username":"admin",
      "password":"123",
      "roles":[
        "admin",
        "user"
      ]
    });
    this.users.push({
      "usId":UUID.UUID(),
      "username":"ibrahim_bourzgui",
      "password":"123",
      "roles":[
        "user",
      ]
    });
    this.users.push({
      "usId":UUID.UUID(),
      "username":"bourzgui",
      "password":"123",
      "roles":[
        "user"
      ]
    });
  }


  public login(username:string, password:string) : Observable<AppUser>
  {
    let appuser=this.users.find(u => u.username==username);
    if(!appuser) return throwError(()=> "User not found");
    if(appuser.password!=password) return throwError(()=> "Wrong password");
    return of(appuser);
  }


  public authenticateUser( appuser:AppUser): Observable<boolean>
  {
    this.authenticatedUser=appuser;
  // localStorage = Stoquer un utilisateur dans le stockage locale
  //setItem("authUser",= créer un item nommé authuser
  //JSON.stringify()= transformer un objet javaScript en json
    localStorage.setItem("authUser",JSON.stringify({username:appuser.username, 
      roles:appuser.roles, jwt:"JWT_TOKEN"}));
      return of(true);
  }

  public hasRole (role:string): boolean
  {
    return this.authenticatedUser!.roles.includes(role);
  }


  public isAuthenticated()
  {
    return this.authenticatedUser!=undefined;
  }
  public logout(): Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
