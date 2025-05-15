const riddles = [
  {
    question: "Bulan apa pertama kali El Riddler ngasih quiz? 😤",
    answer: "november",
  },
  {
    question: "Judul buku apa yang sedang dicuri El Riddler dari Sherlock?",
    answer: "the hound of the baskervilles",
  },
  {
    question: "Darimana El Riddler belajar bahasa Spanyol?",
    answer: "duolingo",
  },
  { question: "Apa kekuatan asli dari El Riddler?", answer: "membaca pikiran" },
  {
    question:
      "Iya atau tidak, El Riddler hanya bagian dari perwujudan seseorang?",
    answer: "iya",
  },
];

const hpKey = "monsterHP";
const answerKey = "answeredDate";
const maxHP = 3;

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function loadHP() {
  const saved = localStorage.getItem(hpKey);
  return saved ? parseInt(saved) : maxHP;
}

function saveHP(hp) {
  localStorage.setItem(hpKey, hp);
}

function checkResetHP(hp) {
  const lastAnswered = localStorage.getItem(answerKey);
  const today = getTodayDate();

  if (lastAnswered !== today && lastAnswered !== null) {
    hp = Math.min(maxHP, hp + 1);
    saveHP(hp);
  }

  return hp;
}

function displayHP(hp) {
  const hpDisplay = document.getElementById("hpDisplay");
  hpDisplay.textContent = "❤️".repeat(hp) + "🖤".repeat(maxHP - hp);
}

function getRiddleOfTheDay() {
  const index = new Date().getDate() % riddles.length;
  return riddles[index];
}

function updateCountdown() {
  const now = new Date();
  const next = new Date();
  next.setHours(24, 0, 0, 0);

  const diff = next - now;
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("countdown").textContent = `Next riddle in: ${String(
    h
  ).padStart(2, "0")} : ${String(m).padStart(2, "0")} : ${String(s).padStart(
    2,
    "0"
  )}`;
}

function submitAnswer() {
  const input = document
    .getElementById("answerInput")
    .value.trim()
    .toLowerCase();
  const today = getTodayDate();

  if (localStorage.getItem(answerKey) === today) {
    alert("You already answered today!");
    return;
  }

  const riddle = getRiddleOfTheDay();
  if (input === riddle.answer) {
    let hp = loadHP();
    hp = Math.max(0, hp - 1);
    saveHP(hp);
    localStorage.setItem(answerKey, today);
    alert("Correct! Monster HP -1");
  } else {
    alert("Wrong answer!");
  }

  displayHP(loadHP());
}

function initGame() {
  let hp = loadHP();
  hp = checkResetHP(hp);
  displayHP(hp);

  const riddle = getRiddleOfTheDay();
  document.getElementById("riddle").textContent = riddle.question;

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

initGame();
