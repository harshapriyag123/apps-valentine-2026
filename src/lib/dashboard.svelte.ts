import { subscribeToCards } from './dashboard';
import type { Card } from './cards';

export class DashboardState {
  cards = $state<Card[]>([]);
  loading = $state(true);
  username = $state('');
  hasCard = $derived(this.cards.length > 0);

  constructor(username: string) {
    this.username = username;
    
    $effect(() => {
      if (!this.username) return;
      
      this.loading = true;
      const unsubscribe = subscribeToCards(this.username, (updatedCards) => {
        this.cards = updatedCards;
        this.loading = false;
      });

      return () => {
        unsubscribe();
      };
    });
  }
}
