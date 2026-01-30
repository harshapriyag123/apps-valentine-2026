import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDYlPztG3XmOvfMwaLs8U32elDNWjOnY44",
	authDomain: "tainted-development.firebaseapp.com",
	projectId: "tainted-development",
	storageBucket: "tainted-development.firebasestorage.app",
	messagingSenderId: "672379756589",
	appId: "1:672379756589:web:92d088ebb496d00a6058a4",
	measurementId: "G-ZZEZNKHV3Y",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);