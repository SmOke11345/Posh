import { Component, NgModule, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IProduct } from "../../models/Product";
import { Subscription } from "rxjs";
import { CatalogService } from "../catalog/catalog.service";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrl: "./product.component.scss",
})
export class ProductComponent implements OnInit, OnDestroy {
    // TODO: Сделать тип
    dataProduct: any;
    id: string = "";
    private readonly subRouter: Subscription;

    constructor(
        private router: ActivatedRoute,
        private catalogService: CatalogService,
    ) {
        this.dataProduct = {} as IProduct;

        this.subRouter = this.router.params.subscribe((params) => {
            this.id = params["id"];
        });
    }

    ngOnInit() {
        this.catalogService.getProduct(this.id).subscribe((data) => {
            console.log(data);
            this.dataProduct = data;
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
    imports: [],
    providers: [CatalogService],
})
export class ProductModule {}
