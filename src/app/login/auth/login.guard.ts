import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const userType = this.authService.getUserType();
      if (userType === 'Admin') {
        this.router.navigate(['/dashboard/dashboard']);
      } else if (userType === 'Screen') {
        this.router.navigate(['/screens/screens']);
      } else {
        this.router.navigate(['/dashboard/dashboard']);
      }
      return false;
    }
    return true;
  }
  
}
