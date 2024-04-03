import { Component, Input } from "@angular/core";
import { NgClass, NgIf, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-card",
    standalone: true,
    imports: [NgIf, NgStyle, NgClass, RouterLink],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss",
})
export class CardComponent {
    @Input() card_basket: boolean = false;
    @Input() card_product: boolean = false;
    // TODO: Добавить типы для входящих данных
    @Input() cartData: any;

    constructor() {}
}
