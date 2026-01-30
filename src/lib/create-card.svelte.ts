import { createCard } from './cards';

export class CreateCardFormState {
  sender = $state('');
  receiver = $state('');
  message = $state('');
  theme = $state<'romantic' | 'playful' | 'elegant'>('romantic');
  
  submitting = $state(false);
  error = $state<string | null>(null);
  success = $state<string | null>(null);

  get isValid() {
    return this.sender.trim() !== '' && 
           this.receiver.trim() !== '' && 
           this.message.trim() !== '';
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
