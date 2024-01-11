export default function errorComponent(error) {
  const errorContainer = document.createElement("div");
  errorContainer.classList.add("error__container");
  errorContainer.innerHTML = `
        <h1 class="error__title">ERROR</h1>
        <h1 class="error__content">"WUBBA LUBBA DUB-DUB!"</h1>
        <img
        class="error__image"
        src="././images/error_image.png"
        width="400"
        />
    `;

  return errorContainer;
}
