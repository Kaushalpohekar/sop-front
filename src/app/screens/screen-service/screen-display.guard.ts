import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class ScreenDisplayGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const paramValue = route.params['screenId']; // Change 'id' to the actual parameter name in your route
    const isNumeric = /^\d+$/.test(paramValue);

    if (isNumeric) {
      return true; // Allow navigation if the parameter is a number
    } else {
      console.log('Invalid parameter. Redirecting to another page.');
      this.router.navigate(['/screen']); // Redirect to another page if the parameter is not a number
      return false;
    }
  }
}