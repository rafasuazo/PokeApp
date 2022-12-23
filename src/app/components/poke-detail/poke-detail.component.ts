import { PokemonService } from './../../services/pokemon.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent {
  pokemon: any = '';
  pokemonType: any = {};
  pokemonImg: any = '';

  constructor(private pokeService: PokemonService, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params => {
      this.getPokemon(params['id']);
    });
  }

  ngoninit(): void {}

  getPokemon(id: number){
    this.pokeService.getPokemons(id).subscribe({
      next: (res) => {
        this.pokemon = res;
        this.pokemonImg = res.sprites.front_shiny;
        this.pokemonType = res.types[0].type.name;
        console.log(res);
      },
      error: () => {
        console.log('Error');
      }
    });
  }
}
