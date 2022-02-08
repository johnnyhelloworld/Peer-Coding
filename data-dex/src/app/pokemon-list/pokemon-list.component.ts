import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  

}
