import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type=number]',
  standalone: true
})
export class NoNegativeDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {
    this.el.nativeElement.min = '0';
  }

  @HostListener('input', ['$event'])
  onInput() {
    const input = this.el.nativeElement;
    if (input.value && parseFloat(input.value) < 0) {
      input.value = '0';
    }
  }
}
