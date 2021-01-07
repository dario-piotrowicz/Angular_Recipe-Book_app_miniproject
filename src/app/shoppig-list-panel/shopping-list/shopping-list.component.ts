import { Component, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  @Input() list: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  public onEditItem(index: number): void {
    this.shoppingListService.publishIngredientItemSelectedForEditing(index);
  }
}
