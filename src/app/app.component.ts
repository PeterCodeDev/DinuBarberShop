import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import * as AOS from 'aos';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, CustomCursorComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => AOS.refreshHard(), 0);
      });
  }
}
