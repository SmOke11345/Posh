import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgClass, NgIf, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";
import { shortCatalog } from "../../../models/Catalog";

@Component({
    selector: "app-card-product",
    standalone: true,
    imports: [NgIf, NgStyle, NgClass, RouterLink],
    templateUrl: "./card-product.component.html",
    styleUrl: "../cards.component.scss",
})
export class CardProductComponent {
    @Input() data: shortCatalog;
    @Output() dataChange = new EventEmitter<number>();

    constructor() {
        this.data = {} as shortCatalog;
    }

    /**
     * Передача catalog_id в родительский компонент, для изменения общего массива.
     * @param catalog_id
     */
    removeFavorite(catalog_id: number) {
        this.dataChange.emit(catalog_id);
    }

    up() {
        window.scrollTo(0, 0);
    }
}
