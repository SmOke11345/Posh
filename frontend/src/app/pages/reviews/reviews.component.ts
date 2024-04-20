import { Component, NgModule, OnInit } from "@angular/core";
import { ReviewsService } from "./reviews.service";
import { EmptyComponent } from "../../components/empty/empty.component";
import { DatePipe, NgForOf, NgIf, NgStyle } from "@angular/common";
import { Review } from "../../models/Review";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-reviews",
    templateUrl: "./reviews.component.html",
    styleUrl: "./reviews.component.scss",
})
export class ReviewsComponent implements OnInit {
    reviewForm: FormGroup;

    dataReviews: Review[] = [];
    isChangeText: boolean = false;
    currentChange: number;

    constructor(private reviewsService: ReviewsService) {
        this.currentChange = 0;
        this.reviewForm = new FormGroup({
            text: new FormControl(""),
        });
    }

    ngOnInit() {
        this.reviewsService.getUserReviews().subscribe((data) => {
            data.map((review) => {
                return this.dataReviews.push({
                    ...review,
                    ratingStars: Array.from(
                        { length: review.rating },
                        (_, i) => i,
                    ),
                });
            });
        });
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
                        review.text = this.reviewForm.controls["text"].value;
                    }
                    return review;
                });
            },
        });
    }

    changeStatus(text: string, review_id: number) {
        this.isChangeText = true;
        this.currentChange = review_id;
        this.reviewForm.controls["text"].setValue(text);
    }

    onSubmit(review_id: number) {
        this.updateReview(review_id, this.reviewForm.value);
        this.isChangeText = false;
    }
}

@NgModule({
    declarations: [ReviewsComponent],
    exports: [ReviewsComponent],
    imports: [
        EmptyComponent,
        NgIf,
        NgForOf,
        NgStyle,
        DatePipe,
        ReactiveFormsModule,
        RouterLink,
    ],
    providers: [ReviewsService],
})
export class ReviewModule {}
