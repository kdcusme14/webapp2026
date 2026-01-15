import { Injectable } from '@angular/core';
import { supabase } from '../../core/supabase.client';

@Injectable({ providedIn: 'root' })
export class BranchService {

  async getUserBranches() {
    const { data, error } = await supabase
      .from('branches')
      .select('*');

    if (error) throw error;
    return data ?? [];
  }
}
