import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  requestType: 'Reserva' | 'Producto';
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  sendContactForm(payload: ContactRequest): Observable<ContactResponse> {
    const simulatedPayload = {
      service: 'emailjs_or_api',
      destination: 'trabajadores@dinubarbershop.com',
      ...payload
    };

    return of({
      success: true,
      message: `Solicitud enviada correctamente para ${simulatedPayload.destination}.`
    }).pipe(delay(1200));
  }
}
