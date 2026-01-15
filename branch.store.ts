import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BranchStore {

  private key = 'branch_id';

  get activeBranch() {
    return localStorage.getItem(this.key);
  }

  setActiveBranch(branchId: string) {
    localStorage.setItem(this.key, branchId);
    window.location.reload(); // simple y efectivo
  }
}
