import "./style.css";

const generateRandomNumber = () => Math.floor(Math.random() * 501);

const generateEmoticon = (value, emotions, isWin) => {
  const position = (value / 500) * 100;
  const emojiSpan = document.createElement("span");
  emojiSpan.innerText = emotions[Math.floor(Math.random() * 3)];
  emojiSpan.classList.add("emoticon");
  emojiSpan.style.marginLeft = `${position}%`;

  if (isWin) {
    emojiSpan.innerText = emotions[Math.floor(Math.random() * 3)];
  }

  return emojiSpan;
};

let random = generateRandomNumber();
console.log(random);
let attempts = 0;

const userGuess = () => {
  const winEmotions = ["❤️", "🎉", "🎊"];
  const looseEmotions = ["😢", "😓", "😟", "😤", "😭", "😖"];

  const guessForm = document.getElementById("guess-form");
  const gameResults = document.querySelector(".game-results");

  const message = document.querySelector(".message");
  const attemptsMessage = document.querySelector(".attempts");

  guessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const guessInput = document.getElementById("guess-input");
    const guessValue = parseInt(guessInput.value, 10);
    const restartButton = document.getElementById("restart");

    if (!isNaN(guessValue) && guessValue >= 0 && guessValue <= 500) {
      attempts++;
      console.log(guessValue);

      if (guessValue === random) {
        message.innerText = `You guessed ${random} it in ${attempts} attempts!`;
        gameResults.appendChild(
          generateEmoticon(guessValue, winEmotions, true)
        );
        restartButton.style.display = "block";
      } else if (guessValue > random) {
        message.innerText = `🌩️🌩️${guessValue} is too high! 🌩️🌩️`;
        gameResults.appendChild(
          generateEmoticon(guessValue, looseEmotions, false)
        );
      } else if (guessValue < random) {
        message.innerText = `⛈️⛈️${guessValue} is too low! ⛈️⛈️`;
        gameResults.appendChild(
          generateEmoticon(guessValue, looseEmotions, false)
        );
      }
      attemptsMessage.innerText = `⚡⚡Attempts : ${attempts}⚡⚡`;
      guessInput.value = "";
    }
    restartButton.addEventListener("click", () => {
      random = generateRandomNumber();
      console.log(random);
      attempts = 0;
      restartButton.style.display = "none";
      gameResults.innerHTML = "";
      message.innerText = "Enter your guess !";
      attemptsMessage.innerText = "Attempts: 0";
      startGame();
    });
  });
};

const startGame = () => {
  const start = document.getElementById("start-container");
  start.style.display = "none";
  const game = document.getElementById("game-container");
  game.style.display = "flex";
  userGuess();
  attempts = 0;
};

const startButton = document.getElementById("start");
startButton.addEventListener("click", startGame);
