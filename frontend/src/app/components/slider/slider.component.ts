import { Component, OnInit } from "@angular/core";
import { NgForOf } from "@angular/common";

@Component({
    selector: "app-slider",
    standalone: true,
    imports: [NgForOf],
    templateUrl: "./slider.component.html",
    styleUrl: "./slider.component.scss",
})
export class SliderComponent implements OnInit {
    sliderItems: [] = [];

    constructor() {}

    ngOnInit() {}
}
