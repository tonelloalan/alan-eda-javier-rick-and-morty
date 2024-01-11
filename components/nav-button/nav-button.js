export function createPreviousButton() {
  const newButton = document.createElement("button");
  newButton.classList.add("button");
  newButton.classList.add("button--prev");
  newButton.setAttribute("data-js", "button-prev");
  newButton.textContent = "Previous";

  return newButton;
}

export function createNextButton() {
  const newButton = document.createElement("button");
  newButton.classList.add("button");
  newButton.classList.add("button--next");
  newButton.setAttribute("data-js", "button-next");
  newButton.textContent = "Next";

  return newButton;
}
