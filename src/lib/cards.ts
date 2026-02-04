import {
	addDoc,
	collection,
	doc,
	getDoc,
	onSnapshot,
	serverTimestamp,
	type Timestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Card {
	id?: string;
	sender: string;
	senderUsername: string;
	receiver: string;
	message: string;
	theme: "romantic" | "playful" | "elegant";
	status: "sent" | "viewed" | "accepted" | "declined";
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export async function createCard(
	cardData: Omit<Card, "id" | "status" | "createdAt" | "updatedAt">,
) {
	const cardsCol = collection(db, "cards");
	const newCard = {
		...cardData,
		status: "sent",
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	};
	const docRef = await addDoc(cardsCol, newCard);
	return docRef.id;
}

export async function getCard(id: string): Promise<Card | null> {
	const docRef = doc(db, "cards", id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return { id: docSnap.id, ...docSnap.data() } as Card;
	}
	return null;
}

export async function updateCardStatus(id: string, status: Card["status"]) {
	const docRef = doc(db, "cards", id);
	await updateDoc(docRef, {
		status,
		updatedAt: serverTimestamp(),
	});
}

/**
 * Subscribes to a card's updates.
 * In Svelte 5, this should be used inside an $effect or a custom state class.
 */
export function subscribeToCard(
	id: string,
	callback: (card: Card | null) => void,
) {
	const docRef = doc(db, "cards", id);
	return onSnapshot(docRef, (docSnap) => {
		if (docSnap.exists()) {
			callback({ id: docSnap.id, ...docSnap.data() } as Card);
		} else {
			callback(null);
		}
	});
}
