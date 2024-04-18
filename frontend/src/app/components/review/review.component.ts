import { Component, Input, OnInit } from "@angular/core";
import { Review } from "../../models/Review";
import { DatePipe, NgForOf, NgStyle } from "@angular/common";

@Component({
    selector: "app-review",
    standalone: true,
    imports: [NgForOf, NgStyle, DatePipe],
    templateUrl: "./review.component.html",
    styleUrl: "./review.component.scss",
})
export class ReviewComponent implements OnInit {
    @Input() dataReview: Review = {} as Review;

    rating: number[] = [];

    constructor() {}

    ngOnInit() {
        for (let i = 0; i < this.dataReview.rating; i++) {
            this.rating.push(i);
        }
    }
}
