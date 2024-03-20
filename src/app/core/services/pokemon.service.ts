import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Pokemon } from '../../interfaces/pokemon';
import { environment } from './../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getAllPokemons(): Observable<any> {
    return this.http.get(`${environment.apiUrlBase}/pokemon/details/all`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${environment.apiUrlBase}details/${name}`);
  }
}
