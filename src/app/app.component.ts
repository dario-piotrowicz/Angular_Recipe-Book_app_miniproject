import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public currentPseudoSelection = 'recipe';

  public onPseudoNavigation(selectionName: string): void {
    this.currentPseudoSelection = selectionName;
  }
}
