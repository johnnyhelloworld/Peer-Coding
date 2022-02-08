import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPokemonComponent } from './my-pokemon/my-pokemon.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

const routes: Routes = [
  {
    path: "",
    component: NavbarComponent,
    children: [
      {
        path: "my-pokemon",
        component: MyPokemonComponent,
      },
      {
        path: "pokedex",
        component: PokemonListComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
