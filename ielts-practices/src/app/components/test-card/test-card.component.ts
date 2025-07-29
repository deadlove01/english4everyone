import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { IeltsTest } from '../../core/models/interfaces';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-test-card',
  imports: [SharedModule],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.scss',
  animations: [
    trigger('cardHover', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class TestCardComponent {
  @Input() test!: IeltsTest;
  @Output() startTest = new EventEmitter<IeltsTest>();

  onStartTest() {
    this.startTest.emit(this.test);
  }

  getTypeIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'reading': 'book',
      'listening': 'headphones',
      'writing': 'edit',
      'speaking': 'mic'
    };
    return icons[type] || 'quiz';
  }

  getDifficultyColor(difficulty: string): string {
    const colors: {[key: string]: string} = {
      'beginner': '#4CAF50',
      'intermediate': '#FF9800',
      'advanced': '#F44336'
    };
    return colors[difficulty] || '#757575';
  }

  formatViewCount(count: number): string {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/default-test.jpg';
  }
}
