import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService, ContactRequest } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  sending = false;
  sendMessage = '';
  sendError = '';

  contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s()-]{7,20}$/)]],
    requestType: ['Reserva' as 'Reserva' | 'Producto', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly contactService: ContactService
  ) {}

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.sendMessage = '';
    this.sendError = '';

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.sending = true;
    const payload: ContactRequest = this.contactForm.getRawValue();

    this.contactService.sendContactForm(payload).subscribe({
      next: (response) => {
        this.sendMessage = response.message;
        this.contactForm.reset({
          name: '',
          email: '',
          phone: '',
          requestType: 'Reserva',
          message: ''
        });
      },
      error: () => {
        this.sendError = 'No se pudo enviar la solicitud. Intenta de nuevo.';
      },
      complete: () => {
        this.sending = false;
      }
    });
  }
}
