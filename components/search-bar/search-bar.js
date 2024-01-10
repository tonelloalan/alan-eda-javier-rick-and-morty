// export function submitSearch(event) {
//   event.preventDefault(); // prevent the default form submission
// }

// possible application
export function submitSearch(event) {
  event.preventDefault();

  const searchInput = event.target.querySelector(".search-bar__input");
  const searchQuery = searchInput.value;

  const searchEvent = new CustomEvent("search", {
    detail: { query: searchQuery },
  });
  document.dispatchEvent(searchEvent);
}
