import { updateCardStatus, type Card } from './cards';

export class ReceiverViewLogic {
  id: string;
  card = $state<Card | null>(null);
  noButtonPos = $state({ x: 0, y: 0 });
  yesButtonScale = $state(1);
  onAccept?: () => void;

  constructor(id: string, initialCard: Card, onAccept?: () => void) {
    this.id = id;
    this.card = initialCard;
    this.onAccept = onAccept;
  }

  async markAsViewed() {
    if (this.card?.status === 'sent') {
      await updateCardStatus(this.id, 'viewed');
    }
  }

  handleNoHover() {
    this.noButtonPos = {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200
    };
    this.yesButtonScale += 0.1;
  }

  async accept() {
    await updateCardStatus(this.id, 'accepted');
    this.onAccept?.();
  }

  async decline() {
    await updateCardStatus(this.id, 'declined');
  }
}
