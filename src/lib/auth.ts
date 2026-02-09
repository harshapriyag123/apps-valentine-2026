import {
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	type Timestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface User {
	username: string;
	senderName: string;
	createdAt: Timestamp;
	lastLoginAt: Timestamp;
}

export async function getUser(username: string): Promise<User | null> {
	const docRef = doc(db, "users", username);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return { username: docSnap.id, ...docSnap.data() } as User;
	}
	return null;
}

export async function createUser(
	username: string,
	senderName: string,
): Promise<void> {
	const docRef = doc(db, "users", username);
	await setDoc(docRef, {
		username, // Store explicitly as field too
		senderName,
		createdAt: serverTimestamp(),
		lastLoginAt: serverTimestamp(),
	});
}

export async function updateLastLogin(username: string): Promise<void> {
	const docRef = doc(db, "users", username);
	await updateDoc(docRef, {
		lastLoginAt: serverTimestamp(),
	});
}
