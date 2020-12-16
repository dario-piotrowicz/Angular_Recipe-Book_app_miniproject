import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shoppig-list-panel',
  templateUrl: './shoppig-list-panel.component.html',
  styleUrls: ['./shoppig-list-panel.component.css']
})
export class ShoppigListPanelComponent implements OnInit {
  public ingredientsList: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    const updateIngredientsList = () => {
      this.ingredientsList = this.shoppingListService.ingredientsList;
    };

    updateIngredientsList();
    this.shoppingListService.onIngredientsListChanged.subscribe( () => updateIngredientsList() );
  }
}
