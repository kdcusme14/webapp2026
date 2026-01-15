import { CanActivate } from '@angular/router';
import { supabase } from './supabase.client';

export class PlanGuard implements CanActivate {

  async canActivate() {
    const { data } = await supabase
      .from('businesses')
      .select('plan_expires_at')
      .single();

    return new Date(data.plan_expires_at) > new Date();
  }
}
