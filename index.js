console.clear();
import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";
// import { SearchBar } from "./components/SearchBar/SearchBar.js";

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

// Fetch API function
export default async function fetchCharacters() {
  const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${encodeURIComponent(
    searchQuery
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error! API url not found! Status code ${response.status}`
      );
    }
    const data = await response.json();

    maxPage = data.info.pages;

    cardContainer.innerHTML = "";

    pagination.textContent = `${page} / ${maxPage}`;

    data.results.forEach((character) => {
      const characterCard = CharacterCard(character);
      cardContainer.appendChild(characterCard);
    });
  } catch (error) {
    console.error("Error! Failed to fetch characters " + error);
  }
}

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  page = 1;
  fetchCharacters();
});

fetchCharacters();
