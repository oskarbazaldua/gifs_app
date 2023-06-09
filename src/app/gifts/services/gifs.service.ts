
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {


  public gifList: Gif[] = []
;
  /*atributo privado "_tagHistory" que es una matriz de cadenas
  almacenar el historial de etiquetas de búsqueda que ha utilizado
  el usuario para buscar gifs.*/
  private _tagHistory: string [] = [];
  private apiKey: string = 'Q9uGIkOGAdJeRThy0NiqL9hTCI8enp5j';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';


  constructor( private http: HttpClient) {
    this.loadLocalStoreag();
  }

  /*"get tagHistory()" obtiene una copia de la matriz "_tagHistory".
  //Devuelve una copia de la matriz en lugar de la matriz original
  para evitar cambios accidentales en el estado del servicio*/
  get tagHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory (tag: string) {
    //agrega el tag con la primer letra mayúscula
    tag = tag.toLocaleLowerCase();

    //sí el arreglo de tag incluye el tag que poner el usuario
    if (this._tagHistory.includes(tag)) {
      /*entonces el arreglo es igual a el arreglo, donde filter
      sirve para regresar un nuevo arreglo, cuya función regrese
      vedadero, si no se cumple elimina el tag, donde condiciona
      ¿sí el tag anterior es diferente al tag que agrego el usuario ?*/
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag != tag )
    }

    /*inserta el nuevo tag al inicio del arreglo
    y regresa el nuevo arreglo*/
    this._tagHistory.unshift( tag );

    /*"splice" se utiliza para modificar una matriz al agregar
    o eliminar elementos existentes en ella.
    splice devuelve los elementos eliminados como una nueva matriz.*/
    this._tagHistory = this._tagHistory.splice(0,10);
    /*Se manda llamada al método saveLocalStoreage que guardará las
    busquedas en el ocalStorage del navegador */
    this.saveLocalStorage();

  }

  private saveLocalStorage (): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  /* Método para agregar los valores buscados en el storage
  y usarlos para hacerlos pesistentes, aunque el usuario recargue
  la página del nabegador */
  private loadLocalStoreag (): void {
    if (!localStorage.getItem ('history') ) return;

    this._tagHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagHistory.length === 0 ) return;
    this.searchTag( this._tagHistory[0] );
  }

  //Busqueda de Gifs
  searchTag (tag: string):void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','15')
      .set('q',tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, {params})
      .subscribe ( resp => {
        this.gifList = resp.data;
      });


    /*fetch() permite realizar solicitudes HTTP a servidores web y recuperar los datos de respuesta.
    Esta función devuelve una promesa que resuelve en la respuesta de la solicitud.
    fetch('https://api.giphy.com/v1/gifs/search?api_key=Q9uGIkOGAdJeRThy0NiqL9hTCI8enp5j&q=valorant&limit=15')
      .then ( resp => resp.json())
      .then ( data => console.log(data));*/


  }
}
