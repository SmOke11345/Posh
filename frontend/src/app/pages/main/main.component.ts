import { Component, NgModule, OnInit } from "@angular/core";
import { BehaviorSubjectService } from "../../services/behavior-subject.service";
import { shortCatalog } from "../../models/Catalog";
import { NgForOf, NgIf, NgStyle } from "@angular/common";
import { CardProductComponent } from "../../components/cards/card-product/card-product.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrl: "./main.component.scss",
})
export class MainComponent implements OnInit {
    dataProducts: shortCatalog[];
    dataReviews: { id: number; text: string; rating: number; img: string }[] = [
        {
            id: 1,
            text: "Рекомендую магазин!",
            rating: 5,
            img: "../../assets/img/pages/main/reviews_1.png",
        },
        {
            id: 2,
            text: "Обожаю эти кеды, спасибо!",
            rating: 5,
            img: "../../assets/img/pages/main/reviews_2.png",
        },
        {
            id: 3,
            text: "Отличная доставка, качество товара",
            rating: 5,
            img: "../../assets/img/pages/main/reviews_3.png",
        },
    ];

    sliderIndex = 0;

    initSliderItems: {
        id: number;
        name: string;
        img: string;
        chapter: string;
        type: string;
    }[] = [];

    sliderItems: {
        id: number;
        name: string;
        img: string;
        chapter: string;
        type: string;
    }[] = [
        {
            id: 1,
            name: "Кеды",
            img: "../../assets/img/pages/main/кеды.png",
            chapter: "Обувь",
            type: "Кеды",
        },
        {
            id: 2,
            name: "Кроссовки",
            img: "../../assets/img/pages/main/кроссовки.png",
            chapter: "Обувь",
            type: "Кроссовки",
        },
        {
            id: 3,
            name: "Футболки",
            img: "../../assets/img/pages/main/футболки.webp",
            chapter: "Одежда",
            type: "Футболки",
        },
        {
            id: 4,
            name: "Джинсы",
            img: "../../assets/img/pages/main/джинсы.webp",
            chapter: "Одежда",
            type: "Джинсы",
        },
    ];

    constructor(private subject: BehaviorSubjectService) {
        this.dataProducts = [] as shortCatalog[];
        this.initSliderItems = this.sliderItems.slice(0, 2);
    }

    ngOnInit() {
        this.subject.slider$.subscribe((data) => {
            const prepareData = data.slice(0, 4);
            this.dataProducts.push(...prepareData);
        });
    }

    /**
     * Переключение на следующий слайд.
     */
    nextSlide() {
        this.sliderIndex = this.sliderIndex + 2;

        if (this.sliderIndex >= this.sliderItems.length) {
            this.sliderIndex = 0;
        }

        this.updateSlider();
    }

    /**
     * Переключение к предыдущему слайду.
     */
    prevSlide() {
        let prevIndex = this.sliderIndex - 2;

        if (prevIndex < 0) {
            this.sliderIndex =
                this.initSliderItems.length -
                (this.initSliderItems.length % 2 || 2);
        } else {
            this.sliderIndex = prevIndex;
        }

        this.updateSlider();
    }

    /**
     * Обновление слайдера.
     */
    updateSlider() {
        // Определяем новые элементы для слайдера
        const items = this.sliderItems.slice(
            this.sliderIndex,
            this.sliderIndex + 2,
        );

        this.initSliderItems = [...items];
    }
}

@NgModule({
    imports: [NgForOf, CardProductComponent, RouterLink, NgIf, NgStyle],
    declarations: [MainComponent],
    exports: [MainComponent],
    providers: [BehaviorSubjectService],
})
export class MainModule {}
