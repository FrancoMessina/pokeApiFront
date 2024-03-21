import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Pokemon } from '../../interfaces/pokemon';
import { environment } from './../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getAllPokemons(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get(`${environment.apiUrlBase}/pokemon/all`, { params });
  }
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${environment.apiUrlBase}/pokemon/details/${name}`);
  }
}
