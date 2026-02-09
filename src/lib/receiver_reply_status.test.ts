import { describe, it, expect, mock, beforeAll, beforeEach } from 'bun:test';

// Mock Svelte 5 runes globally
beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
});

// Mock dependencies
const mockUpdateStatus = mock(async () => {});
const mockUpdateDoc = mock(async () => {});

mock.module('./cards', () => ({
  updateCardStatus: mockUpdateStatus
}));

mock.module('firebase/firestore', () => ({
  updateDoc: mockUpdateDoc,
  doc: () => ({}),
  serverTimestamp: () => ({}),
  getFirestore: () => ({}),
}));

// Import after mocks
import { ReceiverViewLogic } from './receiver.svelte';
import type { Card } from './cards';

describe('ReceiverViewLogic - Reply Status', () => {
  beforeEach(() => {
    mockUpdateStatus.mockClear();
    mockUpdateDoc.mockClear();
  });

  it('should update status to "replied" when submitting reply on a card with hideButtons: true', async () => {
    const card: Card = {
      sender: 'Sender',
      senderUsername: 'sender',
      receiver: 'Receiver',
      message: 'Msg',
      theme: 'romantic',
      status: 'viewed',
      createdAt: {} as any,
      updatedAt: {} as any,
      hideButtons: true, // Key property
      allowReply: true
    };

    const logic = new ReceiverViewLogic('card-1', card);
    logic.replyText = 'My reply';
    
    await logic.submitReply();

    expect(mockUpdateDoc).toHaveBeenCalled(); // Should still save the text
    expect(mockUpdateStatus).toHaveBeenCalledWith('card-1', 'replied');
  });

  it('should NOT update status to "replied" when submitting reply on a card with hideButtons: false', async () => {
    const card: Card = {
      sender: 'Sender',
      senderUsername: 'sender',
      receiver: 'Receiver',
      message: 'Msg',
      theme: 'romantic',
      status: 'viewed',
      createdAt: {} as any,
      updatedAt: {} as any,
      hideButtons: false, // Key property
      allowReply: true
    };

    const logic = new ReceiverViewLogic('card-2', card);
    logic.replyText = 'My reply';
    
    await logic.submitReply();

    expect(mockUpdateDoc).toHaveBeenCalled(); // Should save the text
    expect(mockUpdateStatus).not.toHaveBeenCalledWith('card-2', 'replied');
  });
});
