import { createUser, getUser, type User, updateLastLogin } from "./auth";
import { Timestamp } from "firebase/firestore";
import { firebaseConfigErrors, isFirebaseConfigured } from "./firebase";

export class AuthState {
	user = $state<User | null>(null);
	loading = $state(false);
	error = $state<string | null>(null);
	isSignupRequired = $state(false);
	pendingUsername = $state<string | null>(null);

	private formatAuthError(err: unknown, fallback: string) {
		if (!err || typeof err !== "object") {
			return fallback;
		}

		const code = (err as { code?: string }).code;
		if (code === "unavailable") {
			return "Cannot reach Firestore. If running locally, start the emulator or disable it.";
		}
		if (code === "permission-denied") {
			return "Permission denied. Please check Firestore rules.";
		}

		return fallback;
	}

	private createLocalUser(username: string, senderName: string): User {
		const now = Timestamp.now();
		return {
			username,
			senderName,
			createdAt: now,
			lastLoginAt: now,
		};
	}

	async login(username: string) {
		this.loading = true;
		this.error = null;
		this.isSignupRequired = false;
		this.pendingUsername = null;

		try {
			if (!isFirebaseConfigured) {
				if (import.meta.env.DEV) {
					// Local fallback for dev when Firebase config is missing.
					this.user = this.createLocalUser(username, username);
					this.isSignupRequired = false;
					this.pendingUsername = null;
					return;
				}
				this.error = `Missing Firebase config: ${firebaseConfigErrors.join(", ")}.`;
				return;
			}
			const existingUser = await getUser(username);
			if (existingUser) {
				await updateLastLogin(username);
				this.user = await getUser(username); // Get updated user
			} else {
				this.isSignupRequired = true;
				this.pendingUsername = username;
			}
		} catch (err) {
			this.error = this.formatAuthError(
				err,
				"Failed to login. Please try again.",
			);
			console.error(err);
		} finally {
			this.loading = false;
		}
	}

	async signup(senderName: string) {
		if (!this.pendingUsername) return;

		this.loading = true;
		this.error = null;

		try {
			if (!isFirebaseConfigured) {
				if (import.meta.env.DEV) {
					// Local fallback for dev when Firebase config is missing.
					this.user = this.createLocalUser(this.pendingUsername, senderName);
					this.isSignupRequired = false;
					this.pendingUsername = null;
					return;
				}
				this.error = `Missing Firebase config: ${firebaseConfigErrors.join(", ")}.`;
				return;
			}
			await createUser(this.pendingUsername, senderName);
			this.user = await getUser(this.pendingUsername);
			this.isSignupRequired = false;
			this.pendingUsername = null;
		} catch (err) {
			this.error = this.formatAuthError(
				err,
				"Failed to sign up. Please try again.",
			);
			console.error(err);
		} finally {
			this.loading = false;
		}
	}

	logout() {
		this.user = null;
		this.isSignupRequired = false;
		this.pendingUsername = null;
	}
}
