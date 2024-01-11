export function createSearchBar(event) {
  const newSearchBar = document.createElement("div");
  newSearchBar.classList.add("search-bar-container");
  newSearchBar.setAttribute("data-js", "search-bar-container");

  return newSearchBar;
}

export function createForm() {
  const newForm = document.createElement("form");
  newForm.classList.add("search-bar");
  newForm.setAttribute("action", "");
  newForm.setAttribute("data-js", "search-bar");
  newForm.innerHTML = `
    <input
      name="query"
      class="search-bar__input"
      type="text"
      placeholder="search characters"
      aria-label="character name"
    />
    <button class="search-bar__button" aria-label="search for character">
      <img class="search-bar__icon" src="assets/magnifying-glass.png" alt="" />
    </button>
  `;

  return newForm;
}
