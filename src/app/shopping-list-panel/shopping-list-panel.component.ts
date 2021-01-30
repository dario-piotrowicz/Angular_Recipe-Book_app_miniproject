import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-panel',
  templateUrl: './shopping-list-panel.component.html',
  styleUrls: ['./shopping-list-panel.component.css'],
})
export class shoppingListPanelComponent implements OnInit, OnDestroy {
  public ingredientsList: Ingredient[] = [];
  private ingreditentsListChangeSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    const updateIngredientsList = () => {
      this.ingredientsList = this.shoppingListService.ingredientsList;
    };

    updateIngredientsList();
    this.ingreditentsListChangeSubscription = this.shoppingListService.onIngredientsListChanged.subscribe(
      () => updateIngredientsList()
    );
  }

  ngOnDestroy(): void {
    this.ingreditentsListChangeSubscription.unsubscribe();
  }
}
