import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/core/services/shopping-list.service';
import { Ingredient } from '../shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    
  }
}
