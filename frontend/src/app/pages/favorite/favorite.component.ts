import { Component, NgModule, OnInit } from "@angular/core";
import { shortCatalog } from "../../models/Catalog";
import { CardProductComponent } from "../../components/cards/card-product/card-product.component";
import { NgForOf, NgIf } from "@angular/common";
import { FavoriteService } from "./favorite.service";
import { EmptyComponent } from "../../components/empty/empty.component";

@Component({
    selector: "app-favorite",
    templateUrl: "./favorite.component.html",
    styleUrl: "./favorite.component.scss",
})
export class FavoriteComponent implements OnInit {
    favoriteItems: shortCatalog[] = [];

    constructor(private favoriteService: FavoriteService) {}

    ngOnInit() {
        this.favoriteService.getFavoriteItems().subscribe((data) => {
            this.favoriteItems = data;
        });
    }
}

@NgModule({
    imports: [CardProductComponent, NgForOf, NgIf, EmptyComponent],
    exports: [FavoriteComponent],
    declarations: [FavoriteComponent],
    providers: [FavoriteService],
})
export class FavoriteModule {}
