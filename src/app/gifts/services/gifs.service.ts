
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  /*atributo privado "_tagHistory" que es una matriz de cadenas
  almacenar el historial de etiquetas de búsqueda que ha utilizado
  el usuario para buscar gifs.*/
  private _tagHistory: string [] = [];
  private apiKey: string = 'Q9uGIkOGAdJeRThy0NiqL9hTCI8enp5j';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';


  constructor( private http: HttpClient) { }

  /*"get tagHistory()" obtiene una copia de la matriz "_tagHistory".
  //Devuelve una copia de la matriz en lugar de la matriz original
  para evitar cambios accidentales en el estado del servicio*/
  get tagHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory (tag: string) {
    //agrega el tag con la 1era mayúscula
    tag = tag.toLocaleLowerCase();

    //sí el arreglo de tag incluye el tag que poner el usuario
    if (this._tagHistory.includes(tag)) {
      /*entonces el arreglo es igual a el arreglo, donde filter
      sirve para regresar un nuevo arreglo, cuya función regrese
      vedadero, si no se cumple elimina el tag, donde condiciona
      ¿sí el tag anterior es diferente al tag que agrego el usuario ?*/
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag != tag )
    }

    /*insera el nuevo tag al inicio del arreglo
    y regresa el nuevo arreglo*/
    this._tagHistory.unshift( tag );

    /*"splice" se utiliza para modificar una matriz al agregar
    o eliminar elementos existentes en ella.
    splice devuelve los elementos eliminados como una nueva matriz.*/
    this._tagHistory = this._tagHistory.splice(0,10);

  }

  searchTag (tag: string):void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','15')
      .set('q',tag)

    this.http.get(`${ this.serviceUrl }/search`, {params})
      .subscribe ( resp => {
        console.log(resp);
      });


    /*fetch() permite realizar solicitudes HTTP a servidores web y recuperar los datos de respuesta.
    Esta función devuelve una promesa que resuelve en la respuesta de la solicitud.
    fetch('https://api.giphy.com/v1/gifs/search?api_key=Q9uGIkOGAdJeRThy0NiqL9hTCI8enp5j&q=valorant&limit=15')
      .then ( resp => resp.json())
      .then ( data => console.log(data));*/


  }
}
