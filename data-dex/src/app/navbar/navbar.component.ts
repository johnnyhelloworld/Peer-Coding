import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PokemonApiService } from '../pokemon-api.service';

export interface Type {
  name: string;
  url: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  types: any[] = [];

  constructor(
    private PokemonApiService: PokemonApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.PokemonApiService.GetPokemonType()
    .subscribe((reponse: any) => {
      reponse.results.forEach((result: Type) =>
      {
        this.types.push(result.name)
      })})

      console.log(this.types);
  }

    //       this.PokemonApiService.GetPokemonTypeName(result.name)
      //       .subscribe((uniqReponse: any) => {
      //         this.types.push(uniqReponse);
      //       })
      //     })
      //   })
      // console.log(this.types);
      //}}
}




