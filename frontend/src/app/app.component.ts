import {Component} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {LoginPageComponent} from './login-page/login-page.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
