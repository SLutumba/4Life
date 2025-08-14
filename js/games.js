const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
const wordsSequence = document.querySelector('.words-sequence');
const content = document.querySelector('.content');

if (!hasSeenIntro) {
  // Run animation sequence
  const words = document.querySelectorAll('.word:not(.center-word)');
  const centerWord = document.querySelector('.center-word');

  words.forEach((word, index) => {
    const tx = (Math.random() * 60 - 30) + 'vw';
    const ty = (Math.random() * 60 - 30) + 'vh';

    word.style.setProperty('--tx', tx);
    word.style.setProperty('--ty', ty);
    word.style.left = '50%';
    word.style.top = '50%';
    word.style.transform = 'translate(-50%, -50%)';
    word.style.animationDelay = `${index * 1.5}s`;
  });

  centerWord.style.animationDelay = `${words.length * 1.2}s`;

  // Show main content after animation finishes
  const totalTime = (words.length * 1.2 + 2.5) * 1000;
  setTimeout(() => {
    wordsSequence.style.display = 'none';
    content.classList.remove('hidden');
    content.classList.add('show');

    // Save in session so animation doesn't play again this browser session
    sessionStorage.setItem('hasSeenIntro', 'true');
  }, totalTime);

} else {
  // Skip animation, show content instantly
  wordsSequence.style.display = 'none';
  content.classList.remove('hidden');
  content.classList.add('show');
}

// Hover hint for "Next Page" button
const nextBtn = document.querySelector('#next-page');
const hintPopup = document.querySelector('#hint-popup');

nextBtn.addEventListener('mouseenter', () => {
  hintPopup.style.display = 'block';
  requestAnimationFrame(() => hintPopup.style.opacity = 1);
});

nextBtn.addEventListener('mouseleave', () => {
  hintPopup.style.opacity = 0;
  setTimeout(() => hintPopup.style.display = 'none', 300);
});
