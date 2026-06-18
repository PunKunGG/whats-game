document.addEventListener("DOMContentLoaded", () => {
  const allowedNames = ["rinlada", "wanrada", "siwapad", "puntita", "nice", "dream", "pun", "punkung",
                        "punch", "รินลดา", "วรรณรดา", "ศิวภาส", "ไนซ์", "ดรีม", "ปั้น", "ปั้นคุง", "พั้นคุง", "พั้น"];
  const collectibleIds = ["gate", "route", "finale"];
  const letterMessage = "เราไม่อยากส่งข้อความนี้ไปตรง ๆ ในแชต ก็เลยทำเว็บไซต์เล็ก ๆ ขึ้นมาแทน";

  const quizQuestions = [
    {
      question: "ถ้ามีแมวมาขวางทาง คุณจะทำอย่างไร?",
      answers: [
        { label: "ลูบหัว", trait: "ผู้เป็นมิตรกับแมว" },
        { label: "ถ่ายรูป", trait: "นักบันทึกโมเมนต์" },
        { label: "คุยด้วยเหมือนเพื่อนเก่า", trait: "นักคุยกับทุกสรรพสิ่ง" },
        { label: "ทำทุกข้อเลย", trait: "ทาสแมวระดับสมบูรณ์แบบ" }
      ]
    },
    {
      question: "จู่ ๆ ขนมปริศนาก็ปรากฏขึ้น ควรทำอย่างไร?",
      answers: [
        { label: "ตรวจสอบอย่างจริงจัง", trait: "นักสืบขนม" },
        { label: "แบ่งให้หนึ่งคำ", trait: "ผู้แบ่งปันของอร่อย" },
        { label: "ตั้งชื่อก่อนกิน", trait: "นักตั้งชื่อมืออาชีพ" },
        { label: "เชื่อในโชคชะตาของขนม", trait: "ผู้ศรัทธาในของกิน" }
      ]
    },
    {
      question: "เลือกของจำเป็นหนึ่งชิ้นสำหรับการผจญภัยเล็ก ๆ",
      answers: [
        { label: "ร่มผู้กล้าหาญ", trait: "นักผจญภัยพร้อมรับฝน" },
        { label: "ลูกอมฉุกเฉิน", trait: "ผู้เตรียมพร้อมเรื่องน้ำตาล" },
        { label: "แผนที่ที่มีประโยชน์แบบน่าสงสัย", trait: "นักสำรวจทางลัด" },
        { label: "เพลย์ลิสต์ดี ๆ หนึ่งชุด", trait: "ผู้คุมเพลงประจำปาร์ตี้" }
      ]
    },
    {
      question: "มีคนทำเว็บไซต์น่ารักแบบน่าสงสัยให้คุณ จะรู้สึกอย่างไร?",
      answers: [
        { label: "เป็นเรื่องปกติมาก", trait: "คนใจนิ่งเกินเหตุ" },
        { label: "แอบประทับใจนิดหน่อย", trait: "ผู้รับรู้ความตั้งใจ" },
        { label: "หาแมวที่ซ่อนอยู่", trait: "นักล่า Easter egg" },
        { label: "ทำภารกิจต่อ", trait: "ผู้เล่นสายเนื้อเรื่อง" }
      ]
    },
    {
      type: "text",
      question: "ก่อนจบภารกิจ ฝากหนึ่งประโยคให้เว็บไซต์นี้หน่อย",
      placeholder: "พิมพ์สั้น ๆ ได้เลย..."
    }
  ];

  function returnToStartOnRefresh() {
    if (document.body.dataset.returnOnRefresh !== "true") {
      return false;
    }

    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const isReload = navigationEntry
      ? navigationEntry.type === "reload"
      : performance.navigation && performance.navigation.type === 1;

    if (isReload) {
      window.location.replace("index.html");
      return true;
    }

    return false;
  }

  function normalizeName(name) {
    return name.trim().toLocaleLowerCase("en-US").replace(/\s+/gu, "");
  }

  function readJourney() {
    const params = new URLSearchParams(window.location.search);
    return {
      collected: new Set(params.getAll("collect")),
      traits: params.getAll("trait"),
      note: params.get("note") || ""
    };
  }

  function buildJourneyUrl(page, journey) {
    const params = new URLSearchParams();
    journey.collected.forEach((id) => params.append("collect", id));
    journey.traits.forEach((trait) => params.append("trait", trait));
    if (journey.note) {
      params.set("note", journey.note);
    }
    const query = params.toString();
    return query ? `${page}?${query}` : page;
  }

  const journey = readJourney();

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
        status.textContent = "กรอกชื่อก่อนนะ ประตูลับยังเดาใจคนเล่นไม่เป็นน่ะ";
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return;
      }

      status.textContent = "";
      input.removeAttribute("aria-invalid");

      if (normalizedName === "cat" || normalizedName === "แมว") {
        window.location.href = "cat.html";
        return;
      }

      window.location.href = allowedNames.includes(normalizedName)
        ? buildJourneyUrl("secret.html", journey)
        : "wrong.html";
    });

    input.addEventListener("input", () => {
      if (input.value.trim()) {
        status.textContent = "";
        input.removeAttribute("aria-invalid");
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
        status.textContent = `เจอดาวลับแล้ว ${journey.collected.size} / ${collectibleIds.length} ดวง`;
      }

      updateSecretReward();
    });
  }

  function setupRunawayButton() {
    const button = document.querySelector("#runaway-button");
    const status = document.querySelector("#runaway-status");

    if (!button || !status) {
      return;
    }

    let escaped = false;

    function escapeOnce() {
      if (escaped) {
        return false;
      }

      escaped = true;
      button.classList.add("has-escaped");
      status.textContent = "เดี๋ยวนะ... ปุ่มเมื่อกี้ขยับเองหรือเปล่า?";
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

      status.textContent = "จับได้แล้ว! รางวัลคือ... ความภูมิใจหนึ่งหน่วย";
      button.textContent = "ถูกจับได้แล้ว";
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
      input.setAttribute("aria-label", "ข้อความสั้น ๆ ถึงเว็บไซต์");
      button.className = "button button--primary";
      button.type = "submit";
      button.textContent = "ดูผลลัพธ์";
      form.append(input, button);
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        finishQuiz(input.value);
      });
      answers.append(form);
      input.focus();
    }

    function renderQuestion() {
      const item = quizQuestions[currentQuestion];
      progress.textContent = `คำถาม ${currentQuestion + 1} / ${quizQuestions.length}`;
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
  }

  function updateSecretReward() {
    const reward = document.querySelector("#secret-reward");
    if (!reward) {
      return;
    }

    const hasAllCollectibles = collectibleIds.every((id) => journey.collected.has(id));
    reward.hidden = !hasAllCollectibles;
  }

  function typeLetter(target, message) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.textContent = message;
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      target.textContent = message.slice(0, index);
      if (index >= message.length) {
        window.clearInterval(timer);
      }
    }, 38);
  }

  function setupEnding() {
    const title = document.querySelector("#result-title");
    const summary = document.querySelector("#personality-summary");
    const typedMessage = document.querySelector("#typed-message");
    const playerNote = document.querySelector("#player-note");
    const songButton = document.querySelector("#song-button");
    const countdown = document.querySelector("#song-countdown");

    if (!title || !summary || !typedMessage || !playerNote || !songButton || !countdown) {
      return;
    }

    const titles = [
      "นักกดปุ่มในตำนาน",
      "ผู้พิทักษ์เส้นทางลับ",
      "คนที่แมวพร้อมจะอนุมัติ",
      "ผู้เล่นที่มาถึงหน้าสุดท้ายจริง ๆ"
    ];
    title.textContent = `ฉายาประจำรอบ: ${titles[Math.floor(Math.random() * titles.length)]}`;
    summary.textContent = journey.traits.length
      ? `ผลวิเคราะห์แบบไม่เป็นวิทยาศาสตร์: ${journey.traits.join(" · ")}`
      : "ผลวิเคราะห์แบบไม่เป็นวิทยาศาสตร์: ลึกลับเกินกว่าจะอ่านค่าได้";

    if (journey.note) {
      playerNote.hidden = false;
      playerNote.textContent = `ข้อความที่คุณฝากไว้: “${journey.note}”`;
    }

    typeLetter(typedMessage, letterMessage);
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
        countdown.textContent = "ไปฟังกัน ✦";
        window.location.href = songButton.dataset.songUrl;
      }, 700);
    });
  }

  function setupPointerTrail() {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  if (!returnToStartOnRefresh()) {
    setupNameGate();
    setupCollectibles();
    setupRunawayButton();
    setupQuiz();
    setupEnding();
    setupPointerTrail();
  }
});
