import { Component, ElementRef, OnInit } from "@angular/core";
import { NgClass, NgForOf } from "@angular/common";
import { CatalogService } from "../../pages/catalog/catalog.service";
import { shortCatalog } from "../../models/Catalog";
import { CardComponent } from "../card/card.component";

@Component({
    selector: "app-slider",
    standalone: true,
    imports: [NgForOf, CardComponent, NgClass],
    providers: [CatalogService],
    templateUrl: "./slider.component.html",
    styleUrl: "./slider.component.scss",
})
export class SliderComponent implements OnInit {
    // TODO: Данные для теста или можно использовать как промо-товары
    initSliderItems: shortCatalog[] = [];

    sliderIndex = 0; // Текущий индекс
    sliderItems: shortCatalog[] = [];

    constructor(
        private catalogService: CatalogService,
        private el: ElementRef,
    ) {}

    ngOnInit() {
        this.catalogService.getProdCarousel().subscribe((data) => {
            this.initSliderItems = [...data];
            this.updateSlider();
        });
    }

    /**
     * Переключение на следующий слайд.
     */
    nextSlide() {
        let nextIndex = this.sliderIndex + 4; // Обновляем индекс

        // Если индекс больше или равен количеству слайдов, то установить индекс в 0
        if (nextIndex >= this.initSliderItems.length) {
            this.sliderIndex = 0;
        } else {
            this.sliderIndex = nextIndex;
        }

        this.updateSlider(); // Обновляем слайдер
    }

    /**
     * Переключение на предыдущий слайд.
     */
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

    /**
     * Перерисовка слайдера.
     */
    updateSlider() {
        // Определяем новые элементы для слайдера
        const items = this.initSliderItems.slice(
            this.sliderIndex,
            this.sliderIndex + 4,
        );

        this.sliderItems = [...items];
        this.updateNavigation();
    }

    /**
     * Обновление кнопок навигации.
     */
    updateNavigation() {
        const navigation = document.querySelectorAll(".navigation__item");

        navigation.forEach((item) => {
            item.classList.remove("active");
        });
        if (window.onload)
            navigation[this.sliderIndex / 4].classList.add("active");
    }

    /**
     * Отслеживание нажатия на кнопки навигации.
     */
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
