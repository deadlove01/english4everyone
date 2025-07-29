export interface IeltsTest {
  id: number;
  title: string;
  thumbnailUrl: string;
  badgeText?: string;
  viewCount: number;
  type: 'reading' | 'listening' | 'writing' | 'speaking';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  description: string;
}

export interface PaginationInfo {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface NavLink {
  label: string;
  route: string;
  icon?: string;
}

export interface ContactMethod {
  type: 'email' | 'phone' | 'address';
  label: string;
  value: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  route: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface FilterOptions {
  searchTerm: string;
  selectedTypes: string[];
  sortBy: 'name' | 'popularity' | 'difficulty';
  sortOrder: 'asc' | 'desc';
}
