import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.css']
})
export class ShoppingListEditorComponent implements OnInit {
  public newIngredientName: string;
  public newIngredientAmount: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  public addIngredient(): void {
    const newIngredient = new Ingredient(this.newIngredientName, this.newIngredientAmount);
    this.shoppingListService.addItemsToIngredientsList([newIngredient]);
    this.newIngredientName = null;
    this.newIngredientAmount = null;
  }
}
