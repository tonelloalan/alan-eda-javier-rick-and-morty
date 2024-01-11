import createCharacterCard from "./components/card/card.js";
import errorComponent from "./components/error/error.js";
import {
  createNextButton,
  createPreviousButton,
} from "./components/nav-button/nav-button.js";
import {
  createSearchBar,
  createForm,
} from "./components/search-bar/search-bar.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";

const mainElement = document.getElementById("mainElement");
const navigation = document.querySelector('[data-js="navigation"]');
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = createSearchBar();
const searchBar = createForm();
const prevButton = createPreviousButton();
const nextButton = createNextButton();
const pagination = createPagination();

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";
// fetch data from API
const baseUrl = "https://rickandmortyapi.com/api";

async function fetchCharacters(pageNumber = 1, searchQuery = "") {
  cleanContainer();
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
        checkDocument();
        cleanContainer();
        const errorContainer = errorComponent();
        cardContainer.append(errorContainer);
        navigation.style.display = "none";
        pagination.textContent = `0/0`;
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Update the States
      maxPage = data.info.pages;
      const arrayResults = data.results;
      pagination.textContent = `${page}/${maxPage}`;
      checkDocument();
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
  navigation.style.display = "grid";
  page <= 1 ? (prevButton.disabled = true) : (prevButton.disabled = false);
  page < maxPage ? (nextButton.disabled = false) : (nextButton.disabled = true);
}

searchBar.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  searchQuery = formData.get("query"); // Assuming the input field has the name 'query'
  page = 1;
  fetchCharacters(page, searchQuery);
});
// // Whhen the content is loaded, let validate in which page we are.
document.addEventListener("DOMContentLoaded", () => {
  fetchCharacters();
  mainElement.insertBefore(searchBarContainer, mainElement.firstChild);
  searchBarContainer.append(searchBar);
  navigation.append(prevButton);
  navigation.append(pagination);
  navigation.append(nextButton);
});

// fetchCharacters();

//   //Getting the value of the input inside the searchbar.
//   const form = new FormData(event.target);
//   const formData = Object.fromEntries(form);
// });
