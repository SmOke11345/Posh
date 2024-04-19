import { Component, Input, OnInit } from "@angular/core";
import { Review } from "../../../models/Review";
import { DatePipe, NgForOf, NgStyle } from "@angular/common";

@Component({
    selector: "app-card-review",
    standalone: true,
    imports: [NgForOf, NgStyle, DatePipe],
    templateUrl: "./card-review.component.html",
    styleUrls: ["./card-review.component.scss"],
})
export class CardReviewComponent implements OnInit {
    @Input() dataReview: Review = {} as Review;

    rating: number[] = [];

    constructor() {}

    ngOnInit() {
        for (let i = 0; i < this.dataReview.rating; i++) {
            this.rating.push(i);
        }
    }
}
