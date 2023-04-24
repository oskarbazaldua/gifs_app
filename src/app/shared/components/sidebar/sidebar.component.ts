import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifts/services/gifs.service';

@Component({
  selector: 'share-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService: GifsService) { }

  get tags(): string [] {
    return this.gifsService.tagHistory;
  }

  searchTag( tag: string ): void {
    this.gifsService.searchTag(tag);
  }


}
