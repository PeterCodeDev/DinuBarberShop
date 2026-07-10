import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  images = [
    { src: 'assets/img/foto1.jpg', alt: 'Interior de DinuBarberShop' },
    { src: 'assets/img/foto2.jpg', alt: 'Zona de corte y detalle' },
    { src: 'assets/img/foto3.jpg', alt: 'Estilo premium de barbería' },
    { src: 'assets/img/foto4.jpg', alt: 'Corte moderno realizado en barbería' }
  ];

  activeIndex = 0;
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  prevSlide(): void {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
  }

  setSlide(index: number): void {
    this.activeIndex = index;
  }
}
