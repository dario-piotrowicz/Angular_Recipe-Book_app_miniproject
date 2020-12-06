import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-shoppig-list-panel',
  templateUrl: './shoppig-list-panel.component.html',
  styleUrls: ['./shoppig-list-panel.component.css']
})
export class ShoppigListPanelComponent implements OnInit {
  public IngredientsList: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public onNewIngredientAdded(ingredient: Ingredient): void{
    this.IngredientsList.push(ingredient);
  }

}
