import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shoppig-list-panel',
  templateUrl: './shoppig-list-panel.component.html',
  styleUrls: ['./shoppig-list-panel.component.css']
})
export class ShoppigListPanelComponent implements OnInit, OnDestroy {
  public ingredientsList: Ingredient[] = [];
  private ingreditentsListChangeSubscription: Subscription;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    const updateIngredientsList = () => {
      this.ingredientsList = this.shoppingListService.ingredientsList;
    };

    updateIngredientsList();
    this.ingreditentsListChangeSubscription = this.shoppingListService.onIngredientsListChanged.subscribe( () => updateIngredientsList() );
  }

  ngOnDestroy(): void {
    this.ingreditentsListChangeSubscription.unsubscribe();
  }
}
