import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'IELTS Practices - Master Your IELTS Exam'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
