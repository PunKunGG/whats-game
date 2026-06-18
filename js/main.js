document.addEventListener("DOMContentLoaded", () => {
  const allowedNames = ["rinlada", "wanrada", "siwapad", "puntita", "nice", "dream", "pun", "punkung",
                        "punch", "รินลดา", "วรรณรดา", "ศิวภาส", "ไนซ์", "ดรีม", "ปั้น", "ปั้นคุง", "พั้นคุง", "พั้น"];
  const collectibleIds = ["gate", "route", "finale"];
  const translations = {
    th: {
      indexTitle: "Not a DM | เกมลับเล็ก ๆ",
      eyebrow: "เกมลับเล็ก ๆ",
      subtitle: "กรอกชื่อเพื่อไปต่อ",
      nameLabel: "ชื่อของคุณ",
      namePlaceholder: "พิมพ์ชื่อที่คุณชอบ..หรือจะเป็นชื่อที่ผมชอบดีน้า..😜",
      startButton: "เริ่มเกม",
      microcopy: "ประตูบางบานจะเปิดให้ผู้เล่นที่ใช่เท่านั้น",
      gateCollectibleLabel: "เก็บดาวลับหน้าแรก",
      emptyName: "กรอกชื่อก่อนนะ ประตูลับยังเดาใจคนเล่นไม่เป็นน่ะ",
      collectibleFound: (count) => `เจอดาวลับแล้ว ${count} / ${collectibleIds.length} ดวง`,
      languageLabel: "Switch language to English",
      soundOnLabel: "เปิดเพลงพื้นหลัง",
      soundOffLabel: "ปิดเพลงพื้นหลัง",
      soundUnavailable: "ยังไม่พบไฟล์ assets/you_everything.mp3",
      soundError: "เปิดเพลงไม่ได้ กรุณาลองกดอีกครั้ง",
      secretTitle: "ปลดล็อกเส้นทางลับแล้ว | Not a DM",
      secretEyebrow: "ปลดล็อกความสำเร็จ ✦",
      secretHeading: "ปลดล็อกเส้นทางลับแล้ว",
      secretSubtitle: "คุณเจอหน้าที่ตามหลักแล้วไม่ควรมีอยู่จริง",
      routeCollectibleLabel: "เก็บดาวลับในเส้นทาง",
      runawayButton: "ปุ่มธรรมดาที่ไม่น่าสงสัย",
      runawayEscaped: "เดี๋ยวนะ... ปุ่มเมื่อกี้ขยับเองหรือเปล่า?",
      runawayCaught: "จับได้แล้ว! รางวัลคือ... ความภูมิใจหนึ่งหน่วย",
      runawayCaughtButton: "ถูกจับได้แล้ว",
      quizHint: "ที่นี่ไม่มีคำตอบผิด",
      quizLoading: "กำลังเตรียมภารกิจ...",
      quizProgress: (current, total) => `คำถาม ${current} / ${total}`,
      quizTextLabel: "ข้อความสั้น ๆ ถึงเว็บไซต์",
      quizResultButton: "ดูผลลัพธ์",
      quizQuestions: [
        { question: "ถ้ามีแมวมาขวางทาง คุณจะทำอย่างไร?", answers: [
          { label: "ลูบหัว", trait: "catFriend" }, { label: "ถ่ายรูป", trait: "momentKeeper" },
          { label: "คุยด้วยเหมือนเพื่อนเก่า", trait: "everythingTalker" }, { label: "ทำทุกข้อเลย", trait: "perfectCatPerson" }
        ] },
        { question: "จู่ ๆ ขนมปริศนาก็ปรากฏขึ้น ควรทำอย่างไร?", answers: [
          { label: "ตรวจสอบอย่างจริงจัง", trait: "snackDetective" }, { label: "แบ่งให้หนึ่งคำ", trait: "snackSharer" },
          { label: "ตั้งชื่อก่อนกิน", trait: "professionalNamer" }, { label: "เชื่อในโชคชะตาของขนม", trait: "snackBeliever" }
        ] },
        { question: "เลือกของจำเป็นหนึ่งชิ้นสำหรับการผจญภัยเล็ก ๆ", answers: [
          { label: "ร่มผู้กล้าหาญ", trait: "rainAdventurer" }, { label: "ลูกอมฉุกเฉิน", trait: "sugarPlanner" },
          { label: "แผนที่ที่มีประโยชน์แบบน่าสงสัย", trait: "shortcutExplorer" }, { label: "เพลย์ลิสต์ดี ๆ หนึ่งชุด", trait: "partyDj" }
        ] },
        { question: "มีคนทำเว็บไซต์น่ารักแบบน่าสงสัยให้คุณ จะรู้สึกอย่างไร?", answers: [
          { label: "เป็นเรื่องปกติมาก", trait: "unshakable" }, { label: "แอบประทับใจนิดหน่อย", trait: "effortNoticer" },
          { label: "หาแมวที่ซ่อนอยู่", trait: "easterEggHunter" }, { label: "ทำภารกิจต่อ", trait: "storyPlayer" }
        ] },
        { type: "text", question: "ก่อนจบภารกิจ ฝากหนึ่งประโยคให้เว็บไซต์นี้หน่อย", placeholder: "พิมพ์สั้น ๆ ได้เลย..." }
      ],
      wrongTitle: "ปฏิเสธการเข้าใช้ | Not a DM",
      wrongEyebrow: "หักมุมแล้วหนึ่ง",
      wrongHeading: "เข้าไม่ได้จ้า",
      wrongSubtitle: "เหตุผล: คุณไม่ใช่เจ้าของชื่อนั้นสินะ 🤔",
      wrongMicrocopy: "สภาลับพิจารณาคำขอของคุณแล้ว ผลโหวตคือไม่อนุมัติครับ",
      nextOptionsLabel: "ตัวเลือกถัดไป",
      acceptFateButton: "ยอมรับชะตากรรม",
      tryAnotherButton: "ลองชื่ออื่น",
      catTitle: "แมวพบคุณแล้ว | Not a DM",
      catEyebrow: "Easter egg ที่เจอได้เฉยเลย",
      catHeading: "แมวพบคุณแล้ว",
      catSubtitle: "คุณไม่ใช่ชื่อที่ประตูตามหา แต่เป็นชื่อที่แมวอนุมัติ",
      catMicrocopy: "รางวัลคือการได้รู้ว่าเว็บนี้มีงบสำหรับแมวหนึ่งตัว",
      dogTitle: "หมาพบคุณแล้ว | Not a DM",
      dogEyebrow: "Easter egg สำหรับทีมหมา",
      dogHeading: "หมาพบคุณแล้ว",
      dogSubtitle: "คุณไม่ใช่ชื่อที่ประตูตามหา แต่เป็นคนที่หมาเลือกแล้ว",
      dogMicrocopy: "รางวัลคือการได้รู้ว่าเว็บนี้มีพื้นที่สำหรับหมาที่น่ารักหนึ่งตัว",
      tryAgainButton: "กลับไปลองใหม่",
      endingTitle: "ผลลัพธ์: 100% | Not a DM",
      finaleCollectibleLabel: "เก็บดาวลับหน้าสุดท้าย",
      endingEyebrow: "ภารกิจสำเร็จ ✦",
      endingHeading: "ผลลัพธ์: 100%",
      endingStatus: "สถานะ: เป็นคนที่ใช่อย่างแน่นอน",
      finalMessageLabel: "ข้อความสุดท้าย",
      endingMicrocopy: "เป็นความพยายามในระดับที่สมเหตุสมผลมาก แน่นอนอยู่แล้ว",
      secretReward: "เก็บดาวครบแล้ว ✦ ข้อความลับคือ: คนทำเว็บตั้งใจให้คุณยิ้มจริง ๆ นะ",
      finalSongButton: "เปิดเพลงสุดท้าย",
      resultTitles: ["นักกดปุ่มในตำนาน", "ผู้พิทักษ์เส้นทางลับ", "คนที่แมวพร้อมจะอนุมัติ", "ผู้เล่นที่มาถึงหน้าสุดท้ายจริง ๆ"],
      resultTitle: (title) => `ฉายาประจำรอบ: ${title}`,
      resultSummary: (traits) => `ผลวิเคราะห์แบบไม่เป็นวิทยาศาสตร์: ${traits.join(" · ")}`,
      emptyResultSummary: "ผลวิเคราะห์แบบไม่เป็นวิทยาศาสตร์: ลึกลับเกินกว่าจะอ่านค่าได้",
      playerNote: (note) => `ข้อความที่คุณฝากไว้: “${note}”`,
      letterMessage: "เราไม่อยากส่งข้อความนี้ไปตรง ๆ ในแชต ก็เลยทำเว็บไซต์เล็ก ๆ ขึ้นมาแทน",
      songReady: "ไปฟังกัน ✦",
      traitLabels: {
        catFriend: "ผู้เป็นมิตรกับแมว", momentKeeper: "นักบันทึกโมเมนต์", everythingTalker: "นักคุยกับทุกสรรพสิ่ง", perfectCatPerson: "ทาสแมวระดับสมบูรณ์แบบ",
        snackDetective: "นักสืบขนม", snackSharer: "ผู้แบ่งปันของอร่อย", professionalNamer: "นักตั้งชื่อมืออาชีพ", snackBeliever: "ผู้ศรัทธาในของกิน",
        rainAdventurer: "นักผจญภัยพร้อมรับฝน", sugarPlanner: "ผู้เตรียมพร้อมเรื่องน้ำตาล", shortcutExplorer: "นักสำรวจทางลัด", partyDj: "ผู้คุมเพลงประจำปาร์ตี้",
        unshakable: "คนใจนิ่งเกินเหตุ", effortNoticer: "ผู้รับรู้ความตั้งใจ", easterEggHunter: "นักล่า Easter egg", storyPlayer: "ผู้เล่นสายเนื้อเรื่อง"
      }
    },
    en: {
      indexTitle: "Not a DM | A tiny secret game",
      eyebrow: "A TINY SECRET GAME",
      subtitle: "Enter your name to continue",
      nameLabel: "Your name",
      namePlaceholder: "Type a name you like... or maybe one I like 😜",
      startButton: "Start game",
      microcopy: "Some doors only open for the right player.",
      gateCollectibleLabel: "Collect the secret star on the first page",
      emptyName: "Enter your name first—the secret gate cannot read minds yet.",
      collectibleFound: (count) => `Secret star found: ${count} / ${collectibleIds.length}`,
      languageLabel: "เปลี่ยนภาษาเป็นภาษาไทย",
      soundOnLabel: "Play background music",
      soundOffLabel: "Mute background music",
      soundUnavailable: "Music file not found at assets/you_everything.mp3",
      soundError: "Could not play the music. Please try again.",
      secretTitle: "Secret route unlocked | Not a DM",
      secretEyebrow: "ACHIEVEMENT UNLOCKED ✦",
      secretHeading: "Secret route unlocked",
      secretSubtitle: "You found a page that technically should not exist.",
      routeCollectibleLabel: "Collect the secret star along the route",
      runawayButton: "A perfectly normal button",
      runawayEscaped: "Wait... did that button just move?",
      runawayCaught: "Caught it! Your reward is one unit of pride.",
      runawayCaughtButton: "Caught!",
      quizHint: "There are no wrong answers here",
      quizLoading: "Preparing your mission...",
      quizProgress: (current, total) => `Question ${current} / ${total}`,
      quizTextLabel: "A short message for this website",
      quizResultButton: "See result",
      quizQuestions: [
        { question: "A cat blocks your path. What do you do?", answers: [
          { label: "Pet it", trait: "catFriend" }, { label: "Take a photo", trait: "momentKeeper" },
          { label: "Talk to it like an old friend", trait: "everythingTalker" }, { label: "All of the above", trait: "perfectCatPerson" }
        ] },
        { question: "A mysterious snack suddenly appears. What now?", answers: [
          { label: "Investigate thoroughly", trait: "snackDetective" }, { label: "Share a bite", trait: "snackSharer" },
          { label: "Name it before eating", trait: "professionalNamer" }, { label: "Trust the snack's destiny", trait: "snackBeliever" }
        ] },
        { question: "Choose one essential item for a tiny adventure.", answers: [
          { label: "A heroic umbrella", trait: "rainAdventurer" }, { label: "Emergency candy", trait: "sugarPlanner" },
          { label: "A suspiciously useful map", trait: "shortcutExplorer" }, { label: "One excellent playlist", trait: "partyDj" }
        ] },
        { question: "Someone made you a suspiciously cute website. How do you feel?", answers: [
          { label: "Completely normal", trait: "unshakable" }, { label: "A little impressed", trait: "effortNoticer" },
          { label: "Look for the hidden cat", trait: "easterEggHunter" }, { label: "Continue the mission", trait: "storyPlayer" }
        ] },
        { type: "text", question: "Before the mission ends, leave this website one sentence.", placeholder: "A short message is perfect..." }
      ],
      wrongTitle: "Access denied | Not a DM",
      wrongEyebrow: "PLOT TWIST DETECTED",
      wrongHeading: "Access denied",
      wrongSubtitle: "Reason: that name does not belong to you, does it? 🤔",
      wrongMicrocopy: "The secret council reviewed your request. The vote was a polite no.",
      nextOptionsLabel: "Next options",
      acceptFateButton: "Accept your fate",
      tryAnotherButton: "Try another name",
      catTitle: "The cat found you | Not a DM",
      catEyebrow: "A WILD EASTER EGG APPEARED",
      catHeading: "The cat found you",
      catSubtitle: "You are not the name the gate wanted, but you are the name the cat approved.",
      catMicrocopy: "Your reward is knowing this website had room in the budget for one cat.",
      dogTitle: "The dog found you | Not a DM",
      dogEyebrow: "AN EASTER EGG FOR DOG PEOPLE",
      dogHeading: "The dog found you",
      dogSubtitle: "You are not the name the gate wanted, but the dog has chosen you.",
      dogMicrocopy: "Your reward is knowing this website made room for one very good dog.",
      tryAgainButton: "Try again",
      endingTitle: "Result: 100% | Not a DM",
      finaleCollectibleLabel: "Collect the secret star on the final page",
      endingEyebrow: "MISSION COMPLETE ✦",
      endingHeading: "Result: 100%",
      endingStatus: "Status: definitely the right person",
      finalMessageLabel: "Final message",
      endingMicrocopy: "A perfectly reasonable amount of effort, obviously.",
      secretReward: "All stars collected ✦ Secret message: this website was genuinely made to make you smile.",
      finalSongButton: "Play the final song",
      resultTitles: ["Legendary Button Presser", "Guardian of the Secret Route", "Cat-Approved Human", "Player Who Actually Reached the End"],
      resultTitle: (title) => `Your title: ${title}`,
      resultSummary: (traits) => `Extremely unscientific analysis: ${traits.join(" · ")}`,
      emptyResultSummary: "Extremely unscientific analysis: too mysterious to measure.",
      playerNote: (note) => `Your message: “${note}”`,
      letterMessage: "I didn't want to send this directly in chat, so I made a tiny website instead.",
      songReady: "Let's listen ✦",
      traitLabels: {
        catFriend: "Friend of cats", momentKeeper: "Keeper of moments", everythingTalker: "Conversationalist of all things", perfectCatPerson: "Perfect cat person",
        snackDetective: "Snack detective", snackSharer: "Sharer of tasty things", professionalNamer: "Professional namer", snackBeliever: "Believer in snacks",
        rainAdventurer: "Rain-ready adventurer", sugarPlanner: "Sugar preparedness expert", shortcutExplorer: "Explorer of shortcuts", partyDj: "Party playlist keeper",
        unshakable: "Suspiciously unshakable", effortNoticer: "Noticer of effort", easterEggHunter: "Easter egg hunter", storyPlayer: "Story-driven player"
      }
    }
  };

  const initialLanguage = new URLSearchParams(window.location.search).get("lang");
  let currentLanguage = initialLanguage === "th" ? "th" : "en";
  const temporaryStatuses = new Map();

  function text(key) {
    return translations[currentLanguage][key];
  }

  function showTemporaryStatus(target, key, ...args) {
    const existing = temporaryStatuses.get(target);
    if (existing) {
      window.clearTimeout(existing.timer);
    }

    const message = text(key);
    target.textContent = typeof message === "function" ? message(...args) : message;
    const timer = window.setTimeout(() => {
      target.textContent = "";
      temporaryStatuses.delete(target);
    }, 800);
    temporaryStatuses.set(target, { key, args, timer });
  }

  function clearTemporaryStatus(target) {
    const existing = temporaryStatuses.get(target);
    if (existing) {
      window.clearTimeout(existing.timer);
      temporaryStatuses.delete(target);
    }
    target.textContent = "";
  }

  function setupLanguageToggle() {
    const toggles = document.querySelectorAll("[data-language-toggle]");
    if (!toggles.length) {
      return;
    }

    function applyLanguage(language, updateUrl = false) {
      currentLanguage = language;
      document.documentElement.lang = language;
      if (updateUrl) {
        try {
          const url = new URL(window.location.href);
          if (language === "th") {
            url.searchParams.set("lang", "th");
          } else {
            url.searchParams.delete("lang");
          }
          window.history.replaceState(null, "", url);
        } catch {
          // Some browsers restrict History API changes on file:// pages.
        }
      }
      if (document.body.dataset.i18nTitle) {
        document.title = text(document.body.dataset.i18nTitle);
      }
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = text(element.dataset.i18n);
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        element.placeholder = text(element.dataset.i18nPlaceholder);
      });
      document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        element.setAttribute("aria-label", text(element.dataset.i18nAriaLabel));
      });
      toggles.forEach((toggle) => toggle.setAttribute("aria-label", text("languageLabel")));
      document.querySelectorAll("[data-home-link]").forEach((link) => {
        link.href = currentLanguage === "th" ? "index.html?lang=th" : "index.html";
      });

      const soundToggle = document.querySelector("#sound-toggle");
      if (soundToggle) {
        const isPlaying = soundToggle.getAttribute("aria-pressed") === "true";
        soundToggle.setAttribute("aria-label", text(isPlaying ? "soundOffLabel" : "soundOnLabel"));
      }
      temporaryStatuses.forEach((status, target) => {
        const message = text(status.key);
        target.textContent = typeof message === "function" ? message(...status.args) : message;
      });
      document.dispatchEvent(new CustomEvent("languagechange"));
    }

    toggles.forEach((toggle) => toggle.addEventListener("click", () => {
      applyLanguage(currentLanguage === "th" ? "en" : "th", true);
    }));
    applyLanguage(currentLanguage);
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
    source.src = "assets/you_everything.mp3";
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
          status: document.querySelector("#sound-status")
        }
      : createBackgroundMusicControls();
    const { audio, toggle, status } = controls;
    audio.volume = 0.25;
    let wantsMusic = true;

    function showPlayingState(isPlaying) {
      toggle.classList.toggle("is-playing", isPlaying);
      toggle.setAttribute("aria-pressed", String(isPlaying));
      toggle.setAttribute("aria-label", text(isPlaying ? "soundOffLabel" : "soundOnLabel"));
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
      } catch (error) {
        showPlayingState(false);
        if (ignoreAutoplayBlock && error.name === "NotAllowedError") {
          armInteractionFallback();
          return;
        }

        const source = audio.querySelector("source");
        const fileIsMissing = !source || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;
        showTemporaryStatus(status, fileIsMissing ? "soundUnavailable" : "soundError");
      }
    }

    toggle.addEventListener("click", async () => {
      if (!audio.paused) {
        wantsMusic = false;
        removeInteractionFallback();
        audio.pause();
        showPlayingState(false);
        clearTemporaryStatus(status);
        return;
      }

      wantsMusic = true;
      removeInteractionFallback();
      await playBackgroundMusic(false);
    });

    audio.addEventListener("ended", () => showPlayingState(false));
    if (wantsMusic) {
      playBackgroundMusic(true);
    }
  }


  function returnToStartOnRefresh() {
    if (document.body.dataset.returnOnRefresh !== "true") {
      return false;
    }

    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const isReload = navigationEntry
      ? navigationEntry.type === "reload"
      : performance.navigation && performance.navigation.type === 1;

    if (isReload) {
      window.location.replace(currentLanguage === "th" ? "index.html?lang=th" : "index.html");
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
    if (currentLanguage === "th") {
      params.set("lang", "th");
    }
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
      progress.textContent = text("quizProgress")(currentQuestion + 1, quizQuestions.length);
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

    const hasAllCollectibles = collectibleIds.every((id) => journey.collected.has(id));
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

    if (!title || !summary || !typedMessage || !playerNote || !songButton || !countdown) {
      return;
    }

    const titleIndex = Math.floor(Math.random() * text("resultTitles").length);

    function renderEndingText() {
      const titles = text("resultTitles");
      const traitLabels = text("traitLabels");
      const localizedTraits = journey.traits.map((trait) => traitLabels[trait] || trait);
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
