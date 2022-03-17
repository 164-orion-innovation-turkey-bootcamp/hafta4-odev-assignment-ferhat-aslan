import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    var Storeuser:any=localStorage.getItem("user");
    var storedNames = JSON.parse(Storeuser);
    if(storedNames){

      return true;
    }
    else{
      this.router.navigate(['login'])
      return false
    }
  }

}
