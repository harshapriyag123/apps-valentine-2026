import { createUser, getUser, type User, updateLastLogin } from "./auth";

export class AuthState {
	user = $state<User | null>(null);
	loading = $state(false);
	error = $state<string | null>(null);
	isSignupRequired = $state(false);
	pendingUsername = $state<string | null>(null);

	async login(username: string) {
		this.loading = true;
		this.error = null;
		this.isSignupRequired = false;
		this.pendingUsername = null;

		try {
			const existingUser = await getUser(username);
			if (existingUser) {
				await updateLastLogin(username);
				this.user = await getUser(username); // Get updated user
			} else {
				this.isSignupRequired = true;
				this.pendingUsername = username;
			}
		} catch (err) {
			this.error = "Failed to login. Please try again.";
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
			await createUser(this.pendingUsername, senderName);
			this.user = await getUser(this.pendingUsername);
			this.isSignupRequired = false;
			this.pendingUsername = null;
		} catch (err) {
			this.error = "Failed to sign up. Please try again.";
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
