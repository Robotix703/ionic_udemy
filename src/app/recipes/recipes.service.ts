import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[] = [
    {
      id: "1",
      title: "Choucroute",
      imageUrl: "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal#/media/Fichier:03GustavoPetro.jpg",
      ingredients: [
        "saucisses",
        "chou"
      ]
    },
    {
      id: "2",
      title: "Blanquette",
      imageUrl: "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal#/media/Fichier:Space_Shuttle_Columbia_launching.jpg",
      ingredients: [
        "sauce",
        "saucisses"
      ]
    }
  ]

  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string){
    return {...this.recipes.find(recipe => {
      return recipe.id === recipeId;
    })};
  }
}
