import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') private isOpen = false;

  @HostListener('click', ['$event']) onClickEventHandler(event: Event){ 
    this.isOpen = !this.isOpen;
    event.stopPropagation();
  }

  @HostListener('window:click') onWindowClickEventHandler(){
    this.isOpen = false;
  } 

  constructor() { }

}
