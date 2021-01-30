import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { shoppingListPanelComponent } from './shopping-list-panel.component';

const shoppingListPanelRoutes: Routes = [
  {
    path: 'shopping-list',
    component: shoppingListPanelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(shoppingListPanelRoutes)],
  exports: [RouterModule],
})
export class ShoppingListPanelRoutingModule {}
