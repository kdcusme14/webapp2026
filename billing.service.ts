import { Injectable } from '@angular/core';
import { supabase } from '../../core/supabase.client';

@Injectable({ providedIn: 'root' })
export class BillingService {

  async subscribe(priceId: string, businessId: string) {
    const { data } = await supabase.functions.invoke(
      'create-checkout',
      {
        body: { priceId, businessId }
      }
    );

    window.location.href = data.url;
  }
}
