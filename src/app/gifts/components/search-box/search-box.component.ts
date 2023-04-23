import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifts-search-box',
  template: `
  <h5>Busqueda</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifts"
  (keyup.enter)="searchTag()"
  #txtTagInput>
  `
})

export class SearchBoxComponent {
  constructor( private gifsService: GifsService) { }

 /*ViewChild sirve para tomar una referencia local de sólo un elemento
 ViewChildren toma todos los input y regresa un arreglo de todos los elementos*/
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag () {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }

}
