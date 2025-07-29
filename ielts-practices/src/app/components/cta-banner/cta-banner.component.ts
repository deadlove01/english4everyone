import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-cta-banner',
  imports: [SharedModule],
  templateUrl: './cta-banner.component.html',
  styleUrl: './cta-banner.component.scss',
  animations: [
    trigger('bannerAnimation', [
      transition(':enter', [
        query('.banner-content > *', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(150, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class CtaBannerComponent {
  features = [
    {
      icon: 'speed',
      title: 'Instant Feedback',
      description: 'Get immediate results and detailed explanations'
    },
    {
      icon: 'analytics',
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics'
    },
    {
      icon: 'school',
      title: 'Expert Content',
      description: 'Created by certified IELTS instructors'
    },
    {
      icon: 'mobile_friendly',
      title: 'Study Anywhere',
      description: 'Practice on any device, anytime'
    }
  ];
}
