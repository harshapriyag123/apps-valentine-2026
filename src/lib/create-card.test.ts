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

  it('should set error if submitting when invalid', async () => {
    const form = new CreateCardFormState();
    await form.submit();
    expect(form.error).toBe('Please fill in all fields.');
  });
});
