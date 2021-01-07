import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.css'],
})
export class ShoppingListEditorComponent implements OnInit, OnDestroy {
  private itemSelectedSubscription: Subscription;
  public indexSelectedForEditing: number = -1;
  @ViewChild('form') form: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.itemSelectedSubscription = this.shoppingListService.onIngredientItemSelectedForEditing.subscribe(
      (index) => {
        this.indexSelectedForEditing = index;
        const selectedIngredient = this.shoppingListService.getIngredientAt(
          index
        );
        this.form.reset({
          ...selectedIngredient,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.itemSelectedSubscription.unsubscribe();
  }

  public addOrEditIngredient(): void {
    const newIngredient = new Ingredient(
      this.form.value.name,
      this.form.value.amount
    );
    if (this.indexSelectedForEditing < 0) {
      this.shoppingListService.addItemsToIngredientsList([newIngredient]);
    } else {
      this.shoppingListService.setIngredientAt(
        this.indexSelectedForEditing,
        newIngredient
      );
    }
    this.clearForm();
  }

  public clearForm(): void {
    this.form.reset();
    this.indexSelectedForEditing = -1;
  }
}
