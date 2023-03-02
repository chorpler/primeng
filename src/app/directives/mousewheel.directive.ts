import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({ selector: '[mouseWheel]' })
export class MouseWheelDirective {
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  // @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
  //   this.mouseWheelFunc(event);
  // }

  // @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
  //   this.mouseWheelFunc(event);
  // }

  mouseWheelFunc(evt: any) {
    // let evt2:any = window.event || event; // old IE support
    let delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
    if(delta > 0) {
        this.mouseWheelUp.emit(evt);
    } else if(delta < 0) {
        this.mouseWheelDown.emit(evt);
    }
    // for IE
    evt.returnValue = false;
    // for Chrome and Firefox
    if(evt.preventDefault) {
        evt.preventDefault();
    }
  }
}
