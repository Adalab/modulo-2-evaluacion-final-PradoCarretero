'use strict';
const searchInput = document.querySelector('.js-search__input');
const cocktailCardList = document.querySelector('.js-cocktail__list');
const favoriteDataList = document.querySelector('.js-favorite__list');
const searchButton = document.querySelector('.js-search__button');
let cocktailData = [];
let favorites = [];

function getLocalStorage() {
  const localStorageFavDrinks = localStorage.getItem('favorites');

  if (localStorageFavDrinks === null) {
    favoriteDataList.innerHTML = '';
  } else {
    const arrayDrinks = JSON.parse(localStorageFavDrinks);
    favorites = arrayDrinks;
    renderFavoritesLocal();
  }
}

function renderFavoritesLocal() {
  let htmlFav = '';
  let favClass = '';
  for (const drink of favorites) {
    favClass = 'drink__favorite';
    htmlFav += `<li class="js-cocktail__card ${favClass}" id="${drink.id}"><h2>${drink.name}</h2><img class="drink_img" src=${drink.image} alt=""><button id="${drink.id} class="dislikebutton js-dislike-button">MAS</button></li>`;
  }
  favoriteDataList.innerHTML = htmlFav;
  listenDislikeButton();
}

function handleDislikeClick(event) {
  console.log('he clic');
  console.log(dislikeButton);
  event.preventDefault();
  const clickedItemId = event.currentTarget.id;
  console.log(clickedItemId);
  const objetClicked = cocktailData.find((itemDrink) => {
    return itemDrink.id === clickedItemId;
  });
  const favoritesFound = favorites.findIndex((fav) => {
    return fav.id === clickedItemId;
  });
  if (favoritesFound !== -1) {
    favorites.splice(favoritesFound, 1);
  }
  setFavInLocalStorage();
  renderFavoritesLocal();
  renderFilteredList(cocktailData);
}

function listenDislikeButton() {
  console.log('escuchando');
  const dislikeButton = document.querySelectorAll('.js-dislike-button');
  for (const dislikeItem of dislikeButton) {
    dislikeItem.addEventListener('click', handleDislikeClick);
  }
}

getLocalStorage();
