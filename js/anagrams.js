
const challenges = [
  { scrambled: "U 0 Y 3 7 V 0 !", answer: "I LOVE YOU", hint: "Note: 2391212" },
  { scrambled: "! Y 5 M 1 5 O U", answer: "I MISS YOU", hint: "Note: 251521" },
  { scrambled: "B 3 V 3 R , 5 ! 3 T R T H O U 3 Y '", answer: "YOU'RE THE BEST, EVER!", hint: "Note: 25 1325" },
  { scrambled: "R G ! D 3 L N F R 1", answer: "GIRLFRIEND", hint: "👀 Hold on to that... you'll need it in the next game." }
];

let currentChallenge = 0;

const hintBox = document.getElementById("hintBox");
const userInput = document.getElementById("userInput");
const result = document.getElementById("result");
const challengeTitle = document.getElementById("challengeTitle");
const submitBtn = document.getElementById("submitAnswer");
const challengePrompt = document.getElementById("challengePrompt");

function loadChallenge(index) {
  const challenge = challenges[index];
  challengeTitle.textContent = `Challenge ${index + 1}`;
  hintBox.textContent = challenge.scrambled;
  userInput.value = "";
  result.textContent = "";
  challengePrompt.textContent = "Unscramble the following:";
}

submitBtn.addEventListener("click", () => {
  const userAnswer = userInput.value.trim().toUpperCase();
  const correctAnswer = challenges[currentChallenge].answer.toUpperCase();

  if (userAnswer === correctAnswer) {
    if (challenges[currentChallenge].hint) {
      result.textContent = `✅ Correct! ${challenges[currentChallenge].hint}`;
    } else {
      result.textContent = "✅ Correct! Moving on...";
    }

    currentChallenge++;
    if (currentChallenge < challenges.length) {
      setTimeout(() => loadChallenge(currentChallenge), 5000);
    } else {
      setTimeout(() => {
        document.querySelector(".game").innerHTML = `
          <h2>🎉 Congratulations!</h2>
          <p>You’ve completed all the challenges. You’re amazing!</p>
          <p>💡 Get ready for the next part...</p>
        `;
        setTimeout(() => {
      window.location.href = 'games.html';
    }, 3000);
      }, 5000);
    }
  } else {
    result.textContent = "❌ Not quite. Try again!";
  }
});

loadChallenge(currentChallenge);
