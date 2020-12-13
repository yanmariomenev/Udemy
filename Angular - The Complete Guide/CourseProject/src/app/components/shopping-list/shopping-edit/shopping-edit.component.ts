import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/core/services/shopping-list.service';
import { Ingredient } from '../../shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static:false}) slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemId: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingListService) { }
  
  ngOnInit(): void {
  this.subscription = this.shoppingService.startedEditing.subscribe(
    (id: number) =>{
    this.editedItemId = id;
    this.editMode = true;
    this.editedItem = this.shoppingService.getIngredientById(id);
    this.slForm.setValue(
      {name: this.editedItem.name, amount: this.editedItem.amount}
      )
    }
  );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
  const value = form.value;
  const newIngredient = new Ingredient(value.name, value.amount);
  if(this.editMode){
    this.shoppingService.updateIngredientById(this.editedItemId, newIngredient)
  }
  else{
    this.shoppingService.addIngredient(newIngredient);
  }
  this.editMode = false;
  form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingService.deleteIngredientById(this.editedItemId);
    this.onClear();
  }

}
