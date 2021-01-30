import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { shoppingListPanelComponent } from './shopping-list-panel/shopping-list-panel.component';

import { AuthPageComponent } from './auth-page/auth-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'shopping-list',
    component: shoppingListPanelComponent,
  },
  {
    path: 'auth',
    component: AuthPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
