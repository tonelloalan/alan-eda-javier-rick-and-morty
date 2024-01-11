export function createPagination() {
  const newPagination = document.createElement("span");
  newPagination.classList.add("navigation__pagination");
  newPagination.setAttribute("data-js", "pagination");

  return newPagination;
}
