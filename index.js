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
const maxPage = 1;
const page = 1;
const searchQuery = "";

// fetch data from API
try {
  fetch("https://rickandmortyapi.com/api")
    .then((response) => response.json())
    .then((data) => {
      // process the data and update the html

      data.results.forEarch((character) => {
        // create html elements or update existing ones with character information
        const characterCard = document.createElement("div");
        characterCard.innerHTML = `
  <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>Status: ${character.status}</p>
        <p>Type: ${character.type}</p>
        <p>Type: ${character.occurences}</p>
  `;
        cardContainer.appendChild(characterCard);
      });
    });
} catch {
  (error) => console.error("Error fetching data:", error);
}
