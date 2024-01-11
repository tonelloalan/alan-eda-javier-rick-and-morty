export default function createButton() {
  const buttonPrev = document.createElement("button");
  const buttonNext = document.createElement("button");

  buttonPrev.classList.add("button");
  buttonPrev.classList.add("button--prev");
  buttonPrev.setAttribute("data-js", "button-prev");
  buttonPrev.textContent = "previous";

  buttonNext.classList.add("button");
  buttonNext.classList.add("button--next");
  buttonNext.setAttribute("data-js", "button-next");
  buttonNext.textContent = "next";

  return [buttonPrev, buttonNext];
}
