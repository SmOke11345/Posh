import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withFetch,
} from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth-interceptors.service";
import { provideEnvironmentNgxMask } from "ngx-mask";

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideRouter(routes),
        provideEnvironmentNgxMask(),

        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
};
