import { Component, NgModule, OnInit } from "@angular/core";
import { shortCatalog } from "../../models/Catalog";
import { CardComponent } from "../../components/card/card.component";
import { NgForOf, NgIf } from "@angular/common";
import { FavoriteService } from "../../services/favorite.service";

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
    imports: [CardComponent, NgForOf, NgIf],
    exports: [FavoriteComponent],
    declarations: [FavoriteComponent],
    providers: [FavoriteService],
})
export class FavoriteModule {}