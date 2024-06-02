import { Component, ElementRef, NgModule, OnDestroy } from "@angular/core";
import { catalogQuery, shortCatalog } from "../../models/Catalog";
import { ActivatedRoute, Params, RouterLink } from "@angular/router";
import { CatalogService } from "./catalog.service";
import { CardProductComponent } from "../../components/cards/card-product/card-product.component";
import { NgForOf, NgIf, NgStyle } from "@angular/common";
import { Subscription } from "rxjs";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "app-catalog",
    templateUrl: "./catalog.component.html",
    styleUrl: "./catalog.component.scss",
})
export class CatalogComponent implements OnDestroy {
    dataCatalog: shortCatalog[];
    sizesList: string[];
    colorsList: string[];
    isLoading: boolean;

    selectedSort: string = "По популярности";
    isOpen: boolean = false;
    isFilter: boolean = false;
    isSelected: boolean[] = [false, false, false, false, false];

    selectedSizes: string[] = [];
    selectedColors: string[] = [];

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
        type: { id: string; title: string; chapter: string; type: string }[];
    }[] = [
        {
            title: "Одежда",
            type: [
                {
                    id: "0",
                    title: "Футболки",
                    chapter: "Одежда",
                    type: "Футболки",
                },
                { id: "1", title: "Джинсы", chapter: "Одежда", type: "Джинсы" },
            ],
        },
        {
            title: "Обувь",
            type: [
                { id: "2", title: "Кеды", chapter: "Обувь", type: "Кеды" },
                {
                    id: "3",
                    title: "Кроссовки",
                    chapter: "Обувь",
                    type: "Кроссовки",
                },
            ],
        },
    ];

    currentPage: number = 1;
    error: string = "";

    defaultQuery: Params = {
        sort: "rating",
        orderBy: "desc",
        chapter: "",
        type: "",
        gender: "",
        sizes: "",
        colors: "",
    };

    private readonly subRouter: Subscription;

    constructor(
        private router: ActivatedRoute,
        private catalogService: CatalogService,
        private el: ElementRef,
    ) {
        this.dataCatalog = [] as shortCatalog[];
        this.sizesList = [] as string[];
        this.colorsList = [] as string[];
        this.isLoading = true;

        this.subRouter = this.router.queryParams.subscribe((query) => {
            this.defaultQuery = { ...this.defaultQuery, ...query };
            if (query) {
                this.isLoading = true;
                this.dataCatalog = [];
                this.currentPage = 1;
                this.getData(this.defaultQuery);
            }
        });
    }

    getData(query: Params) {
        this.catalogService.getFilteredCatalog(query).subscribe({
            next: (data: catalogQuery) => {
                this.dataCatalog.push(...data.items);
                this.sizesList = data.sizes;
                this.colorsList = data.colors;
            },
            error: (error) => {
                this.isLoading = false;
                this.error = error.error.message;
            },
            complete: () => {
                this.isLoading = false;
                this.error = "";
            },
        });
    }

    onChangePage(event: any) {
        window.scrollTo(0, 0);
        this.currentPage = event;
    }

    /**
     * Функция для открытия и закрытия списка фильтров.
     * @param i
     */
    toggleSelect(i: number) {
        this.isSelected[i] = !this.isSelected[i];
    }

    /**
     * Выбор размера.
     * @param size
     */
    selectSize(size: string) {
        if (this.selectedSizes.includes(size)) {
            this.selectedSizes = this.selectedSizes.filter(
                (item) => item !== size,
            );
        } else {
            this.selectedSizes.push(size);
        }
    }

    /**
     * Выбор цвета.
     * @param color
     */
    selectColor(color: string) {
        if (this.selectedColors.includes(color)) {
            this.selectedColors = this.selectedColors.filter(
                (item) => item !== color,
            );
        } else {
            this.selectedColors.push(color);
        }
    }

    /**
     * Очистка параметров фильтрации.
     */
    clearFilters() {
        const inputs = this.el.nativeElement.querySelectorAll(
            "input[type='radio']",
        );
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
        this.defaultQuery = {
            sort: "rating",
            orderBy: "desc",
            chapter: "",
            type: "",
            gender: "",
            sizes: "",
            colors: "",
        };
        this.isFilter = false;
        this.selectedColors = [];
        this.selectedSizes = [];
    }

    toggleIsFilter() {
        this.isFilter = !this.isFilter;

        if (this.isFilter) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
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
    imports: [
        CardProductComponent,
        NgForOf,
        RouterLink,
        NgxPaginationModule,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        NgStyle,
    ],
    providers: [CatalogService, NgxPaginationModule],
})
export class CatalogModule {}
