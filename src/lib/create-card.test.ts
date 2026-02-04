import { describe, it, expect, mock, beforeAll } from 'bun:test';

// Mock Svelte 5 runes globally
beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$derived = (v: any) => v;
});

import { CreateCardFormState } from './create-card.svelte';

// Mock the cards service
mock.module('./cards', () => ({
  createCard: async () => 'test-id'
}));

describe('CreateCardFormState', () => {
  it('should initialize with empty values', () => {
    const form = new CreateCardFormState();
    expect(form.sender).toBe('');
    expect(form.receiver).toBe('');
    expect(form.message).toBe('');
    expect(form.theme).toBe('romantic');
  });

  it('should be invalid when fields are empty', () => {
    const form = new CreateCardFormState();
    expect(form.isValid).toBe(false);
  });

  it('should be valid when all fields are filled', () => {
    const form = new CreateCardFormState();
    form.sender = 'Romeo';
    form.receiver = 'Juliet';
    form.message = 'I love you';
    expect(form.isValid).toBe(true);
  });

  it('should update theme correctly', () => {
    const form = new CreateCardFormState();
    form.theme = 'playful';
    expect(form.theme).toBe('playful');
    form.theme = 'elegant';
    expect(form.theme).toBe('elegant');
  });

  it('should initialize with provided sender info', () => {
    const form = new CreateCardFormState('Romeo', 'romeo123');
    expect(form.sender).toBe('Romeo');
    expect(form.senderUsername).toBe('romeo123');
  });

  it('should set error if submitting when invalid', async () => {
    const form = new CreateCardFormState();
    await form.submit();
    expect(form.error).toBe('Please fill in all fields.');
  });

  it('should handle custom buttons correctly', () => {
    const form = new CreateCardFormState('Romeo', 'romeo');
    form.receiver = 'Juliet';
    form.message = 'Love';
    
    expect(form.useCustomButtons).toBe(false);
    expect(form.isValid).toBe(true);
    
    form.useCustomButtons = true;
    form.button1Text = '';
    expect(form.isValid).toBe(false);
    
    form.button1Text = 'Yes!';
    expect(form.isValid).toBe(true);
  });

  it('should reset new feature fields after reset', () => {
    const form = new CreateCardFormState();
    form.useCustomButtons = true;
    form.allowReply = true;
    form.hideButtons = true;
    form.reset();
    expect(form.useCustomButtons).toBe(false);
    expect(form.allowReply).toBe(false);
    expect(form.hideButtons).toBe(false);
  });
});
