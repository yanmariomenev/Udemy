import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/components/shared/models/recipe.model';
import { RecipeService } from './recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private fireBaseUrl: string = 'https://course-project-732fe-default-rtdb.europe-west1.firebasedatabase.app/'
  private leadToRecipes = 'recipes.json'
  constructor(private http: HttpClient, private recipesService: RecipeService) { }

  storeRecipes(){
  const recipes = this.recipesService.getRecipes();
      this.http.put(this.fireBaseUrl + this.leadToRecipes, recipes).subscribe(
        response =>{ console.log(response) }
      );
  }

  fetchRecipes(){
  return this.http.get<Recipe[]>(this.fireBaseUrl + this.leadToRecipes)
     .pipe(map(recipes => {
         return recipes.map(recipe => {
         return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
       });
     }),
     tap(recipes => {this.recipesService.setRecipes(recipes);})
     )
  }
}
