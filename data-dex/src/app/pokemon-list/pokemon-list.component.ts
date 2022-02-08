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

  pokemons: any[] = [];
  loadMoreUrl!: string;

  constructor(
    private PokemonApiService: PokemonApiService
  ) { }

  ngOnInit(): void {
    let pokemon = this.PokemonApiService.GetPokemon(10); // get first 10 pokemons

    pokemon.subscribe(reponse => {
      this.loadMoreUrl = reponse.next     //get the url for next API call
    })

    pokemon.subscribe(reponse => {
        reponse.results.forEach((result: Pokemon) => {
          this.PokemonApiService.GetPokemonByName(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);                     //get value to display pokemon
            });
        })
      });
  }

  loadMore(){
    this.PokemonApiService.GetPokemonNext(this.loadMoreUrl)
    .subscribe((reponse: any) => {
      reponse.results.forEach((result: Pokemon) => {
        this.PokemonApiService.GetPokemonByName(result.name)
          .subscribe((uniqResponse: any) => {
            this.pokemons.push(uniqResponse);                     //get value to display pokemon
          });
      })
    });
  }


}

