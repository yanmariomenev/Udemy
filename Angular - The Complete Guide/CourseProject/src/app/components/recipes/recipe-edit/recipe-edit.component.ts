import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from 'src/app/core/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onRemoveAllIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}


// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { ActivatedRoute, Params } from '@angular/router';
// import { RecipeService } from 'src/app/core/services/recipe.service';

// @Component({
//   selector: 'app-recipe-edit',
//   templateUrl: './recipe-edit.component.html',
//   styleUrls: ['./recipe-edit.component.css']
// })
// export class RecipeEditComponent implements OnInit {

//   id: number;
//   editMode: boolean = false;
//   recipeForm: FormGroup;

//   get ingredientsControls() {
//     return (this.recipeForm.get('ingredients') as FormArray).controls;
//   }

//   get controls() { // a getter!
//     return (this.recipeForm.get('ingredients') as FormArray).controls;
//   }

//   constructor(private route: ActivatedRoute,
//     private recipeService: RecipeService,
//     private formBuilder: FormBuilder) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(
//       (params: Params) => {
//       this.id = +params['id'];
//       this.editMode = params['id'] != null;
//       this.initForm();
//       }
//     );
//   }
  
//   onSubmit(){
//     console.log(this.recipeForm)
//   }

 
  
//   private initForm(){
//   let recipeName: string = '';
//   let recipeImagePath: string = '';
//   let recipeDescription: string = '';
//   let recipeIngredients = new FormArray([]);

//   if(this.editMode){
//     const recipe = this.recipeService.getRecipeById(this.id);
//     recipeName = recipe.name;
//     recipeImagePath = recipe.imagePath;
//     recipeDescription = recipe.description;

//     if (recipe['ingredients']) {
//       for(let ingredient of recipe.ingredients){
//         recipeIngredients.push(this.formBuilder.group({
//           name:[ingredient.name,],
//           amount:[ingredient.amount,],
//         }));
//       //  recipeIngredients.push(new FormGroup({
//       //   'name': new FormControl(ingredient.name),
//       //   'amount': new FormControl(ingredient.amount),
//       //  }));
//       }
//     }
    
//   }

//   // More readable
//   this.recipeForm = this.formBuilder.group({
//     name: [recipeName,],
//     imagePath: [recipeImagePath,],
//     description: [recipeDescription,],
//     ingredients:[recipeIngredients.controls.values,],
//   });

//   // this.recipeForm = new FormGroup({
//   //   'name': new FormControl(recipeName),
//   //   'imagePath': new FormControl(recipeImagePath),
//   //   'description': new FormControl(recipeDescription)
//   // });

//   }
 
 
// }
