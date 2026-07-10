import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LocationComponent } from './components/location/location.component';

export const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'ubicacion', component: LocationComponent },
  { path: '**', redirectTo: '' }
];
