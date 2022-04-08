'use strict';
const searchInput = document.querySelector('.js-search__input');
const cocktailDataList = document.querySelector('.js-cocktail__list');
const searchButton = document.querySelector('.js-search__button');
let cocktailData = [];

function handleListClick(event) {
  const clickedItemId = event.currentTarget.id;
  console.log(clickedItemId);
  console.log('he clickado');
}

function emptyAvatar(data) {
  for (const drink of data) {
    if (drink.image === null) {
      drink.image = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgdRaq2P7x32D8eIIf-LoP0nehibaasT5SRQ&usqp=CAU`;
      renderFilteredList(data);
    } else {
      renderFilteredList(data);
    }
  }
}

function renderFilteredList(data) {
  for (const drink of data) {
    cocktailDataList.innerHTML += `<li><h2>${drink.name}</h2><img class="drink_img" src=${drink.image} alt=""></li>`;
  }
}

function getFromApi() {
  const searchValue = searchInput.value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cocktailData = data.drinks.map((drink) => {
        const newDrink = {
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        };
        return newDrink;
      });
      emptyAvatar(cocktailData);
    });
}

function handleSearchButton(event) {
  event.preventDefault();
  getFromApi();
}

searchButton.addEventListener('click', handleSearchButton);
cocktailDataList.addEventListener('click', handleListClick);
