import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../pokemon-api.service';
export interface Pokemon {
  name: string;
  url: string;
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];

  constructor(
    private PokemonApiService: PokemonApiService
  ) { }

  ngOnInit(): void {
    this.PokemonApiService.GetPokemon(10)
      .subscribe(reponse => {
        reponse.results.forEach((result: Pokemon) => {
          this.PokemonApiService.GetPokemonByName(result.name)
            .subscribe((pokemon: any) => {
              this.pokemons.push(pokemon);
            });
        })
      });
    console.log(this.pokemons);
  }


}

