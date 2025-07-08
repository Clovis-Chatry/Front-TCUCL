import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OngletStatusService {
  private statuses = new BehaviorSubject<Record<string, boolean>>({});
  statuses$ = this.statuses.asObservable();

  setStatus(path: string, status: boolean): void {
    const current = this.statuses.getValue();
    this.statuses.next({ ...current, [path]: status });
  }

  setStatuses(newStatuses: Record<string, boolean>): void {
    const current = this.statuses.getValue();
    this.statuses.next({ ...current, ...newStatuses });
  }

  getStatus(path: string): boolean {
    return this.statuses.getValue()[path] ?? false;
  }
}
