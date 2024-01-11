import createCharacterCard from "./components/card/card.js";
import errorComponent from "./components/error/error.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";
// fetch data from API
const baseUrl = "https://rickandmortyapi.com/api";

async function fetchCharacters(pageNumber = 1, searchQuery = "") {
  cleanContainer();
  checkDocument();

  const charactersPath = "character";
  let query = `?page=${pageNumber}`;
  if (searchQuery) {
    query += `&name=${encodeURIComponent(searchQuery)}`;
  }
  // const page = `?page=${pageNumber}`;
  await fetch(`${baseUrl}/${charactersPath}/${query}`)
    // await fetch(`${baseUrl}/${charactersPath}/${page}`)
    .then((response) => {
      if (!response.ok) {
        cleanContainer();
        checkDocument();
        const errorContainer = errorComponent();
        cardContainer.append(errorContainer);
        navigation.style.display = "none";
        pagination.textContent = `0/0`;
        nextButton.disabled = true;
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Update the States
      maxPage = data.info.pages;
      const arrayResults = data.results;
      pagination.textContent = `${page}/${data.info.pages}`;
      // loop into the results from the API
      arrayResults.forEach((character) => {
        const characterCard = createCharacterCard(character);
        cardContainer.appendChild(characterCard);
      });

      // update the pagination display
      pagination.innerHTML = `${pageNumber}/${maxPage}`;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
// Trigger this function when the user click on "previous" button.
prevButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (page > 1) {
    page--;
    fetchCharacters(page, searchQuery);
  }
});
// Trigger this function when the user click on "next" button.
nextButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (page < maxPage) {
    page++;
    fetchCharacters(page, searchQuery);
  }
});

// Clean the card container <ul>
function cleanContainer() {
  cardContainer.innerHTML = "";
}
// Let's see if the page is 1 to disable the "previous" button otherwise enable it.
function checkDocument() {
  nextButton.disabled = false;
  navigation.style.display = "grid";
  page <= 1 ? (prevButton.disabled = true) : (prevButton.disabled = false);
}
searchBar.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  searchQuery = formData.get("query"); // Assuming the input field has the name 'query'
  page = 1;
  fetchCharacters(page, searchQuery);
});
document.addEventListener("DOMContentLoaded", () => {
  fetchCharacters();
  checkDocument();
});

// // Whhen the content is loaded, let validate in which page we are.
// document.addEventListener("DOMContentLoaded", checkDocument);

// fetchCharacters();

//   //Getting the value of the input inside the searchbar.
//   const form = new FormData(event.target);
//   const formData = Object.fromEntries(form);
// });
