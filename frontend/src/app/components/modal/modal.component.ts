import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-modal",
    standalone: true,
    imports: [NgIf],
    templateUrl: "./modal.component.html",
    styleUrl: "./modal.component.scss",
})
export class ModalComponent {
    @Input() title: string = "";
    @Input() content: string = "";
    @Input() btnActionText: string = "";
    @Input() isShow: boolean = false;
    @Input() isNoAction: boolean = false;
    @Output() statusChange = new EventEmitter<boolean>();

    constructor() {}

    /**
     * Закрытие модального окна.
     * @param event
     */
    close(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            this.isShow = false;
            this.changeStatus(false);
        }
    }

    /**
     * Смена статуса для запуска действий в родильном компоненте.
     * @param condition
     */
    changeStatus(condition: boolean) {
        this.statusChange.emit(condition);
    }
}
