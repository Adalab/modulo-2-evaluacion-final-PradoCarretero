'use strict';
const searchInput = document.querySelector('.js-search__input');
const cocktailCardList = document.querySelector('.js-cocktail__list');
let favoriteDataList = document.querySelector('.js-favorite__list');
const searchButton = document.querySelector('.js-search__button');
const resetButton = document.querySelector('.js-reset__button');
let cocktailData = [];
let favorites = [];

function getLocalStorage() {
  const localStorageFavDrinks = localStorage.getItem('favorites');

  if (localStorageFavDrinks === null) {
    favoriteDataList.innerHTML = '';
  } else {
    const arrayDrinks = JSON.parse(localStorageFavDrinks);
    favorites = arrayDrinks;

    console.log('paso por get local storage');
    renderFavoritesLocal();
  }
}

function renderFavoritesLocal() {
  /*  favoriteDataList.innerHTML = ''; */
  let favClass = '';
  favoriteDataList.innerHTML = '';
  for (const drink of favorites) {
    /* li */
    favClass = 'card__favorite';

    const favCard = document.createElement('li');
    favCard.classList.add('js-cocktail__card');
    favCard.classList.add(favClass);
    favCard.classList.add('card');
    favCard.classList.add('card--fav');
    favCard.setAttribute('id', drink.id);
    favoriteDataList.appendChild(favCard);

    /* imagen */
    const favCardImg = document.createElement('img');
    favCardImg.classList.add('card__img');
    favCardImg.classList.add('card__img--fav');
    favCardImg.src = drink.image;
    favCardImg.alt = drink.name;
    favCard.appendChild(favCardImg);
    /* title */
    const favCardTitle = document.createElement('h2');
    favCardTitle.classList.add('card__title');
    favCardTitle.classList.add('card__title--fav');
    const textFavCardTitle = document.createTextNode(drink.name);
    favCardTitle.appendChild(textFavCardTitle);
    favCard.appendChild(favCardTitle);
    /* boton */
    const favCardBtn = document.createElement('a');
    favCardBtn.setAttribute('id', drink.id);
    favCardBtn.classList.add('card__favorite--dislbtn');
    favCardBtn.classList.add('js-dislike-button');
    favCard.appendChild(favCardBtn);

    const favCardDislike = document.createElement('img');
    favCardDislike.classList.add('card__favorite--dislimg');
    favCardBtn.appendChild(favCardDislike);
    favCardDislike.src = './assets/images/heart-circle-minus-solid.svg';

    /* favCard.innerHTML = `<i class="fa-solid fa-heart-circle-minus dislikebutton js-dislike-button" id=${drink.id}></i>`; */
  }
  listenDislikeButton();
}

function handleSearchButton(event) {
  event.preventDefault();
  getFromApi();
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
    })
    .catch((error) => console.log(`Ha sucedido un error: ${error}`));
}

function emptyAvatar(data) {
  console.log('paso por emty av');
  for (const drink of data) {
    if (drink.image === null) {
      drink.image = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgdRaq2P7x32D8eIIf-LoP0nehibaasT5SRQ&usqp=CAU`;
      renderFilteredList(data);
    } else {
      renderFilteredList(data);
    }
  }
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

function renderFilteredList(data) {
  let html = '';
  let htmlFav = '';
  let favClass = '';
  for (const drink of data) {
    const isFav = isFavorite(drink);
    if (isFav) {
      favClass = 'card__favorite';
      const htmltext = `<li class="js-cocktail__card ${favClass} card" id="${drink.id}"><img class="card__img" src=${drink.image} alt=""><h2 class="card__title card__title--fav">${drink.name}</h2></li>`;
      html += htmltext;
    } else {
      favClass = '';
      html += `<li class="js-cocktail__card ${favClass} card" id="${drink.id}"><img class="card__img" src=${drink.image} alt=""><h2 class="card__title">${drink.name}</h2></li>`;
    }
  }
  cocktailCardList.innerHTML = html;
  getLocalStorage();
  listenCardClick();
  listenDislikeButton();
}

function handleCardClick(event) {
  console.log('estoy en handleCardClick');
  const clickedItemId = event.currentTarget.id;
  const objetClicked = cocktailData.find((itemDrink) => {
    return itemDrink.id === clickedItemId;
  });
  const favoritesFound = favorites.findIndex((fav) => {
    return fav.id === clickedItemId;
  });
  if (favoritesFound === -1) {
    console.log('renderizo desde handlecardCLick');
    favorites.push(objetClicked);
  } else {
    favorites.splice(favoritesFound, 1);
  }
  setFavInLocalStorage();
  renderFilteredList(cocktailData);
  renderFavoritesLocal();
}

function setFavInLocalStorage() {
  for (const drink of cocktailData) {
    if (drink !== null) {
      const stringFavDrinks = JSON.stringify(favorites);
      localStorage.setItem('favorites', stringFavDrinks);
    }
  }
}

function handleDislikeClick(event) {
  const clickedItemId = event.currentTarget.id;
  const objetClicked = cocktailData.find((itemDrink) => {
    return itemDrink.id === clickedItemId;
  });
  const favoritesFound = favorites.findIndex((fav) => {
    return fav.id === clickedItemId;
  });
  if (favoritesFound === -1) {
    favorites.push(objetClicked);
    setFavInLocalStorage();
    renderFilteredList(cocktailData);
    renderFavoritesLocal();
  } else {
    favorites.splice(favoritesFound, 1);
    console.log('dislike--para borrar');
    console.log(favorites);
    setFavInLocalStorage();
    renderFilteredList(cocktailData);
    renderFavoritesLocal();
  }
}

function listenCardClick() {
  const cocktailCard = document.querySelectorAll('.js-cocktail__card');
  for (const drinkItem of cocktailCard) {
    drinkItem.addEventListener('click', handleCardClick);
  }
}

function listenDislikeButton() {
  console.log('escuchando al botón dislike');
  const dislikeButton = document.querySelectorAll('.js-dislike-button');
  for (const dislikeItem of dislikeButton) {
    dislikeItem.addEventListener('click', handleDislikeClick);
  }
}

function handleResetButton(event) {
  event.preventDefault();
  cocktailCardList.innerHTML = '';
  searchInput.value = '';
  favorites = [];
  setFavInLocalStorage();
  renderFavoritesLocal();
}

searchButton.addEventListener('click', handleSearchButton);
resetButton.addEventListener('click', handleResetButton);

getLocalStorage();
