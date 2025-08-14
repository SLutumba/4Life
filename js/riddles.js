const inputs = document.querySelectorAll('input');
const wordIds = [
  "word0", "word1", "word2", "word3", "word4",
  "word5", "word6", "word7", "word8"
];

let correctCount = 0;

inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    const userAnswer = input.value.trim().toUpperCase();
    const correctAnswer = input.dataset.answer.toUpperCase();

    if (userAnswer === correctAnswer) {
      if (!input.classList.contains('correct')) {
        correctCount++;
      }
      input.classList.add('correct');
      input.disabled = true;

      const span = document.getElementById(wordIds[index]);
      typewriterEffect(span, correctAnswer);

      if (correctCount === inputs.length) {
        triggerEndAnimation();
      }
    }
  });
});

function typewriterEffect(span, text, delay = 1000) {
  span.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    span.innerHTML += `<span class="highlight">${text[i]}</span>`;
    i++;
    if (i === text.length) clearInterval(interval);
  }, delay);
}

function triggerEndAnimation() {
  const container = document.querySelector('.container');
  container.classList.add('glow');

  const finalMessage = document.getElementById('final-message');
  finalMessage.style.display = 'block';
  finalMessage.textContent = "You are the one my heart was waiting for";
  finalMessage.classList.add('typing');
  finalMessage.classList.add('glow');
}
