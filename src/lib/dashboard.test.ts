import { describe, it, expect, mock, beforeAll } from 'bun:test';

// Mock Svelte 5 runes globally
beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$derived = (fn: any) => fn;
  (globalThis as any).$effect = (fn: any) => fn();
});

// Mock the dashboard service
mock.module('./dashboard', () => ({
  subscribeToCards: (username: string, cb: any) => {
    // Simulate finding cards for this username
    cb([{ id: 'card-1', senderUsername: username, sender: 'test', receiver: 'test', status: 'sent' }]);
    return () => {};
  }
}));

import { DashboardState } from './dashboard.svelte';

describe('DashboardState', () => {
  it('should initialize with empty cards', () => {
    const dashboard = new DashboardState('');
    expect(dashboard.cards.length).toBe(0);
  });

  it('should load cards for the username', () => {
    const dashboard = new DashboardState('testuser');
    // The mock immediately calls back, so cards should be populated
    expect(dashboard.cards.length).toBe(1);
    expect(dashboard.cards[0].senderUsername).toBe('testuser');
  });
});
