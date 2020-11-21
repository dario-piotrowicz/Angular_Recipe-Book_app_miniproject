import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public navbarCollapsed = true;
  private resizeSubscription: Subscription = null;

  ngOnInit(): void {
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(
      () => (this.navbarCollapsed = true)
    );
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
