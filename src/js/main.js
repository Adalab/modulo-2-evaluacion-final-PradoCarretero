'use strict';
const searchInput = document.querySelector('.js-search__input');
const cocktailCardList = document.querySelector('.js-cocktail__list');
const favoriteDataList = document.querySelector('.js-favorite__list');
const searchButton = document.querySelector('.js-search__button');
let cocktailData = [];
let favorites = [];

function handleCardClick(event) {
  const clickedItemId = event.currentTarget.id;
  const objetClicked = cocktailData.find((itemDrink) => {
    return itemDrink.id === clickedItemId;
  });
  const favoritesFound = favorites.findIndex((fav) => {
    return fav.id === clickedItemId;
  });
  if (favoritesFound === -1) {
    console.log('no estoy entre los favoritos');
    console.log(favorites);
    favorites.push(objetClicked);
  } else {
    favorites.splice(favoritesFound, 1);
    console.log('soy favorito');
  }
  setFavInLocalStorage();
  renderFilteredList(cocktailData);
}

function getLocalStorage() {
  const localStorageFavDrinks = localStorage.getItem('favorites');
  const arrayDrinks = JSON.parse(localStorageFavDrinks);
  favorites = arrayDrinks;

  console.log('favoritos desde get local');
  console.log(favorites);
  renderFavoritesLocal();
}

function renderFavoritesLocal() {
  let htmlFav = '';
  let favClass = '';
  for (const drink of favorites) {
    console.log(drink.name);
    favClass = 'drink__favorite';
    htmlFav += `<li class="js-cocktail__card ${favClass}" id="${drink.id}"><h2>${drink.name}</h2><img class="drink_img" src=${drink.image} alt=""></li>`;
  }
  favoriteDataList.innerHTML = htmlFav;
}

function isFavorite(data) {
  const favoriteFound = favorites.find((fav) => {
    return fav.id === data.id;
  });
  if (favoriteFound === undefined) {
    return false;
  } else {
    return true;
  }
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
  let html = '';
  let htmlFav = '';
  let favClass = '';
  for (const drink of data) {
    const isFav = isFavorite(drink);
    if (isFav) {
      favClass = 'drink__favorite';
      htmlFav += `<li class="js-cocktail__card ${favClass}" id="${drink.id}"><h2>${drink.name}</h2><img class="drink_img" src=${drink.image} alt=""></li>`;
    } else {
      favClass = '';
      html += `<li class="js-cocktail__card ${favClass}" id="${drink.id}"><h2>${drink.name}</h2><img class="drink_img" src=${drink.image} alt=""></li>`;
    }
  }
  cocktailCardList.innerHTML = html;
  favoriteDataList.innerHTML = htmlFav;
  listenCardClick();
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

function setFavInLocalStorage() {
  const stringFavDrinks = JSON.stringify(favorites);
  localStorage.setItem('favorites', stringFavDrinks);
}

function handleSearchButton(event) {
  event.preventDefault();
  getFromApi();
}

function listenCardClick() {
  const cocktailCard = document.querySelectorAll('.js-cocktail__card');
  for (const drinkItem of cocktailCard) {
    drinkItem.addEventListener('click', handleCardClick);
  }
}

searchButton.addEventListener('click', handleSearchButton);

getLocalStorage();
