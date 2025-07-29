import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-hero',
  imports: [SharedModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('heroAnimation', [
      transition(':enter', [
        query('.hero-content > *', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(200, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class HeroComponent {
  @Input() title: string = 'Master IELTS with Expert Practice Tests';
  @Input() subtitle: string = 'Improve your IELTS score with our comprehensive practice tests, detailed explanations, and personalized feedback.';
  @Input() ctaText: string = 'Start Practicing Now';
}
