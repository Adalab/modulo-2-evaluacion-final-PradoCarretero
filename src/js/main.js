'use strict';
const searchInput = document.querySelector('.js-search__input');
let cocktailData = '';
const cocktailDataList = document.querySelector('.js-cocktail__list');
const searchButton = document.querySelector('.js-search__button');

/* function renderFilteredList(data) {
  for (const drink of data) {
    cocktailDataList.innerHTML = `<li><h2>title</h2><img src="" alt=""></li>`;
  }
} */
function filterDataDrinks(data) {
  console.log(data);
}

function getFromApi() {
  const searchValue = searchInput.value;
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      cocktailData = data.drinks;
      filterDataDrinks(cocktailData);
    });
  /*  renderFilteredList(cocktailData); */
}

function handleFilter(event) {
  event.preventDefault();
  getFromApi();
}

searchButton.addEventListener('click', handleFilter);
