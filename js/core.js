const allowedNames = [
  "nice",
  "dream",
  "pun",
  "punkung",
  "punch",
  "ไนซ์",
  "ดรีม",
  "ปั้น",
  "พั้นคุง",
  "พั้น",
];
const collectibleIds = ["gate", "route", "finale"];
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
  target.textContent =
    typeof message === "function" ? message(...args) : message;
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
    toggles.forEach((toggle) =>
      toggle.setAttribute("aria-label", text("languageLabel")),
    );
    document.querySelectorAll("[data-home-link]").forEach((link) => {
      link.href =
        currentLanguage === "th" ? "index.html?lang=th" : "index.html";
    });

    const soundToggle = document.querySelector("#sound-toggle");
    if (soundToggle) {
      const isPlaying = soundToggle.getAttribute("aria-pressed") === "true";
      soundToggle.setAttribute(
        "aria-label",
        text(isPlaying ? "soundOffLabel" : "soundOnLabel"),
      );
    }
    temporaryStatuses.forEach((status, target) => {
      const message = text(status.key);
      target.textContent =
        typeof message === "function" ? message(...status.args) : message;
    });
    document.dispatchEvent(new CustomEvent("languagechange"));
  }

  toggles.forEach((toggle) =>
    toggle.addEventListener("click", () => {
      applyLanguage(currentLanguage === "th" ? "en" : "th", true);
    }),
  );
  applyLanguage(currentLanguage);
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
    window.location.replace(
      currentLanguage === "th" ? "index.html?lang=th" : "index.html",
    );
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
    note: params.get("note") || "",
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
