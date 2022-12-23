import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'position', 'image']; // Columnas de la tabla de pokemons
  data: any[] = [];
  datasource = new MatTableDataSource<any>(this.data); // Data source para la tabla de pokemons
  pokemons = []; // Array de pokemons

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private pokeService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(){

    let pokemonData;

    for (let i = 1; i <= 151; i++) {
    this.pokeService.getPokemons(i).subscribe({
      next: (res) => {
        pokemonData = {
          name: res.name,
          position: i,
          image: res.sprites.front_default
        };
        this.data.push(pokemonData); // Agregamos los datos de cada pokemon al array de pokemons
        this.datasource = new MatTableDataSource<any>(this.data); // Data source para la tabla de pokemons
        this.datasource.paginator = this.paginator; // Paginador de la tabla de pokemons
        console.log(res);
      },
      error: () => {
        console.log('Error');
      }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
}
