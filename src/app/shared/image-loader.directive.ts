import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[image-loader]'
})
export class ImageLoaderDirective {

  constructor(private image: ElementRef<HTMLImageElement>) { 
    this.defaultStyling();
  }

  private defaultStyling() {
    this.image.nativeElement.style.visibility = 'hidden';
    this.image.nativeElement.style.opacity = '0';
    this.image.nativeElement.style.transition = 'opacity 0.7s ease';
  }

  @HostListener('load') onImageLoad() {
    const image = this.image.nativeElement;
    const interval = setInterval(() => {
      if (image.naturalWidth > 0 && image.naturalHeight > 0) {
        this.afterLoadedStyling();
        clearInterval(interval);
      }
    }, 10);
  }

  private afterLoadedStyling() {
    this.image.nativeElement.style.visibility = 'visible';
    this.image.nativeElement.style.opacity = '1';
  }
}
