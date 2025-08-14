let codeMap = {
    "2391212": { id: "word1", underscores: "____" }, // WILL
    "251521":  { id: "word2", underscores: "___" },  // YOU
    "25":      { id: "word3", underscores: "__" },   // BE
    "1325":    { id: "word4", underscores: "__" }    // MY
};

const originalCodeCount = Object.keys(codeMap).length;
const revealedCodes = new Set();
let allCodesEntered = false;

const finalWords = ["will", "you", "be", "my", "girlfriend"];
let currentWordIndex = 0;

const codeInput = document.getElementById("codeInput");

codeInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const value = codeInput.value.trim();

        if (!allCodesEntered) {
            if (codeMap[value]) {
                const target = document.getElementById(codeMap[value].id);
                target.innerHTML = `${codeMap[value].underscores} <span class="code-number">${value}</span>`;
                revealedCodes.add(value);
                delete codeMap[value];
                codeInput.value = "";

                if (revealedCodes.size === originalCodeCount) {
                    document.getElementById("word5").style.display = "inline-block";
                    allCodesEntered = true;
                    codeInput.type = "text";
                    codeInput.placeholder = `Guess word 1 of ${finalWords.length}...`;
                }
            } else {
                codeInput.value = "";
            }
        } else {
            const guess = value.toLowerCase();
            if (guess === finalWords[currentWordIndex]) {
                document.getElementById(`word${currentWordIndex + 1}`).textContent = finalWords[currentWordIndex];
                currentWordIndex++;
                codeInput.value = "";

                if (currentWordIndex < finalWords.length) {
                    codeInput.placeholder = `Guess word ${currentWordIndex + 1} of ${finalWords.length}...`;
                } else {
                    triggerFinale();
                }
            } else {
                codeInput.value = "";
            }
        }
    }
});

function launchConfettiDown() {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const colors = ['#ff4d6d','#ff7a9a','#ffd5e0','#ffffff'];

    (function frame() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) return;

        const particleCount = 16; // smaller bursts to simulate falling

        confetti({
            particleCount,
            startVelocity: 5,
            spread: 120,
            ticks: 1500, // longer ticks = fall longer
            gravity: 1.2, // faster fall
            origin: {
                x: Math.random(),
                y: 0 // from top edge
            },
            colors
        });

        requestAnimationFrame(frame);
    })();
}

function spawnHeartsBurst(count = 25) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.className = 'heartBurst';
        span.textContent = ['❤️','💖','💕','💘'][Math.floor(Math.random()*4)];
        document.body.appendChild(span);

        const startX = cx + (Math.random()-0.5) * 80;
        const startY = cy + (Math.random()-0.5) * 30;

        span.style.left = startX + 'px';
        span.style.top = startY + 'px';
        span.style.opacity = 1;

        const endX = startX + (Math.random()-0.5) * 600;
        const endY = startY - (200 + Math.random()*600);

        const duration = 1000 + Math.random()*1200;

        span.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${Math.random()*720-360}deg) scale(0.8)`, opacity: 0 }
        ], {
            duration,
            easing: 'cubic-bezier(.1,.7,.1,1)',
            fill: 'forwards'
        });

        setTimeout(() => span.remove(), duration + 50);
    }
}


// After triggerFinale(), show buttons
function triggerFinale() {
    const gc = document.getElementById('gameContainer');
    gc.style.opacity = 0;
    gc.style.transform = 'scale(0.96)';
    setTimeout(() => { gc.style.display = 'none'; }, 750);

    const msg = document.getElementById('finalMessage');
    msg.classList.add('show');
    msg.style.display = 'block';

    launchConfettiDown();
    spawnHeartsBurst(20);

    const input = document.getElementById('codeInput');
    if (input) input.style.display = 'none';

    // Show the buttons container after a short delay
    setTimeout(() => {
        const btnContainer = document.getElementById('responseButtons');
        btnContainer.style.display = 'block';
    }, 1200);
}

// No button dodge logic
const noBtn = document.getElementById('noBtn');
const btnContainer = document.getElementById('responseButtons');
const noMessage = document.getElementById('noMessage');

let noMoveCount = 0;

noBtn.addEventListener('mouseenter', () => {
    const margin = 10;
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - btnRect.width - margin;
    const maxY = window.innerHeight - btnRect.height - margin;

    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY;

    noBtn.style.position = 'fixed'; // now moves across screen
    noBtn.style.left = `${randX}px`;
    noBtn.style.top = `${randY}px`;

    noMoveCount++;
    if (noMoveCount === 3) {
        noMessage.style.display = 'block';
        noMessage.innerHTML = "You really thought that was a choice??";
    }
    else if (noMoveCount > 4) {
    noMessage.innerHTML = "Nice try, go ahead and click 'Yes'!";
    }
});


