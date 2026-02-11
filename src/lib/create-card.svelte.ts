import { createCard } from "./cards";
import { uiState } from "./ui.svelte";

export class CreateCardFormState {
	sender = $state("");

	senderUsername = $state("");

	receiver = $state("");

	message = $state("");

	theme = $state<"romantic" | "playful" | "elegant">("romantic");

	// New Features

	useCustomButtons = $state(false);

	button1Text = $state("Yes!");

	button2Text = $state("No");

	hideButtons = $state(false);

	allowReply = $state(false);

	submitting = $state(false);

	error = $state<string | null>(null);

	success = $state<string | null>(null);

	constructor(sender: string = "", senderUsername: string = "") {
		this.sender = sender;

		this.senderUsername = senderUsername;
	}

	get isValid() {
		return (
			this.sender.trim() !== "" &&
			this.receiver.trim() !== "" &&
			this.message.trim() !== "" &&
			(!this.useCustomButtons ||
				(this.button1Text.trim() !== "" && this.button2Text.trim() !== "")) &&
			(!this.hideButtons || this.allowReply)
		);
	}

	async submit() {
		if (!this.isValid) {
			this.error = "Please fill in all fields.";

			return;
		}

		this.submitting = true;

		this.error = null;

		this.success = null;

		try {
			const id = await createCard({
				sender: this.sender,

				senderUsername: this.senderUsername,

				receiver: this.receiver,

				message: this.message,

				theme: this.theme,

				useCustomButtons: this.useCustomButtons,

				// Only include button text if custom buttons are used

				...(this.useCustomButtons
					? {
							button1Text: this.button1Text,

							button2Text: this.button2Text,
						}
					: {}),

				hideButtons: this.hideButtons,

				allowReply: this.allowReply,
			});

			this.success = id;

			// Immediately open the share modal so the user sees the QR code
			// even if the component unmounts (e.g. switching to dashboard view)
			uiState.openShareModal(id);

			this.reset();
		} catch (err: any) {
			this.error = err.message || "Failed to create card. Please try again.";

			console.error(err);
		} finally {
			this.submitting = false;
		}
	}

	reset() {
		this.receiver = "";

		this.message = "";

		this.theme = "romantic";

		this.useCustomButtons = false;

		this.button1Text = "Yes!";

		this.button2Text = "No";

		this.hideButtons = false;

		this.allowReply = false;

		// Don't reset sender info as it might be from auth
	}
}
