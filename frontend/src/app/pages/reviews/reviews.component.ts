import { Component, NgModule, OnInit } from "@angular/core";
import { ReviewsService } from "./reviews.service";
import { EmptyComponent } from "../../components/empty/empty.component";
import { NgForOf, NgIf, NgStyle } from "@angular/common";
import { Review } from "../../models/Review";

@Component({
    selector: "app-reviews",
    templateUrl: "./reviews.component.html",
    styleUrl: "./reviews.component.scss",
})
export class ReviewsComponent implements OnInit {
    dataReviews: Review[] = [];

    // rating = [];

    constructor(private reviewsService: ReviewsService) {}

    ngOnInit() {
        this.reviewsService.getUserReviews().subscribe((data) => {
            this.dataReviews = data;
        });

        // TODO: Переделать отображение звездочек , т.к во всех компонентах нужно делать for

        // this.dataReviews.map((review) => {
        //     this.dataReviews
        // });

        // console.log(this.rating);
    }

    /**
     * Удаление отзыва.
     * @param id
     */
    deleteReview(id: number) {
        this.reviewsService.deleteReview(id).subscribe({
            next: () => {
                this.dataReviews = this.dataReviews.filter(
                    (review) => review.id !== id,
                );
            },
        });
    }

    /**
     * Изменение отзыва.
     * @param id
     * @param text
     */
    updateReview(id: number, text: string) {
        this.reviewsService.updateReview(id, text).subscribe({
            next: () => {
                this.dataReviews = this.dataReviews.map((review) => {
                    if (review.id === id) {
                        review.text = text;
                    }
                    return review;
                });
            },
        });
    }
}

@NgModule({
    declarations: [ReviewsComponent],
    exports: [ReviewsComponent],
    imports: [EmptyComponent, NgIf, NgForOf, NgStyle],
    providers: [ReviewsService],
})
export class ReviewModule {}
