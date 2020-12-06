import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.css']
})
export class ShoppingListEditorComponent implements OnInit {
  public newIngredientName: string;
  public newIngredientAmount: number;
  @Output() newIngredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  public addIngredient(): void {
    const newIngredient = new Ingredient(this.newIngredientName, this.newIngredientAmount);
    this.newIngredientAdded.emit(newIngredient);
    this.newIngredientName = null;
    this.newIngredientAmount = null;
  }
}
