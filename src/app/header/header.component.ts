import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public navbarCollapsed = true;
  @Output() linkSelection = new EventEmitter<string>();

  public onLinkSelected(selectionName: string): void {
    this.linkSelection.emit(selectionName);
  }
}
