import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/components/shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
//  ingredientsChanged = new Subject<Ingredient[]>();
 startedEditing = new Subject<number>()
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

  getIngredientById(id: number){
  return this.ingredients[id];
  }

  updateIngredientById(id: number, newIngredient: Ingredient){
  this.ingredients[id] = newIngredient;
  // this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredientById(id: number){
  this.ingredients.splice(id, 1);
  }

}
