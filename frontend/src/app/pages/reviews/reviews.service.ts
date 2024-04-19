import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { IReview, Review } from "../../models/Review";
import { HttpClient } from "@angular/common/http";
import { Url } from "../../models/enums/requestUrls";

@Injectable({
    providedIn: "root",
})
export class ReviewsService {
    constructor(private http: HttpClient) {}

    /**
     * Получение отзывов товара.
     * @param catalog_id
     */
    getReviews(catalog_id: string) {
        return this.http
            .get<IReview>(`${Url.REVIEW}/${catalog_id}`)
            .pipe(catchError((error) => throwError(error)));
    }

    /**
     * Получение отзывов пользователя.
     */
    getUserReviews() {
        return this.http
            .get<Review[]>(`${Url.REVIEW}/get-user-reviews`)
            .pipe(catchError((error) => throwError(error)));
    }

    /**
     * Удаление отзыва.
     * @param review_id
     */
    deleteReview(review_id: number) {
        return this.http
            .delete(`${Url.REVIEW}/delete/${review_id}`)
            .pipe(catchError((error) => throwError(error)));
    }

    /**
     * Изменение отзыва.
     * @param review_id
     * @param text
     */
    updateReview(review_id: number, text: string) {
        return this.http
            .put(`${Url.REVIEW}/update/${review_id}`, { text })
            .pipe(catchError((error) => throwError(error)));
    }
}
