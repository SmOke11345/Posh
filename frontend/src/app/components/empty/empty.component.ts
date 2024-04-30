import { Component, Input } from "@angular/core";
import { NgIf, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-empty",
    standalone: true,
    imports: [NgIf, RouterLink, NgStyle],
    templateUrl: "./empty.component.html",
    styleUrl: "./empty.component.scss",
})
export class EmptyComponent {
    @Input() isCart: boolean = false;
    @Input() isFavorite: boolean = false;
    @Input() isReview: boolean = false;
    @Input() isOrders: boolean = false;
    @Input() isNotFound: boolean = false;
}
