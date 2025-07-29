import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TestCardComponent } from '../test-card/test-card.component';
import { IeltsTest, PaginationInfo } from '../../core/models/interfaces';
import { PageEvent } from '@angular/material/paginator';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-test-grid',
  imports: [SharedModule, TestCardComponent],
  templateUrl: './test-grid.component.html',
  styleUrl: './test-grid.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class TestGridComponent {
  @Input() testList: IeltsTest[] = [];
  @Input() paginationInfo!: PaginationInfo;
  @Input() loading: boolean = false;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() testStart = new EventEmitter<IeltsTest>();

  // Make Math available in template
  Math = Math;

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  onTestStart(test: IeltsTest) {
    this.testStart.emit(test);
  }

  trackByTestId(index: number, test: IeltsTest): number {
    return test.id;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
