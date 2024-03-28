import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { ServiceModule } from "./services/service.module";

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideClientHydration(), ServiceModule],
};
