import { ElementRef, Renderer2 } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    let el : ElementRef;
    let renderer : Renderer2;
    const directive = new HighlightDirective(el,renderer);
    expect(directive).toBeTruthy();
  });
});
