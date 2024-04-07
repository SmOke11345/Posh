import { Component, Input } from "@angular/core";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-empty",
    standalone: true,
    imports: [NgIf, RouterLink],
    templateUrl: "./empty.component.html",
    styleUrl: "./empty.component.scss",
})
export class EmptyComponent {
    @Input() isCart: boolean = false;
    @Input() isFavorite: boolean = false;
}
