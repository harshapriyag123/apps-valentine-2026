import { describe, it, expect, mock, beforeAll } from 'bun:test';

// Mock Svelte 5 runes globally
beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$effect = (fn: any) => fn();
});

// Mock the dashboard service
mock.module('./dashboard', () => ({
  subscribeToCards: (ids: string[], cb: any) => {
    cb(ids.map(id => ({ id, sender: 'test', senderUsername: 'test', receiver: 'test', status: 'sent' })));
    return () => {};
  }
}));

import { DashboardState } from './dashboard.svelte';

describe('DashboardState', () => {
  it('should initialize with empty cards', () => {
    const dashboard = new DashboardState();
    expect(dashboard.cards.length).toBe(0);
  });

  it('should add a card and update cardIds', () => {
    const dashboard = new DashboardState();
    dashboard.addCard('test-1');
    expect(dashboard.cardIds).toContain('test-1');
  });
});
