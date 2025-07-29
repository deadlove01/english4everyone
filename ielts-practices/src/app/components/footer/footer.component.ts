import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FooterSection, SocialLink } from '../../core/models/interfaces';

@Component({
  selector: 'app-footer',
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() footerSections: FooterSection[] = [
    {
      title: 'Tests',
      links: [
        { label: 'Reading Tests', route: '/tests/reading' },
        { label: 'Listening Tests', route: '/tests/listening' },
        { label: 'Writing Tests', route: '/tests/writing' },
        { label: 'Speaking Tests', route: '/tests/speaking' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Study Guide', route: '/resources/guide' },
        { label: 'Tips & Strategies', route: '/resources/tips' },
        { label: 'Score Calculator', route: '/resources/calculator' },
        { label: 'FAQ', route: '/resources/faq' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', route: '/about' },
        { label: 'Careers', route: '/careers' },
        { label: 'Contact', route: '/contact' },
        { label: 'Blog', route: '/blog' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', route: '/support' },
        { label: 'Privacy Policy', route: '/privacy' },
        { label: 'Terms of Service', route: '/terms' },
        { label: 'Cookie Policy', route: '/cookies' }
      ]
    }
  ];

  @Input() socialLinks: SocialLink[] = [
    {
      platform: 'Facebook',
      url: 'https://facebook.com/ielts-practices',
      icon: 'facebook'
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/ielts-practices',
      icon: 'twitter'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/company/ielts-practices',
      icon: 'linkedin'
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/ielts-practices',
      icon: 'youtube'
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/ielts-practices',
      icon: 'instagram'
    }
  ];

  currentYear = new Date().getFullYear();

  subscriberEmail = '';

  onSubscribe() {
    if (this.subscriberEmail) {
      // Handle newsletter subscription
      console.log('Subscribing email:', this.subscriberEmail);
      this.subscriberEmail = '';
      // Show success message
    }
  }
}
