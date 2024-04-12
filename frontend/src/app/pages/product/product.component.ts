import { Component, NgModule, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CatalogService } from "../catalog/catalog.service";
import { SliderComponent } from "../../components/slider/slider.component";
import { Title } from "@angular/platform-browser";
import { IProduct } from "../../models/Catalog";
import { NgClass, NgForOf } from "@angular/common";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrl: "./product.component.scss",
})
export class ProductComponent implements OnInit, OnDestroy {
    dataProduct: IProduct;
    id: string = "";
    private readonly subRouter: Subscription;

    constructor(
        private router: ActivatedRoute,
        private catalogService: CatalogService,
        private titleService: Title,
    ) {
        this.dataProduct = {} as IProduct;

        this.subRouter = this.router.params.subscribe((params) => {
            this.id = params["id"];
        });
    }

    ngOnInit() {
        this.catalogService.getProduct(this.id).subscribe((data) => {
            this.dataProduct = data;
            this.titleService.setTitle(data.title);
        });
    }

    ngOnDestroy() {
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
    }
}

@NgModule({
    declarations: [ProductComponent],
    exports: [ProductComponent],
    imports: [SliderComponent, NgForOf, NgClass],
    providers: [CatalogService],
})
export class ProductModule {}
