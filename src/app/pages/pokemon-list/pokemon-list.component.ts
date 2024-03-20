import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Pokemon } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe,CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  selectedPokemon: Pokemon | null = null;
  pages: number[] = [];
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getAllPokemons().subscribe(
      (data) => {
        console.log(data)
        this.pokemons = data.content;
        console.log(this.pokemons);
        this.totalPages = Math.ceil(this.pokemons.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      (error) => {
        console.error('Error fetching pokemons:', error);
      }
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  showDetails(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
  }

  closeDetails(): void {
    this.selectedPokemon = null;
  }
}