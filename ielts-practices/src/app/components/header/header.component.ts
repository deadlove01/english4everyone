import { Component, Input, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NavLink } from '../../core/models/interfaces';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() navLinks: NavLink[] = [];
  @Input() logoUrl: string = 'assets/images/logo.png';
  @Input() ctaButtonText: string = 'Get Started';

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
