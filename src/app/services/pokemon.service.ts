import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPokemons(id: number){
    return this.http.get<any>(this.baseUrl + 'pokemon/' + id);
  }
}
