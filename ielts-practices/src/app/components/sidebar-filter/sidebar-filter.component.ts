import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FilterOptions } from '../../core/models/interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-filter',
  imports: [SharedModule],
  templateUrl: './sidebar-filter.component.html',
  styleUrl: './sidebar-filter.component.scss'
})
export class SidebarFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<FilterOptions>();
  @Output() sortChange = new EventEmitter<{sortBy: string, sortOrder: string}>();
  @Output() searchChange = new EventEmitter<string>();

  filterForm: FormGroup;

  testTypes = [
    { value: 'reading', label: 'Reading', icon: 'book' },
    { value: 'listening', label: 'Listening', icon: 'headphones' },
    { value: 'writing', label: 'Writing', icon: 'edit' },
    { value: 'speaking', label: 'Speaking', icon: 'mic' }
  ];

  sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'difficulty', label: 'Difficulty' }
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      searchTerm: [''],
      selectedTypes: this.fb.array([]),
      sortBy: ['popularity'],
      sortOrder: ['desc']
    });
  }

  ngOnInit() {
    // Initialize test type checkboxes
    this.testTypes.forEach(() => {
      (this.filterForm.get('selectedTypes') as FormArray).push(this.fb.control(false));
    });

    // Listen for form changes
    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.emitFilterChanges();
    });

    // Listen specifically to search changes
    this.filterForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchChange.emit(searchTerm);
    });
  }

  get selectedTypesArray() {
    return this.filterForm.get('selectedTypes') as FormArray;
  }

  onTypeChange(index: number, checked: boolean) {
    this.selectedTypesArray.at(index).setValue(checked);
  }

  clearFilters() {
    this.filterForm.patchValue({
      searchTerm: '',
      sortBy: 'popularity',
      sortOrder: 'desc'
    });
    
    this.selectedTypesArray.controls.forEach(control => {
      control.setValue(false);
    });
  }

  private emitFilterChanges() {
    const formValue = this.filterForm.value;
    const selectedTypes: string[] = [];
    
    formValue.selectedTypes.forEach((selected: boolean, index: number) => {
      if (selected) {
        selectedTypes.push(this.testTypes[index].value);
      }
    });

    const filterOptions: FilterOptions = {
      searchTerm: formValue.searchTerm,
      selectedTypes,
      sortBy: formValue.sortBy,
      sortOrder: formValue.sortOrder
    };

    this.filterChange.emit(filterOptions);
    this.sortChange.emit({
      sortBy: formValue.sortBy,
      sortOrder: formValue.sortOrder
    });
  }
}
