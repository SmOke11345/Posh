import { Component, NgModule, OnDestroy } from "@angular/core";
import { shortCatalog } from "../../models/Catalog";
import { ActivatedRoute, Params, RouterLink } from "@angular/router";
import { CatalogService } from "./catalog.service";
import { CardProductComponent } from "../../components/cards/card-product/card-product.component";
import { NgForOf } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
    selector: "app-catalog",
    templateUrl: "./catalog.component.html",
    styleUrl: "./catalog.component.scss",
})
export class CatalogComponent implements OnDestroy {
    dataCatalog: shortCatalog[];

    selectedSort = "По популярности";
    isOpen = false;
    optionList = [
        { name: "По популярности", value: "rating" },
        {
            name: "По возрастанию цены",
            value: "cost",
        },
        {
            name: "По убыванию цены",
            value: "-cost",
        },
        {
            name: "По новинкам",
            value: "createdAt",
        },
    ];

    private readonly subRouter: Subscription;

    // TODO: Сделать скелитон.

    constructor(
        private router: ActivatedRoute,
        private catalogService: CatalogService,
    ) {
        this.dataCatalog = [] as shortCatalog[];

        this.subRouter = this.router.queryParams.subscribe((query) => {
            if (query) {
                this.dataCatalog = [];
                this.getData(query);
            }
        });
    }

    // TODO: Добавить множественный выбор цветов и размеров.
    getData(query: Params) {
        this.catalogService
            .getFilteredCatalog(query, { colors: [], sizes: [] })
            .subscribe({
                next: (data) => {
                    this.dataCatalog.push(...data.items);
                },
            });
    }

    ngOnDestroy() {
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
    }
}

@NgModule({
    declarations: [CatalogComponent],
    exports: [CatalogComponent],
    imports: [CardProductComponent, NgForOf, RouterLink],
    providers: [CatalogService],
})
export class CatalogModule {}
