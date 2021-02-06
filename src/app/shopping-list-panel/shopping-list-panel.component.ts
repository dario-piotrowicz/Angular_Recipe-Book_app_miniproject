import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-panel',
  templateUrl: './shopping-list-panel.component.html',
  styleUrls: ['./shopping-list-panel.component.css'],
})
export class shoppingListPanelComponent implements OnInit, OnDestroy {
  public ingredientsList$: Observable<Ingredient[]>;
  private ingreditentsListChangeSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientsList$ = this.shoppingListService.ingredientsList$;
  }

  ngOnDestroy(): void {
    this.ingreditentsListChangeSubscription.unsubscribe();
  }
}
