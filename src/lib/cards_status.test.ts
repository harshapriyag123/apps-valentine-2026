import { describe, it, expect, beforeAll } from 'bun:test';
import { createCard, getCard, updateCardStatus } from './cards';
import { db } from './firebase';
import { connectFirestoreEmulator } from 'firebase/firestore';

describe('Card Status Replied', () => {
    beforeAll(() => {
        try {
            connectFirestoreEmulator(db, 'localhost', 8080);
        } catch (e) {
            // Ignore
        }
    });

    it('should allow status to be updated to replied', async () => {
        const username = `user_replied_status_${Date.now()}`;
        const cardData = {
            sender: 'Test Sender',
            senderUsername: username,
            receiver: 'Test Receiver',
            message: 'Hello!',
            theme: 'romantic' as const,
            hideButtons: true,
            allowReply: true
        };

        const id = await createCard(cardData);
        
        // This cast is necessary until we update the type definition
        await updateCardStatus(id, 'replied');

        const updatedCard = await getCard(id);
        expect(updatedCard?.status).toBe('replied');
    });
});
