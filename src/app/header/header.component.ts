import { Component } from '@angular/core';

import { DataNetworkService } from '../services/data-network.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public navbarCollapsed = true;

  constructor(private dataNetworkService: DataNetworkService) {}

  public onSaveDataHandler(): void {
    this.dataNetworkService.saveRecipes();
  }

  public onFatchDataHandler(): void {
    this.dataNetworkService.loadRecipes();
  }
}
