import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ContactMethod } from '../../core/models/interfaces';

@Component({
  selector: 'app-contact-section',
  imports: [SharedModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {
  @Input() contactMethods: ContactMethod[] = [
    {
      type: 'email',
      label: 'Email Us',
      value: 'support@ielts-practices.com',
      icon: 'email'
    },
    {
      type: 'phone',
      label: 'Call Us',
      value: '+1 (555) 123-4567',
      icon: 'phone'
    },
    {
      type: 'address',
      label: 'Visit Us',
      value: '123 Learning Street, Education City, EC 12345',
      icon: 'location_on'
    }
  ];

  @Input() galleryImages: string[] = [
    'assets/images/gallery/study-1.jpg',
    'assets/images/gallery/study-2.jpg',
    'assets/images/gallery/study-3.jpg',
    'assets/images/gallery/study-4.jpg',
    'assets/images/gallery/study-5.jpg',
    'assets/images/gallery/study-6.jpg'
  ];

  faqs = [
    {
      question: 'How many practice tests are included?',
      answer: 'Our platform includes over 100 comprehensive practice tests covering all four IELTS skills: Reading, Writing, Listening, and Speaking.',
      expanded: false
    },
    {
      question: 'Can I track my progress?',
      answer: 'Yes! Our advanced analytics dashboard shows your progress over time, identifies weak areas, and provides personalized recommendations.',
      expanded: false
    },
    {
      question: 'Are the tests similar to the actual IELTS exam?',
      answer: 'Absolutely. Our tests are created by certified IELTS instructors and follow the exact format and difficulty level of the official IELTS exam.',
      expanded: false
    },
    {
      question: 'Do you offer mobile support?',
      answer: 'Yes, our platform is fully responsive and works perfectly on all devices including smartphones and tablets.',
      expanded: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    const parent = target.parentElement;
    if (parent) {
      // Hide the image and show skeleton
      target.style.display = 'none';
      parent.classList.add('show-skeleton');
    }
  }

  onImageLoad(event: Event) {
    const target = event.target as HTMLImageElement;
    const parent = target.parentElement;
    if (parent) {
      parent.classList.add('image-loaded');
    }
  }
}
