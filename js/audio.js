const musicStateKey = "not-a-dm:music-state";
const backgroundMusicSource = "assets/you_everything.mp3";

function readMusicState() {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(musicStateKey));
    if (saved?.source === backgroundMusicSource) {
      return {
        currentTime: Number.isFinite(saved.currentTime) ? saved.currentTime : 0,
        wantsMusic: saved.wantsMusic !== false,
      };
    }
  } catch {
    // Storage may be unavailable when the site is opened directly via file://.
  }
  return { currentTime: 0, wantsMusic: true };
}

function saveMusicState(audio, wantsMusic) {
  try {
    window.sessionStorage.setItem(
      musicStateKey,
      JSON.stringify({
        source: backgroundMusicSource,
        currentTime: audio.currentTime,
        wantsMusic,
      }),
    );
  } catch {
    // Music still works without cross-page persistence when storage is blocked.
  }
}

function createBackgroundMusicControls() {
  const toggle = document.createElement("button");
  const status = document.createElement("p");
  const audio = document.createElement("audio");
  const source = document.createElement("source");

  toggle.className = "sound-toggle";
  toggle.id = "sound-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", text("soundOnLabel"));
  toggle.setAttribute("aria-pressed", "false");
  toggle.innerHTML = `
    <svg class="sound-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z"></path>
      <path class="sound-toggle__waves" d="M16 8.5c1.3 1.9 1.3 5.1 0 7M19 6c2.8 3.2 2.8 8.8 0 12"></path>
      <path class="sound-toggle__slash" d="m16 9 5 5m0-5-5 5"></path>
    </svg>`;

  status.className = "sound-status";
  status.id = "sound-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  audio.id = "background-music";
  audio.loop = true;
  audio.preload = "metadata";
  source.src = backgroundMusicSource;
  source.type = "audio/mpeg";
  audio.append(source);
  document.body.append(toggle, status, audio);
  return { audio, toggle, status };
}

function setupBackgroundMusic() {
  const controls = document.querySelector("#background-music")
    ? {
        audio: document.querySelector("#background-music"),
        toggle: document.querySelector("#sound-toggle"),
        status: document.querySelector("#sound-status"),
      }
    : createBackgroundMusicControls();
  const { audio, toggle, status } = controls;
  const savedState = readMusicState();
  audio.volume = 0.25;
  let wantsMusic = savedState.wantsMusic;

  function showPlayingState(isPlaying) {
    toggle.classList.toggle("is-playing", isPlaying);
    toggle.setAttribute("aria-pressed", String(isPlaying));
    toggle.setAttribute(
      "aria-label",
      text(isPlaying ? "soundOffLabel" : "soundOnLabel"),
    );
  }

  function removeInteractionFallback() {
    document.removeEventListener("pointerdown", startOnInteraction);
    document.removeEventListener("keydown", startOnInteraction);
  }

  async function startOnInteraction(event) {
    if (event.target.closest?.("#sound-toggle")) {
      return;
    }
    removeInteractionFallback();
    await playBackgroundMusic(false);
  }

  function armInteractionFallback() {
    document.addEventListener("pointerdown", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);
  }

  async function playBackgroundMusic(ignoreAutoplayBlock) {
    try {
      await audio.play();
      showPlayingState(true);
      clearTemporaryStatus(status);
      saveMusicState(audio, wantsMusic);
    } catch (error) {
      showPlayingState(false);
      if (ignoreAutoplayBlock && error.name === "NotAllowedError") {
        armInteractionFallback();
        return;
      }

      const source = audio.querySelector("source");
      const fileIsMissing =
        !source || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;
      showTemporaryStatus(
        status,
        fileIsMissing ? "soundUnavailable" : "soundError",
      );
    }
  }

  toggle.addEventListener("click", async () => {
    if (!audio.paused) {
      wantsMusic = false;
      removeInteractionFallback();
      audio.pause();
      showPlayingState(false);
      clearTemporaryStatus(status);
      saveMusicState(audio, wantsMusic);
      return;
    }

    wantsMusic = true;
    removeInteractionFallback();
    await playBackgroundMusic(false);
  });

  function restorePlaybackPosition() {
    if (savedState.currentTime > 0 && Number.isFinite(audio.duration)) {
      audio.currentTime = savedState.currentTime % audio.duration;
    }
    if (wantsMusic) {
      playBackgroundMusic(true);
    } else {
      showPlayingState(false);
    }
  }

  window.addEventListener("pagehide", () => saveMusicState(audio, wantsMusic));
  audio.addEventListener("ended", () => showPlayingState(false));
  if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
    restorePlaybackPosition();
  } else {
    audio.addEventListener("loadedmetadata", restorePlaybackPosition, {
      once: true,
    });
  }
}
