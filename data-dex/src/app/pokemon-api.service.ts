import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(
    private http: HttpClient
    ) {}

  GetPokemonAll(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  }

  GetPokemon(limit: number): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  }

  GetPokemonByName(name: string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  GetPokemonNext(url: string){
    return this.http.get(`${url}`);
  }
}
