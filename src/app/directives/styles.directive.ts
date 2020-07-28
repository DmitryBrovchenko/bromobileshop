import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appStyles]'
})
export class StylesDirective {
  @Input('appStyles') color: string;
  @HostBinding('style.backgroundColor') elColor = null;
  constructor() {}

  @HostListener('mouseenter') onMouseEnter() {
    this.elColor = this.color;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elColor = null;
  }
}
