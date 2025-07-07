import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnneeService {
  private _selectedYear = new BehaviorSubject<number>(new Date().getFullYear());
  selectedYear$ = this._selectedYear.asObservable();

  setSelectedYear(year: number): void {
    this._selectedYear.next(year);
  }

  getSelectedYear(): number {
    return this._selectedYear.getValue();
  }
}
