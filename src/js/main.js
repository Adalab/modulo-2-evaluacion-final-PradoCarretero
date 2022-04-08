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
    /* li */
    favClass = 'drink__favorite';

    const favCard = document.createElement('li');
    favCard.classList.add('js-cocktail__card');
    favCard.classList.add(favClass);
    favCard.setAttribute('id', drink.id);
    favoriteDataList.appendChild(favCard);
    /* title */
    const favCardTitle = document.createElement('h2');
    const textFavCardTitle = document.createTextNode(drink.name);
    favCardTitle.appendChild(textFavCardTitle);
    favCard.appendChild(favCardTitle);
    /* imagen */
    const favCardImg = document.createElement('img');
    favCardImg.classList.add('drink_img');
    favCardImg.src = drink.image;
    favCardImg.alt = drink.name;
    favCard.appendChild(favCardImg);
    /* boton */
    const favCardBtn = document.createElement('button');
    favCardBtn.setAttribute('id', drink.id);
    favCardBtn.classList.add('dislikebutton');
    favCardBtn.classList.add('js-dislike-button');
    const textfavCardBtn = document.createTextNode('MAS');
    favCardBtn.appendChild(textfavCardBtn);
    favCard.appendChild(favCardBtn);
    /* htmlFav += `<li class="js-cocktail__card ${favClass}" id="${drink.id}"><h2>${drink.name}</h2><img class="drink_img" src=${drink.image} alt=""><button id="${drink.id} class="dislikebutton js-dislike-button">MAS</button></li>`; */
  }
  console.log('en render');
  const dislikeButton = document.querySelectorAll('.js-cocktail__card');
  console.log(dislikeButton);
  /* favoriteDataList.innerHTML = htmlFav; */
  console.log();
  listenDislikeButton();
}

function handleDislikeClick(event) {
  console.log('he clic');
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
    console.log('soy favorito');
    setFavInLocalStorage();
    renderFavoritesLocal();
    /* renderFilteredList(cocktailData); */
  }
}

function listenDislikeButton() {
  const dislikeButton = document.querySelectorAll('.js-dislike-button');
  console.log('escuchando');
  console.log(dislikeButton);
  for (const dislikeItem of dislikeButton) {
    dislikeItem.addEventListener('click', handleDislikeClick);
  }
}

getLocalStorage();
