import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { IeltsTest, PaginationInfo, FilterOptions } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private testsUrl = 'assets/data/tests.json';

  constructor(private http: HttpClient) { }

  getTests(filters?: FilterOptions, page: number = 1, pageSize: number = 6): Observable<{tests: IeltsTest[], pagination: PaginationInfo}> {
    return this.http.get<{tests: IeltsTest[]}>(this.testsUrl).pipe(
      map(data => {
        let filteredTests = [...data.tests];

        // Apply filters
        if (filters) {
          if (filters.searchTerm) {
            filteredTests = filteredTests.filter(test => 
              test.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
              test.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
            );
          }

          if (filters.selectedTypes.length > 0) {
            filteredTests = filteredTests.filter(test => 
              filters.selectedTypes.includes(test.type)
            );
          }

          // Apply sorting
          switch (filters.sortBy) {
            case 'name':
              filteredTests.sort((a, b) => {
                const compare = a.title.localeCompare(b.title);
                return filters.sortOrder === 'desc' ? -compare : compare;
              });
              break;
            case 'popularity':
              filteredTests.sort((a, b) => {
                const compare = a.viewCount - b.viewCount;
                return filters.sortOrder === 'desc' ? -compare : compare;
              });
              break;
            case 'difficulty':
              const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
              filteredTests.sort((a, b) => {
                const compare = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                return filters.sortOrder === 'desc' ? -compare : compare;
              });
              break;
          }
        }

        // Apply pagination
        const totalItems = filteredTests.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedTests = filteredTests.slice(startIndex, endIndex);

        const pagination: PaginationInfo = {
          totalItems,
          itemsPerPage: pageSize,
          currentPage: page,
          totalPages
        };

        return {
          tests: paginatedTests,
          pagination
        };
      }),
      catchError(error => {
        console.error('Error fetching tests:', error);
        // Return empty result on error
        return of({
          tests: [],
          pagination: {
            totalItems: 0,
            itemsPerPage: pageSize,
            currentPage: page,
            totalPages: 0
          }
        });
      }),
      delay(300) // Simulate network delay
    );
  }

  getTestById(id: number): Observable<IeltsTest | undefined> {
    return this.getTests().pipe(
      map(data => data.tests.find(test => test.id === id))
    );
  }
}
