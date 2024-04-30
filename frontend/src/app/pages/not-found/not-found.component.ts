import { Component } from "@angular/core";
import { EmptyComponent } from "../../components/empty/empty.component";

@Component({
    selector: "app-not-found",
    standalone: true,
    imports: [EmptyComponent],
    template: ` <app-empty [isNotFound]="true"></app-empty>`,
})
export class NotFoundComponent {}
