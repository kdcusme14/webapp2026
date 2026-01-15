import { Component, OnInit } from '@angular/core';
import { BranchService } from './branch.service';
import { BranchStore } from './branch.store';

@Component({
  selector: 'app-branch-selector',
  templateUrl: './branch-selector.component.html'
})
export class BranchSelectorComponent implements OnInit {

  branches: any[] = [];
  selected!: string | null;

  constructor(
    private branchService: BranchService,
    private branchStore: BranchStore
  ) {}

  async ngOnInit() {
    this.branches = await this.branchService.getUserBranches();
    this.selected = this.branchStore.activeBranch;
  }

  changeBranch(id: string) {
    this.branchStore.setActiveBranch(id);
  }
}
