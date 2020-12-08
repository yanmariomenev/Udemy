import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/components/shared/models/ingredient.model';
import { Recipe } from 'src/app/components/shared/models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) { }

 private recipes: Recipe[] = [
    new Recipe
    ('Burger',
    'Tasty Burger',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
    [
      new Ingredient('Ground Beef', 250),
      new Ingredient('Patty', 2),
      new Ingredient('Salt', 1),
      new Ingredient('Cheese', 15),
    ]),
    new Recipe
    ('Chicken Soup',
    'Spicy Chicken Soup for winter days',
    'https://i.ytimg.com/vi/o91gT73mQhg/maxresdefault.jpg',
    [
      new Ingredient('Chicken Breast', 250),
      new Ingredient('Chili Pepper', 2),
      new Ingredient('Salt', 1),
      new Ingredient('Farfal', 15),
    ]),
  ];

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipeById(index: number){
  return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
  this.shoppingListService.addIngredients(ingredients);
  }
}


