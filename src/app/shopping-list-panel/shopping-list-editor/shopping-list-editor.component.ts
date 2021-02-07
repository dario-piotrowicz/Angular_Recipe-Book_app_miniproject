import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.css'],
})
export class ShoppingListEditorComponent implements OnInit, OnDestroy {
  private itemSelectedSubscription: Subscription;
  public editing = false;
  @ViewChild('form') form: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.itemSelectedSubscription = this.shoppingListService.selectedIngredientForEditing
      .pipe(tap((selectedIngredient) => (this.editing = !!selectedIngredient)))
      .subscribe((selectedIngredient) => {
        const resetObj = selectedIngredient ? { ...selectedIngredient } : {};
        if (this.form) {
          this.form.reset(resetObj);
        }
      });
  }

  ngOnDestroy(): void {
    this.itemSelectedSubscription.unsubscribe();
    this.shoppingListService.unselectIngredientForEditing();
  }

  public addOrEditIngredient(): void {
    const newIngredient = new Ingredient(
      this.form.value.name,
      this.form.value.amount
    );
    if (this.editing) {
      this.shoppingListService.updateSelectedIngredient(newIngredient);
      this.shoppingListService.unselectIngredientForEditing();
    } else {
      this.shoppingListService.addItemsToIngredientsList([newIngredient]);
    }
    this.clearForm();
  }

  public clearForm(): void {
    this.form.reset();
    this.editing = false;
    this.shoppingListService.unselectIngredientForEditing();
  }

  public deleteSelectedItem(): void {
    this.shoppingListService.deletetSelectedIngredient();
    this.clearForm();
  }
}
