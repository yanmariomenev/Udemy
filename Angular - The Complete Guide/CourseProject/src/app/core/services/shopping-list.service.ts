import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/components/shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

 private ingredients: Ingredient[] = [new Ingredient('Salt', 1)];

  constructor() { }

  getIngredients(){
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]){
  this.ingredients.push(...ingredients)
  }

}
