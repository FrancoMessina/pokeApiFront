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
  visiblePagesLimit: number = 5;
  seleccionoPokemon : boolean = true;
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getAllPokemons(this.currentPage,6).subscribe(
      (data) => {
        console.log(data)
        this.pokemons = data.content;
        console.log(this.pokemons);
        const totalItems = data.totalElements;
        this.totalPages = data.totalPages;
        
        // Calcular las páginas a mostrar en la paginación
        const startIndex = Math.max(1, this.currentPage - Math.floor(this.visiblePagesLimit / 2));
        const endIndex = Math.min(this.totalPages, startIndex + this.visiblePagesLimit - 1);
        
        this.pages = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i);
      },
      (error) => {
        console.error('Error fetching pokemons:', error);
      }
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadPokemons(); 
  }

  showDetails(pokemon: Pokemon): void {
    this.seleccionoPokemon = false;
    this.pokemonService.getPokemonDetails(pokemon.name).subscribe(
      (details) => {
        this.selectedPokemon = details;
        console.log(details);
      },
      (error) => {
        console.error('Error fetching pokemon details:', error);
      }
    );
  }

  closeDetails(): void {
    this.selectedPokemon = null;
    this.seleccionoPokemon = true;
    this.loadPokemons();
  }
}