import {
    Component,
    DoCheck,
    ElementRef,
    OnDestroy,
    OnInit,
} from "@angular/core";
import { NavigationStart, Router, RouterLink } from "@angular/router";
import { Location, NgClass, NgForOf, NgIf } from "@angular/common";
import { BehaviorSubjectService } from "../../services/behavior-subject.service";
import { FormsModule } from "@angular/forms";
import { debounceTime, Subject, Subscription } from "rxjs";
import { CatalogService } from "../../pages/catalog/catalog.service";
import { FixedDirective } from "../../directives/fixed.directive";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [RouterLink, NgIf, NgForOf, NgClass, FormsModule, FixedDirective],
    providers: [BehaviorSubjectService, CatalogService],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {
    linkList: { name: string; url: string; params: any }[] = [
        { name: "🔥Новинки", url: "/catalog", params: { sort: "createdAt" } },
        {
            name: "Мужчинам",
            url: "/catalog",
            params: {
                gender: "Мужские",
            },
        },
        {
            name: "Женщинам",
            url: "/catalog",
            params: {
                gender: "Женские",
            },
        },
        {
            name: "🔍Поиск",
            url: "/catalog",
            params: {
                search: "",
            },
        },
    ];
    notShowPages: string[] = [
        "catalog",
        "product",
        "profile",
        "checkout",
        "cart",
    ];

    cartCount: number = 0;
    showMenu: boolean = false;
    isSearch: boolean = false;
    searchValue: string = "";
    dataHint: { title: string }[] = [];
    error: string = "";
    debouncedSearchValue = new Subject<string>();

    isMainPage: boolean;
    isNotShowPage: boolean;

    protected subRouter: Subscription;

    constructor(
        private el: ElementRef,
        private router: Router,
        private location: Location,
        private subjectService: BehaviorSubjectService,
        private catalogService: CatalogService,
    ) {
        this.isMainPage = true;
        this.isNotShowPage = false;
        this.subRouter = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.isMainPage = event.url === "/main";
                this.isNotShowPage = this.notShowPages.some((page) =>
                    event.url.includes(page),
                );
            }
        });
    }

    ngOnInit() {
        this.setCartCount();
        // Задержка для отправки поискового запроса
        this.debouncedSearchValue
            .pipe(debounceTime(1000))
            .subscribe((value) => {
                this.getSearchData(value);
            });
    }

    ngDoCheck() {
        if (this.cartCount !== this.subjectService.getCountProductInCart()) {
            this.setCartCount();
        }
    }

    ngOnDestroy() {
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
    }

    /**
     * Получаем значение при вводе, и передаем его в debouncedSearchValue.
     */
    getSearchValue() {
        this.debouncedSearchValue.next(this.searchValue);
    }

    /**
     * Получаем подсказки по поиску.
     * @param value
     */
    getSearchData(value: string) {
        this.dataHint = [];
        this.catalogService.search(value).subscribe({
            next: (data) => {
                this.dataHint = data;
            },
            error: (error) => {
                this.error = error.error.message;
            },
            complete: () => {
                this.error = "";
            },
        });
    }

    /**
     * При нажатии на подсказку добавляем query и закрываем поиск.
     * @param value
     */
    search(value: string) {
        this.router.navigate(["/catalog"], {
            queryParams: { search: value },
        });
        this.toggleSearch();
    }

    setCartCount() {
        this.cartCount = this.subjectService.getCountProductInCart();
    }

    /**
     * Показать/скрыть меню.
     */
    toggleMenu() {
        const menu = this.el.nativeElement.querySelector(".menu-burger");
        this.showMenu = !this.showMenu;

        if (this.showMenu) {
            document.body.style.overflow = "hidden";
            menu.style.display = "flex";
        } else {
            document.body.style.overflow = "auto";
            setTimeout(() => {
                menu.style.display = "none";
            }, 400);
        }
    }

    /**
     * Скрыть меню при нажатии на ссылку.
     */
    hideMenu(name: string) {
        if (name === "🔍Поиск") {
            this.toggleSearch();
        } else {
            document.body.style.overflow = "auto";
        }
        this.showMenu = false;
    }

    toggleSearch() {
        this.isSearch = !this.isSearch;

        if (this.isSearch) {
            document.body.style.overflow = "hidden";
        } else {
            this.searchValue = "";
            this.dataHint = [];
            document.body.style.overflow = "auto";
        }
    }

    back() {
        this.location.back();
    }
}
