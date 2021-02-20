import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipesService } from '../services/recipes.service';

@Injectable({
  providedIn: 'root',
})
export class AvailableRecipeGuard implements CanActivate {
  constructor(private recipesService: RecipesService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.recipesService.getRecipeById(next.params.id).pipe(
      map((recipe) => {
        if (!recipe) {
          return this.router.createUrlTree(['/recipes']);
        } else {
          return true;
        }
      })
    );
  }
}
