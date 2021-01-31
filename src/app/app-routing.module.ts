import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes-panel/recipes-panel.module').then(
        (m) => m.RecipesPanelModule
      ),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list-panel/shopping-list-panel.module').then(
        (m) => m.ShoppingListPanelModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
