import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { AppRouter } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), AppRouter],
}).catch(err => console.error(err));
