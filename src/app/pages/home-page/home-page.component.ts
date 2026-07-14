import { Component } from '@angular/core';
import { HomeComponent } from '../../components/home/home.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { ServicesComponent } from '../../components/services/services.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeComponent, ContactComponent, ServicesComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {}
