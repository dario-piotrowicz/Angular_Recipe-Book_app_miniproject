import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
    this.itemSelectedSubscription = this.shoppingListService.indexOfIngredientItemSelectedForEditing
      .pipe(filter((index: number) => index > -1))
      .subscribe((index: number) => {
        this.indexSelectedForEditing = index;
        this.shoppingListService
          .getIngredientAt(index)
          .subscribe((selectedIngredient) => {
            this.form.reset({
              ...selectedIngredient,
            });
          });
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
    if (this.indexSelectedForEditing < 0) {
      this.shoppingListService.addItemsToIngredientsList([newIngredient]);
    } else {
      this.shoppingListService.updateIngredientAt(
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

  public deleteSelectedItem(): void {
    this.shoppingListService.deletetIngredientAt(this.indexSelectedForEditing);
    this.clearForm();
  }
}
