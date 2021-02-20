import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecipesService } from '../services/recipes.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public navbarCollapsed = true;
  public userIsAuthenticated = false;
  private userAuthenticationSubscription: Subscription = null;

  constructor(
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.userAuthenticationSubscription = this.authService.authenticatedUser.subscribe(
      (user) => (this.userIsAuthenticated = !!user)
    );
  }

  public ngOnDestroy(): void {
    this.userAuthenticationSubscription.unsubscribe();
  }

  public onSaveDataHandler(): void {
    this.recipesService.saveRecipes();
  }

  public onFatchDataHandler(): void {
    this.recipesService.loadRecipes();
  }

  public onLogOutHandler(): void {
    this.authService.logOut();
  }
}
