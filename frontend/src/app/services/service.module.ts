import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BehaviorSubjectService } from "./behavior-subject.service";
import { StoreDataUserService } from "./storeDataUser.service";

@NgModule({
    exports: [],
    imports: [CommonModule, HttpClientModule],
    providers: [HttpClient, BehaviorSubjectService, StoreDataUserService],
})
export class ServiceModule {}
