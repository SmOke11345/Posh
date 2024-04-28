import { Component, NgModule, OnDestroy } from "@angular/core";
import { shortCatalog } from "../../models/Catalog";
import { ActivatedRoute, Params, RouterLink } from "@angular/router";
import { CatalogService } from "./catalog.service";
import { CardProductComponent } from "../../components/cards/card-product/card-product.component";
import { NgForOf } from "@angular/common";
import { Subscription } from "rxjs";
import { NgxPaginationModule } from "ngx-pagination";

@Component({
    selector: "app-catalog",
    templateUrl: "./catalog.component.html",
    styleUrl: "./catalog.component.scss",
})
export class CatalogComponent implements OnDestroy {
    dataCatalog: shortCatalog[];
    selectedSort: string = "По популярности";
    isOpen: boolean = false;
    optionList: { name: string; value: string }[] = [
        { name: "По популярности", value: "rating" },
        {
            name: "По возрастанию цены",
            value: "-cost",
        },
        {
            name: "По убыванию цены",
            value: "cost",
        },
        {
            name: "По новинкам",
            value: "createdAt",
        },
    ];

    categoryList: {
        title: string;
        type: { title: string; chapter: string; type: string }[];
    }[] = [
        {
            title: "Одежда",
            type: [
                { title: "Футболки", chapter: "Одежда", type: "Футболки" },
                { title: "Джинсы", chapter: "Одежда", type: "Джинсы" },
            ],
        },
        {
            title: "Обувь",
            type: [
                { title: "Кеды", chapter: "Обувь", type: "Кеды" },
                { title: "Кроссовки", chapter: "Обувь", type: "Кроссовки" },
            ],
        },
    ];

    currentPage: number = 1;

    private readonly subRouter: Subscription;

    // TODO: Сделать скелетон.

    constructor(
        private router: ActivatedRoute,
        private catalogService: CatalogService,
    ) {
        this.dataCatalog = [] as shortCatalog[];

        this.subRouter = this.router.queryParams.subscribe((query) => {
            if (query) {
                this.dataCatalog = [];
                this.currentPage = 1;
                this.getData(query);
            }
        });
    }

    // TODO: Добавить множественный выбор цветов и размеров.
    getData(query: Params) {
        this.catalogService
            .getFilteredCatalog(query, { colors: [], sizes: [] })
            .subscribe({
                next: (data: { countPage: number; items: shortCatalog[] }) => {
                    this.dataCatalog.push(...data.items);
                },
            });
    }

    onChangePage(event: any) {
        window.scrollTo(0, 0);
        this.currentPage = event;
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
    imports: [CardProductComponent, NgForOf, RouterLink, NgxPaginationModule],
    providers: [CatalogService, NgxPaginationModule],
})
export class CatalogModule {}
