import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '8nkIGbYhljr0FpUKiMfv0WjrFem2H98c';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]
  }

  constructor( private http: HttpClient) {}

  buscarGifs( query: string = '' ) {
    query = query.trim().toLocaleLowerCase();
    if( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);
    }
    
    //console.log(this._historial);

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=8nkIGbYhljr0FpUKiMfv0WjrFem2H98c&q=${ query }&limit=10`)
      .subscribe( ( resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }

}
