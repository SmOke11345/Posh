import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: "[fixed]",
    standalone: true,
})
export class FixedDirective {
    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    @HostListener("window:scroll", ["$event"]) onWindowScroll() {
        const scrollUp = this.el.nativeElement;
        if (window.scrollY > 500) {
            return this.renderer.addClass(scrollUp, "fixed");
        } else {
            return this.renderer.removeClass(scrollUp, "fixed");
        }
    }
}
