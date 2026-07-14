import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ServiceItem {
  name: string;
  price: number;
  duration: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="servicios" class="relative px-4 py-16 sm:px-6 lg:px-8">
      <!-- Glow Orbs -->
      <div class="float-orb absolute left-1/4 top-12 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
      <div class="float-orb absolute right-1/4 bottom-12 h-64 w-64 rounded-full bg-white/5 blur-3xl [animation-delay:2.5s]"></div>

      <div class="mx-auto max-w-7xl">
        <!-- Section Header -->
        <div class="mb-12 text-center" data-aos="fade-up">
          <p class="inline-block rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/70">
            Nuestra Carta
          </p>
          <h2 class="section-title mt-4">Precios & Servicios</h2>
          <p class="section-subtitle mx-auto">
            Descubre nuestra variedad de servicios premium de barbería. Calidad, precisión y confort en cada experiencia.
          </p>
        </div>

        <!-- Category Selector (Tabs) -->
        <div class="mb-12 flex justify-center" data-aos="fade-up" data-aos-delay="50">
          <div class="inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <button
              *ngFor="let cat of categories"
              type="button"
              (click)="activeCategory = cat.id"
              class="rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:px-8"
              [ngClass]="activeCategory === cat.id ? 'bg-white text-black shadow-md' : 'text-white/70 hover:text-white'"
            >
              {{ cat.name }}
            </button>
          </div>
        </div>

        <!-- Services Grid -->
        <div
          class="grid gap-6 transition-all duration-500"
          [ngClass]="{
            'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto': activeCategory === 'combos',
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': activeCategory !== 'combos'
          }"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            *ngFor="let service of getActiveServices(); let i = index"
            class="card-premium glass-edge group flex flex-col justify-between p-6 transition-all duration-500 hover:border-white/30"
          >
            <div>
              <!-- Service Title & Duration -->
              <div class="flex items-start justify-between gap-4">
                <h3 class="font-display text-lg font-semibold tracking-wide text-white transition-colors group-hover:text-white">
                  {{ service.name }}
                </h3>
                <span class="flex shrink-0 items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60">
                  <svg class="h-3.5 w-3.5 text-white/50" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  {{ service.duration }}
                </span>
              </div>

              <!-- Service Description -->
              <p class="mt-4 text-sm leading-relaxed text-white/70">
                {{ service.description }}
              </p>
            </div>

            <!-- Price and CTA -->
            <div class="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <div class="flex items-baseline gap-0.5">
                <span class="font-display text-2xl font-bold text-white">{{ service.price }}</span>
                <span class="text-sm font-semibold text-white/70">€</span>
              </div>
              <button
                type="button"
                (click)="scrollToContact()"
                class="btn-premium rounded-full border border-white/35 px-5 py-2 text-xs uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black"
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ServicesComponent {
  categories = [
    { id: 'cortes', name: 'Cortes' },
    { id: 'barba', name: 'Barba' },
    { id: 'combos', name: 'Combos' }
  ];

  activeCategory = 'cortes';

  private readonly servicesData: Record<string, ServiceItem[]> = {
    cortes: [
      {
        name: 'Corte Clásico',
        price: 15,
        duration: '30 min',
        description: 'Asesoramiento personalizado, corte tradicional a máquina y tijera, lavado relajante y peinado con pomada.'
      },
      {
        name: 'Corte Degradado / Fade',
        price: 18,
        duration: '40 min',
        description: 'Corte de tendencia con degradado de precisión (skin fade, low/mid/high fade), lavado y modelado.'
      },
      {
        name: 'Corte Dinu Premium',
        price: 22,
        duration: '45 min',
        description: 'Lavado con masaje capilar, corte de autor avanzado, perfilado de contornos a navaja y tónico estimulante.'
      }
    ],
    barba: [
      {
        name: 'Arreglo de Barba',
        price: 10,
        duration: '20 min',
        description: 'Diseño y recorte de barba, perfilado de mejillas y cuello con máquina, acabado con aceite de aroma premium.'
      },
      {
        name: 'Afeitado Clásico a Navaja',
        price: 15,
        duration: '30 min',
        description: 'Afeitado tradicional con ritual de toalla caliente, jabón artesanal batido, navaja y bálsamo reparador.'
      },
      {
        name: 'Ritual de Barba Dinu',
        price: 18,
        duration: '35 min',
        description: 'Perfilado premium a navaja, doble toalla caliente, masaje facial relajante, aceites esenciales e hidratación.'
      }
    ],
    combos: [
      {
        name: 'Corte & Barba Clásico',
        price: 23,
        duration: '50 min',
        description: 'El combo indispensable. Corte de pelo tradicional junto con un arreglo de barba perfilado a máquina.'
      },
      {
        name: 'Ritual Completo Dinu',
        price: 35,
        duration: '75 min',
        description: 'El servicio estrella de lujo. Corte Dinu Premium acompañado del Ritual de Barba Dinu y masaje capilar extendido.'
      }
    ]
  };

  getActiveServices(): ServiceItem[] {
    return this.servicesData[this.activeCategory] || [];
  }

  scrollToContact(): void {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
