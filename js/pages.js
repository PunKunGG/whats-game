function setupNameGate() {
  const form = document.querySelector("#name-form");
  const input = document.querySelector("#player-name");
  const status = document.querySelector("#form-status");

  if (!form || !input || !status) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const normalizedName = normalizeName(input.value);

    if (!normalizedName) {
      status.textContent = text("emptyName");
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }

    status.textContent = "";
    input.removeAttribute("aria-invalid");

    if (normalizedName === "cat" || normalizedName === "แมว") {
      window.location.href = buildJourneyUrl("cat.html", journey);
      return;
    }

    if (normalizedName === "dog" || normalizedName === "หมา") {
      window.location.href = buildJourneyUrl("dog.html", journey);
      return;
    }

    window.location.href = allowedNames.includes(normalizedName)
      ? buildJourneyUrl("secret.html", journey)
      : buildJourneyUrl("wrong.html", journey);
  });

  input.addEventListener("input", () => {
    if (input.value.trim()) {
      status.textContent = "";
      input.removeAttribute("aria-invalid");
    }
  });
  document.addEventListener("languagechange", () => {
    if (input.getAttribute("aria-invalid") === "true") {
      status.textContent = text("emptyName");
    }
  });
}

function setupCollectibles() {
  const collectible = document.querySelector("[data-collectible]");
  const status = document.querySelector("[data-collectible-status]");

  if (!collectible) {
    return;
  }

  const id = collectible.dataset.collectible;
  if (journey.collected.has(id)) {
    collectible.classList.add("is-found");
    collectible.setAttribute("aria-pressed", "true");
  }

  collectible.addEventListener("click", () => {
    journey.collected.add(id);
    collectible.classList.add("is-found");
    collectible.setAttribute("aria-pressed", "true");
    collectible.disabled = true;

    if (status) {
      status.textContent = text("collectibleFound")(journey.collected.size);
    }

    updateSecretReward();
  });

  document.addEventListener("languagechange", () => {
    if (status && status.textContent) {
      status.textContent = text("collectibleFound")(journey.collected.size);
    }
  });
}

function setupRunawayButton() {
  const button = document.querySelector("#runaway-button");
  const status = document.querySelector("#runaway-status");

  if (!button || !status) {
    return;
  }

  let escaped = false;
  let state = "initial";

  function escapeOnce() {
    if (escaped) {
      return false;
    }

    escaped = true;
    state = "escaped";
    button.classList.add("has-escaped");
    status.textContent = text("runawayEscaped");
    return true;
  }

  button.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") {
      escapeOnce();
    }
  });

  button.addEventListener("click", () => {
    if (escapeOnce()) {
      return;
    }

    status.textContent = text("runawayCaught");
    button.textContent = text("runawayCaughtButton");
    state = "caught";
  });

  document.addEventListener("languagechange", () => {
    if (state === "escaped") {
      status.textContent = text("runawayEscaped");
    } else if (state === "caught") {
      status.textContent = text("runawayCaught");
      button.textContent = text("runawayCaughtButton");
    }
  });
}

function setupQuiz() {
  const quiz = document.querySelector("#quiz");
  const progress = document.querySelector("#quiz-progress");
  const progressBar = document.querySelector("#progress-bar");
  const question = document.querySelector("#quiz-question");
  const answers = document.querySelector("#quiz-answers");

  if (!quiz || !progress || !progressBar || !question || !answers) {
    return;
  }

  let currentQuestion = 0;
  const answerLetters = ["01", "02", "03", "04"];

  function finishQuiz(note = "") {
    journey.note = note.trim();
    window.location.href = buildJourneyUrl("ending.html", journey);
  }

  function renderTextQuestion(item) {
    const form = document.createElement("form");
    const input = document.createElement("input");
    const button = document.createElement("button");

    form.className = "quiz__text-form";
    input.className = "quiz__text-input";
    input.type = "text";
    input.maxLength = 80;
    input.placeholder = item.placeholder;
    input.setAttribute("aria-label", text("quizTextLabel"));
    button.className = "button button--primary";
    button.type = "submit";
    button.textContent = text("quizResultButton");
    form.append(input, button);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      finishQuiz(input.value);
    });
    answers.append(form);
    input.focus();
  }

  function renderQuestion() {
    const quizQuestions = text("quizQuestions");
    const item = quizQuestions[currentQuestion];
    progress.textContent = text("quizProgress")(
      currentQuestion + 1,
      quizQuestions.length,
    );
    progressBar.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
    question.textContent = item.question;
    answers.replaceChildren();

    if (item.type === "text") {
      renderTextQuestion(item);
      return;
    }

    item.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      const letter = document.createElement("span");

      button.type = "button";
      button.className = "quiz__answer";
      letter.className = "answer-letter";
      letter.setAttribute("aria-hidden", "true");
      letter.textContent = answerLetters[index];
      button.append(letter, document.createTextNode(answer.label));

      button.addEventListener("click", () => {
        journey.traits.push(answer.trait);
        currentQuestion += 1;
        renderQuestion();
        question.focus({ preventScroll: true });
      });

      answers.append(button);
    });
  }

  question.tabIndex = -1;
  renderQuestion();
  document.addEventListener("languagechange", renderQuestion);
}

function updateSecretReward() {
  const reward = document.querySelector("#secret-reward");
  if (!reward) {
    return;
  }

  const hasAllCollectibles = collectibleIds.every((id) =>
    journey.collected.has(id),
  );
  reward.hidden = !hasAllCollectibles;
}

function typeLetter(target, message) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = message;
    return () => {};
  }

  let index = 0;
  const timer = window.setInterval(() => {
    index += 1;
    target.textContent = message.slice(0, index);
    if (index >= message.length) {
      window.clearInterval(timer);
    }
  }, 38);
  return () => window.clearInterval(timer);
}

function setupEnding() {
  const title = document.querySelector("#result-title");
  const summary = document.querySelector("#personality-summary");
  const typedMessage = document.querySelector("#typed-message");
  const playerNote = document.querySelector("#player-note");
  const songButton = document.querySelector("#song-button");
  const countdown = document.querySelector("#song-countdown");

  if (
    !title ||
    !summary ||
    !typedMessage ||
    !playerNote ||
    !songButton ||
    !countdown
  ) {
    return;
  }

  const titleIndex = Math.floor(Math.random() * text("resultTitles").length);

  function renderEndingText() {
    const titles = text("resultTitles");
    const traitLabels = text("traitLabels");
    const localizedTraits = journey.traits.map(
      (trait) => traitLabels[trait] || trait,
    );
    title.textContent = text("resultTitle")(titles[titleIndex]);
    summary.textContent = localizedTraits.length
      ? text("resultSummary")(localizedTraits)
      : text("emptyResultSummary");

    if (journey.note) {
      playerNote.hidden = false;
      playerNote.textContent = text("playerNote")(journey.note);
    }
  }

  renderEndingText();
  let stopTyping = typeLetter(typedMessage, text("letterMessage"));
  document.addEventListener("languagechange", () => {
    stopTyping();
    renderEndingText();
    typedMessage.textContent = text("letterMessage");
    stopTyping = () => {};
  });
  updateSecretReward();

  songButton.addEventListener("click", () => {
    songButton.disabled = true;
    let remaining = 3;
    countdown.textContent = `${remaining}...`;
    const timer = window.setInterval(() => {
      remaining -= 1;
      if (remaining > 0) {
        countdown.textContent = `${remaining}...`;
        return;
      }

      window.clearInterval(timer);
      countdown.textContent = text("songReady");
      window.location.href = songButton.dataset.songUrl;
    }, 700);
  });
}
