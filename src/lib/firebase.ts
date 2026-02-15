import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
	authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

const missingConfigKeys = Object.entries(firebaseConfig)
	.filter(([, value]) => !value)
	.map(([key]) => key);

export const isFirebaseConfigured = missingConfigKeys.length === 0;
export const firebaseConfigErrors = missingConfigKeys;

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const useEmulator = import.meta.env.PUBLIC_USE_FIRESTORE_EMULATOR === "true";
const emulatorHost = import.meta.env.PUBLIC_FIRESTORE_EMULATOR_HOST ?? "localhost";
const emulatorPort = Number(
	import.meta.env.PUBLIC_FIRESTORE_EMULATOR_PORT ?? "8080",
);

if (import.meta.env.DEV && useEmulator) {
	connectFirestoreEmulator(db, emulatorHost, emulatorPort);
}
