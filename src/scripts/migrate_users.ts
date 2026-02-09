import {
	collection,
	connectFirestoreEmulator,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Connect to emulator
try {
	connectFirestoreEmulator(db, "localhost", 8080);
} catch (_e) {}

async function migrateUsers() {
	console.log("Migrating users...");
	const querySnapshot = await getDocs(collection(db, "users"));
	let count = 0;
	for (const userDoc of querySnapshot.docs) {
		const data = userDoc.data();
		if (!data.username) {
			await updateDoc(doc(db, "users", userDoc.id), {
				username: userDoc.id,
			});
			count++;
		}
	}
	console.log(`Migrated ${count} users.`);
}

migrateUsers().then(() => process.exit(0));
