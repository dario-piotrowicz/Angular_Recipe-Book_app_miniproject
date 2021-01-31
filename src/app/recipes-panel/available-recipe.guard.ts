import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Injectable({
  providedIn: 'root',
})
export class AvailableRecipeGuard implements CanActivate {
  constructor(private recipesService: RecipesService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean | UrlTree {
    const recipe = this.recipesService.getRecipeById(next.params.id);
    console.log({ recipe });
    if (!recipe) {
      return this.router.createUrlTree(['/recipes']);
    } else {
      return true;
    }
  }
}
