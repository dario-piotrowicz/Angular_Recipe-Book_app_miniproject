import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.css'],
})
export class ShoppingListEditorComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  public addIngredient(form: NgForm): void {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    this.shoppingListService.addItemsToIngredientsList([newIngredient]);
    form.reset();
  }
}
