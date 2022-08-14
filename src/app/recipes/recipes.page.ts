import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  recipes: Recipe[] = [
    {
      id: "&",
      title: "Choucroute",
      imageUrl: "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal#/media/Fichier:03GustavoPetro.jpg",
      ingredients: [
        "saucisses",
        "chou"
      ]
    },
    {
      id: "&",
      title: "Blanquette",
      imageUrl: "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal#/media/Fichier:Space_Shuttle_Columbia_launching.jpg",
      ingredients: [
        "sauce",
        "saucisses"
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
