import { updateCardStatus, type Card } from './cards';
import { db } from './firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export class ReceiverViewLogic {
  id: string;
  card = $state<Card | null>(null);
  noButtonPos = $state({ x: 0, y: 0 });
  yesButtonScale = $state(1);
  onAccept?: () => void;

  // Reply features
  replyText = $state('');
  replySubmitting = $state(false);
  replySuccess = $state(false);

  constructor(id: string = '', initialCard?: Card, onAccept?: () => void) {
    this.id = id;
    if (initialCard) {
      this.card = initialCard;
    }
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

  async submitReply() {
    if (!this.id || !this.replyText.trim()) return;

    this.replySubmitting = true;
    try {
      const docRef = doc(db, 'cards', this.id);
      await updateDoc(docRef, {
        replyText: this.replyText,
        updatedAt: serverTimestamp()
      });

      if (this.card?.hideButtons) {
        await updateCardStatus(this.id, 'replied');
      }

      this.replySuccess = true;
      this.replyText = '';
    } catch (err) {
      console.error('Failed to submit reply:', err);
    } finally {
      this.replySubmitting = false;
    }
  }
}
