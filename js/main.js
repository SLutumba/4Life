const text = "Welcome, Kutlwano Nkolele";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 120);
  } else {
    revealMainContents();
  }
}

function revealMainContents() {
  const elements = document.querySelectorAll("main > *");
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("fade-in");
    }, 400 * index);
  });
}

window.onload = () => {
  typeWriter();

  const loveBtn = document.getElementById("loveButton");
  loveBtn.addEventListener("click", () => {
    loveBtn.classList.add("glow-clicked");
    setTimeout(() => loveBtn.classList.remove("glow-clicked"), 1000);
  });
};
