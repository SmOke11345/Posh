import { Component, NgModule, OnInit } from "@angular/core";
import { shortCatalog } from "../../models/Catalog";
import { CardProductComponent } from "../../components/cards/card-product/card-product.component";
import { NgForOf, NgIf } from "@angular/common";
import { FavoriteService } from "./favorite.service";
import { EmptyComponent } from "../../components/empty/empty.component";
import { BehaviorSubjectService } from "../../services/behavior-subject.service";

@Component({
    selector: "app-favorite",
    templateUrl: "./favorite.component.html",
})
export class FavoriteComponent implements OnInit {
    favoriteItems: shortCatalog[] = [];

    remove_id: number;
    isLoading: boolean;

    constructor(
        private favoriteService: FavoriteService,
        private subjectService: BehaviorSubjectService,
    ) {
        this.remove_id = 0;
        this.isLoading = true;
        this.subjectService.favorite$.subscribe((data) => {
            this.favoriteItems = data.map((item) => {
                return { ...item, isFavorite: true };
            });
        });
    }

    ngOnInit() {
        this.favoriteService.getFavoriteItems().subscribe({
            next: (data) => {
                this.subjectService.setFavorite(data);
            },
            complete: () => {
                this.isLoading = false;
            },
        });
    }

    removeFavorite(catalog_id: number) {
        this.remove_id = catalog_id; // Получаем id из child-компонента
        this.favoriteService.removeFavorite(this.remove_id).subscribe({
            next: () => {
                this.favoriteItems = this.favoriteItems.filter(
                    (item) => item.id !== this.remove_id,
                );
                this.subjectService.removeFavorite(this.remove_id);
            },
        });
    }
}

@NgModule({
    imports: [CardProductComponent, NgForOf, NgIf, EmptyComponent],
    exports: [FavoriteComponent],
    declarations: [FavoriteComponent],
    providers: [FavoriteService, BehaviorSubjectService],
})
export class FavoriteModule {}
