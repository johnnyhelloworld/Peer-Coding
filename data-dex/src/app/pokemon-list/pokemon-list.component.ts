import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../pokemon-api.service';
export interface Pokemon {
  name: string;
  url: string;
}

export interface Type {
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
  types: any[] = [];

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

    this.PokemonApiService.GetPokemonType()
      .subscribe((reponse: any) => {
        reponse.results.forEach((result: Type) => {
          this.types.push(result.name)
        })
      })

    console.log(this.types);
  }

  loadMore() {
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

  onChange($event: any) {
    this.pokemons = [];
    this.PokemonApiService.GetPokemonByType($event.target.value)
      .subscribe((reponse: any) => {
        reponse.pokemon.forEach((uniqPokemon: any) => {
          this.PokemonApiService.GetPokemonByName(uniqPokemon.pokemon.name)
            .subscribe((uniqResponse: any) => {
              if (uniqResponse.id <= 151) {
                this.pokemons.push(uniqResponse);                    //get value to display pokemon
              }
            });
        })
      })
  }
}

