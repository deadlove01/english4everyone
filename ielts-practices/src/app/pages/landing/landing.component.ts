import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { SidebarFilterComponent } from '../../components/sidebar-filter/sidebar-filter.component';
import { TestGridComponent } from '../../components/test-grid/test-grid.component';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TestService } from '../../core/services/test.service';
import { IeltsTest, PaginationInfo, NavLink, FilterOptions } from '../../core/models/interfaces';
import { PageEvent } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  imports: [
    SharedModule,
    HeaderComponent,
    HeroComponent,
    SidebarFilterComponent,
    TestGridComponent,
    CtaBannerComponent,
    ContactSectionComponent,
    FooterComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private testService = inject(TestService);
  private breakpointObserver = inject(BreakpointObserver);

  // Data properties
  tests: IeltsTest[] = [];
  paginationInfo: PaginationInfo = {
    totalItems: 0,
    itemsPerPage: 6,
    currentPage: 1,
    totalPages: 1
  };
  loading = false;
  currentFilters: FilterOptions = {
    searchTerm: '',
    selectedTypes: [],
    sortBy: 'popularity',
    sortOrder: 'desc'
  };

  // Navigation data
  navLinks: NavLink[] = [
    { label: 'Tests', route: '/tests', icon: 'quiz' },
    { label: 'Resources', route: '/resources', icon: 'library_books' },
    { label: 'Progress', route: '/progress', icon: 'analytics' },
    { label: 'About', route: '/about', icon: 'info' }
  ];

  // Responsive
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.loadTests();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTests(page: number = 1) {
    this.loading = true;
    
    this.testService.getTests(this.currentFilters, page, this.paginationInfo.itemsPerPage)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (response) => {
          this.tests = response.tests;
          this.paginationInfo = response.pagination;
        },
        error: (error) => {
          console.error('Error loading tests:', error);
          this.tests = [];
        }
      });
  }

  onFilterChange(filters: FilterOptions) {
    this.currentFilters = filters;
    this.paginationInfo.currentPage = 1;
    this.loadTests(1);
  }

  onSortChange(sortOptions: {sortBy: string, sortOrder: string}) {
    this.currentFilters.sortBy = sortOptions.sortBy as any;
    this.currentFilters.sortOrder = sortOptions.sortOrder as any;
    this.paginationInfo.currentPage = 1;
    this.loadTests(1);
  }

  onSearchChange(searchTerm: string) {
    this.currentFilters.searchTerm = searchTerm;
    this.paginationInfo.currentPage = 1;
    this.loadTests(1);
  }

  onPageChange(event: PageEvent) {
    this.paginationInfo.currentPage = event.pageIndex + 1;
    this.paginationInfo.itemsPerPage = event.pageSize;
    this.loadTests(this.paginationInfo.currentPage);
  }

  onTestStart(test: IeltsTest) {
    console.log('Starting test:', test);
    // Handle test start logic here
    // Could navigate to test page: this.router.navigate(['/test', test.id]);
  }
}
