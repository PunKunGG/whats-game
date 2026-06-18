document.addEventListener("DOMContentLoaded", () => {
  const allowedNames = ["rinlada", "wanrada", "รินลดา", "วรรณรดา"];

  const quizQuestions = [
    {
      question: "ถ้ามีแมวมาขวางทาง คุณจะทำอย่างไร?",
      answers: ["ลูบหัว", "ถ่ายรูป", "คุยด้วยเหมือนเพื่อนเก่า", "ทำทุกข้อเลย"]
    },
    {
      question: "จู่ ๆ ขนมปริศนาก็ปรากฏขึ้น ควรทำอย่างไร?",
      answers: ["ตรวจสอบอย่างจริงจัง", "แบ่งให้หนึ่งคำ", "ตั้งชื่อก่อนกิน", "เชื่อในโชคชะตาของขนม"]
    },
    {
      question: "เลือกของจำเป็นหนึ่งชิ้นสำหรับการผจญภัยเล็ก ๆ",
      answers: ["ร่มผู้กล้าหาญ", "ลูกอมฉุกเฉิน", "แผนที่ที่มีประโยชน์แบบน่าสงสัย", "เพลย์ลิสต์ดี ๆ หนึ่งชุด"]
    },
    {
      question: "มีคนทำเว็บไซต์น่ารักแบบน่าสงสัยให้คุณ จะรู้สึกอย่างไร?",
      answers: ["เป็นเรื่องปกติมาก", "แอบประทับใจนิดหน่อย", "หาแมวที่ซ่อนอยู่", "ทำภารกิจต่อ"]
    },
    {
      question: "ผู้ค้นพบเส้นทางลับนี้ควรได้รับฉายาอะไร?",
      answers: ["นักกดปุ่มในตำนาน", "ผู้พิทักษ์ขนมสูงสุด", "บุคคลที่ใช่อย่างเป็นทางการ", "รับทุกฉายาตอนนี้เลย"]
    }
  ];

  // การรีเฟรชหน้าที่อยู่หลังประตูจะพากลับไปเริ่มกรอกชื่อใหม่
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

  // ปรับตัวพิมพ์และช่องว่าง เพื่อให้ชื่อที่ต่างกันเล็กน้อยยังผ่านได้
  function normalizeName(name) {
    return name.trim().toLocaleLowerCase("en-US").replace(/\s+/gu, "");
  }

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
        status.textContent = "กรอกชื่อก่อนนะ ประตูลับยังเดาใจคนไม่เป็น";
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return;
      }

      status.textContent = "";
      input.removeAttribute("aria-invalid");
      window.location.href = allowedNames.includes(normalizedName) ? "secret.html" : "wrong.html";
    });

    input.addEventListener("input", () => {
      if (input.value.trim()) {
        status.textContent = "";
        input.removeAttribute("aria-invalid");
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
    const answerLetters = ["A", "B", "C", "D"];

    // ทุกตัวเลือกถือว่าถูก การกดคำตอบจึงเป็นเพียงการเดินเรื่องต่อ
    function renderQuestion() {
      const item = quizQuestions[currentQuestion];
      progress.textContent = `คำถาม ${currentQuestion + 1} / ${quizQuestions.length}`;
      progressBar.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
      question.textContent = item.question;
      answers.replaceChildren();

      item.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        const letter = document.createElement("span");

        button.type = "button";
        button.className = "quiz__answer";
        letter.className = "answer-letter";
        letter.setAttribute("aria-hidden", "true");
        letter.textContent = answerLetters[index];
        button.append(letter, document.createTextNode(answer));

        button.addEventListener("click", () => {
          currentQuestion += 1;

          if (currentQuestion >= quizQuestions.length) {
            window.location.href = "ending.html";
            return;
          }

          renderQuestion();
          question.focus({ preventScroll: true });
        });

        answers.append(button);
      });
    }

    question.tabIndex = -1;
    renderQuestion();
  }

  if (!returnToStartOnRefresh()) {
    setupNameGate();
    setupQuiz();
  }
});
