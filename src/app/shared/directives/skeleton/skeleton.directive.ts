import {Directive, ElementRef, inject, Input} from '@angular/core';

@Directive({
  selector: '[skeleton]',
  standalone: true
})
export class SkeletonDirective {
  private el: ElementRef = inject(ElementRef);
  private readonly class: string = 'tui-skeleton';
  private readonly radiusClass: string = 'tui-skeleton_rounded';

  @Input() radius: number = 5;

  @Input() set skeleton(loading: boolean) {
    const element: HTMLElement = this.el.nativeElement;
    const radius: string = element.style.borderRadius;

    if (loading) {
      element.classList.add(this.class, this.radiusClass);
      element.style.borderRadius = this.radius + 'px';
    } else {
      element.classList.add('fade');
      element.classList.remove(this.class, this.radiusClass);
      element.style.borderRadius = radius;
    }
  }

}
