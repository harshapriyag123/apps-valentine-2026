
export type SendingAnimationType = "flying-letter" | "heartbeat-burst" | "soft-dissolve";

export class UiState {
  shareModalUrl = $state("");
  isShareModalOpen = $state(false);
  prefersReducedMotion = $state(false);

  constructor() {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.prefersReducedMotion = mediaQuery.matches;
      
      const listener = (e: MediaQueryListEvent) => {
        this.prefersReducedMotion = e.matches;
      };
      
      mediaQuery.addEventListener("change", listener);
    }
  }

  openShareModal(cardId: string) {
    this.shareModalUrl = `${window.location.origin}/card/${cardId}`;
    this.isShareModalOpen = true;
  }

  closeShareModal() {
    this.isShareModalOpen = false;
  }
}

export const uiState = new UiState();

export function getRandomSendingAnimation(): SendingAnimationType {
  const animations: SendingAnimationType[] = ["flying-letter", "heartbeat-burst", "soft-dissolve"];
  return animations[Math.floor(Math.random() * animations.length)];
}
