import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/core/services/shopping-list.service';
import { Ingredient } from '../../shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

 @ViewChild('nameInput', {static:false}) nameInputRef: ElementRef;
 @ViewChild('amountInput', {static:false}) amountInputRef: ElementRef;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
  const ingredientName = this.nameInputRef.nativeElement.value;
  const ingredientAmount = this.amountInputRef.nativeElement.value;
  const newIngredient = new Ingredient(ingredientName, ingredientAmount);
  this.shoppingService.addIngredient(newIngredient);
  }

}
