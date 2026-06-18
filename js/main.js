document.addEventListener("DOMContentLoaded", () => {
  if (!returnToStartOnRefresh()) {
    setupLanguageToggle();
    setupBackgroundMusic();
    setupNameGate();
    setupCollectibles();
    setupRunawayButton();
    setupQuiz();
    setupEnding();
    setupPointerTrail();
  }
});
