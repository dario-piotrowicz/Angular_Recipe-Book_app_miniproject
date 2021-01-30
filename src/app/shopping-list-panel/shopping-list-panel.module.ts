import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingListPanelRoutingModule } from './shopping-list-panel-routing.module';

import { shoppingListPanelComponent } from './shopping-list-panel.component';
import { ShoppingListEditorComponent } from './shopping-list-editor/shopping-list-editor.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@NgModule({
  declarations: [
    shoppingListPanelComponent,
    ShoppingListComponent,
    ShoppingListEditorComponent,
  ],
  imports: [CommonModule, FormsModule, ShoppingListPanelRoutingModule],
})
export class ShoppingListPanelModule {}
