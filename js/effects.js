function setupPointerTrail() {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!finePointer || reducedMotion) {
    return;
  }

  let waiting = false;
  document.addEventListener("pointermove", (event) => {
    if (waiting) {
      return;
    }

    waiting = true;
    window.requestAnimationFrame(() => {
      const particle = document.createElement("span");
      particle.className = "trail-particle";
      particle.textContent = Math.random() > 0.72 ? "♥" : "✦";
      particle.style.left = `${event.clientX}px`;
      particle.style.top = `${event.clientY}px`;
      document.body.append(particle);
      window.setTimeout(() => particle.remove(), 700);
      waiting = false;
    });
  });
}
