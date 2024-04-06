import { Component, ElementRef, OnInit } from "@angular/core";
import { NgForOf } from "@angular/common";
import { CatalogService } from "../../services/catalog.service";
import { Slider } from "../../models/Catalog";
import { CardComponent } from "../card/card.component";

@Component({
    selector: "app-slider",
    standalone: true,
    imports: [NgForOf, CardComponent],
    providers: [CatalogService],
    templateUrl: "./slider.component.html",
    styleUrl: "./slider.component.scss",
})
export class SliderComponent implements OnInit {
    // TODO: Данные для теста
    initSliderItems: Slider[] = [
        {
            id: 1,
            title: "Подобрано для вас id: 1",
            cost: 12123,
        },
        {
            id: 2,
            title: "Подобрано для вас id: 1",
            cost: 12123,
        },
        {
            id: 3,
            title: "Подобрано для вас id: 1",
            cost: 12123,
        },
        {
            id: 4,
            title: "Подобрано для вас id: 1",
            cost: 12123,
        },
    ];

    sliderIndex = 0;
    sliderItems: Slider[] = [];

    constructor(
        private catalogService: CatalogService,
        private el: ElementRef,
    ) {}

    ngOnInit() {
        this.catalogService.getProdCarousel().subscribe((data) => {
            // TODO: Отправлять только ...data
            this.initSliderItems = [...this.initSliderItems, ...data];
        });
        this.updateSlider();
    }

    nextSlide() {
        let nextIndex = this.sliderIndex + 4;

        if (nextIndex >= this.initSliderItems.length) {
            this.sliderIndex = 0;
        } else {
            this.sliderIndex = nextIndex;
        }

        this.updateSlider();
    }

    prevSlide() {
        let prevIndex = this.sliderIndex - 4;

        if (prevIndex < 0) {
            this.sliderIndex =
                this.initSliderItems.length -
                (this.initSliderItems.length % 4 || 4);
        } else {
            this.sliderIndex = prevIndex;
        }

        this.updateSlider();
    }

    updateSlider() {
        const items = this.initSliderItems.slice(
            this.sliderIndex,
            this.sliderIndex + 4,
        );
        this.sliderItems = [...items];
        this.updateNavigation();
    }

    updateNavigation() {
        const navigation = document.querySelectorAll(".navigation__item");

        navigation.forEach((item) => {
            item.classList.remove("active");
        });
        navigation[this.sliderIndex / 4].classList.add("active");
    }

    trackNavigation() {
        const navigation =
            this.el.nativeElement.querySelectorAll(".navigation__item");

        navigation.forEach((item: any) => {
            item.addEventListener("click", () => {
                this.sliderIndex = +item.getAttribute("data-index");
                this.updateSlider();
            });
        });
    }
}
