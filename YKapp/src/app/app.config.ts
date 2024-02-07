import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { tokenInterceptor } from './_service/token.interceptor';
import { CustomerEffects } from './_store/customer/customer.effects';
import { CustomerReducer } from './_store/customer/customer.reducer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideStore({ 'customer': CustomerReducer }),
    provideEffects([CustomerEffects])]
};
