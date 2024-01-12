// Import necessary functions and components
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

// Retrieve DOM elements
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

// Base URL for the API
const baseUrl = "https://rickandmortyapi.com/api";

// Function to fetch characters from the API
async function fetchCharacters(pageNumber = 1, searchQuery = "") {
  // Clear the card container
  cleanContainer();
  const charactersPath = "character";
  let query = `?page=${pageNumber}`;
  if (searchQuery) {
    query += `&name=${encodeURIComponent(searchQuery)}`;
  }
  // Fetch data from the API
  await fetch(`${baseUrl}/${charactersPath}/${query}`)
    .then((response) => {
      // Handle errors
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
      // Loop through the results from the API and create character cards
      arrayResults.forEach((character) => {
        const characterCard = createCharacterCard(character);
        cardContainer.appendChild(characterCard);
      });

      // Update the pagination display
      pagination.innerHTML = `${pageNumber}/${maxPage}`;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
// Event listener for "previous" button click
prevButton.addEventListener("click", () => {
  // Decrement page and fetch characters for the new page
  if (page > 1) {
    page--;
    fetchCharacters(page, searchQuery);
  }
});
// Event listener for "next" button click
nextButton.addEventListener("click", () => {
  // Increment page and fetch characters for the new page
  if (page < maxPage) {
    page++;
    fetchCharacters(page, searchQuery);
  }
});

// Function to clean the card container
function cleanContainer() {
  cardContainer.innerHTML = "";
}
// Function to check the document and update navigation display
function checkDocument() {
  // Display navigation grid and update button states based on current page

  //TO DO: Refactor those validations!!!
  navigation.style.display = "grid";
  if (page <= 1) {
    prevButton.disabled = true;
    prevButton.classList.remove("hover__effect");
  } else {
    prevButton.disabled = false;
    prevButton.classList.add("hover__effect");
  }
  if (page < maxPage) {
    nextButton.disabled = false;
    nextButton.classList.add("hover__effect");
  } else {
    nextButton.disabled = true;
    nextButton.classList.remove("hover__effect");
  }
}

// Event listener for search form submission
searchBar.addEventListener("submit", function (event) {
  event.preventDefault();
  // Get search query from form, reset page, and fetch characters
  const formData = new FormData(event.target);
  searchQuery = formData.get("query"); // Assuming the input field has the name 'query'
  page = 1;
  fetchCharacters(page, searchQuery);
});

// Initial fetch on document load
document.addEventListener("DOMContentLoaded", () => {
  // Fetch characters, and set up UI components
  fetchCharacters();
  mainElement.insertBefore(searchBarContainer, mainElement.firstChild);
  searchBarContainer.append(searchBar);
  navigation.append(prevButton);
  navigation.append(pagination);
  navigation.append(nextButton);
});
