import { createCard } from './cards';

export class CreateCardFormState {
  sender = $state('');
  senderUsername = $state('');
  receiver = $state('');
  message = $state('');
  theme = $state<'romantic' | 'playful' | 'elegant'>('romantic');
  
  constructor(sender: string = '', senderUsername: string = '') {
    this.sender = sender;
    this.senderUsername = senderUsername;
  }

  async submit() {
    if (!this.isValid) {
      this.error = 'Please fill in all fields.';
      return;
    }

    this.submitting = true;
    this.error = null;
    this.success = null;

    try {
      const id = await createCard({
        sender: this.sender,
        senderUsername: this.senderUsername,
        receiver: this.receiver,
        message: this.message,
        theme: this.theme
      });
      this.success = id;
      this.reset();
    } catch (err) {
      this.error = 'Failed to create card. Please try again.';
      console.error(err);
    } finally {
      this.submitting = false;
    }
  }

  reset() {
    this.sender = '';
    this.receiver = '';
    this.message = '';
    this.theme = 'romantic';
  }
}
