import {
  homePageSelector,
  goBtnSelector,
  barPageSelector,
  themesSelector,
  barCardsSelector,
  hotelPageSelector,
  hotelCardsSelector,
  mapPageSelector,
  mapSelector,
  mapId,
  buttonsSelector,
  backBtnSelector,
  nextBtnSelector,
  infoBtnSelector,
  tripBtnSelector,
  exitBtnSelector,
  themeTemplateSelector,
  cardTemplateSelector,
  themeSelectors,
  themeActiveClass,
  cardSelectors,
  cardActiveClass,
  cardHiddenClass,
  hidePageClass,
  hideButtonsClass,
  hideButtonClass,
  bars,
  hotels,
} from "../utils/constants.js";
import LinkedList from "../utils/LinkedList.js";

let selectedBars = new LinkedList();
let themes = {};
let currentTheme = "";
let startPoint;

// Pages
const homePage = document.getElementById(homePageSelector);
const barPage = document.getElementById(barPageSelector);
const hotelPage = document.getElementById(hotelPageSelector);
const mapPage = document.getElementById(mapPageSelector);

const pages = [homePage, barPage, hotelPage, mapPage];
let currentPage;

function closePages() {
  pages.forEach((page) => {
    page.classList.add(hidePageClass);
  });
}

function openPage(element) {
  closePages();
  element.classList.remove(hidePageClass);
  currentPage = element;
}

function openHomePage() {
  openPage(homePage);
  closeButtons();
}

function openBarPage() {
  openPage(barPage);
  openButtons();
  showMiddleButton(nextBtn);
}

function openHotelPage() {
  openPage(hotelPage);
  openButtons();
  showMiddleButton(tripBtn);
}

let selectedHotel;
function openMapPage() {
  if (!selectedHotel) return;
  openPage(mapPage);
  openButtons();
  //showMiddleButton(infoBtn);
  hideMiddleButtons();
  initMap();
}

// Buttons
const buttons = document.getElementById(buttonsSelector);
const backBtn = document.getElementById(backBtnSelector);
const exitBtn = document.getElementById(exitBtnSelector);

const nextBtn = document.getElementById(nextBtnSelector);
//const infoBtn = document.getElementById(infoBtnSelector);
const tripBtn = document.getElementById(tripBtnSelector);

const middleButtons = [nextBtn, /*infoBtn,*/ tripBtn];

function openButtons() {
  buttons.classList.remove(hideButtonsClass);
}

function closeButtons() {
  buttons.classList.add(hideButtonsClass);
}

function showMiddleButton(element) {
  hideMiddleButtons();
  element.classList.remove(hideButtonClass);
}

function hideMiddleButtons() {
  middleButtons.forEach((middleButton) => {
    middleButton.classList.add(hideButtonClass);
  });
}

backBtn.addEventListener("click", () => {
  if (currentPage === barPage) return openHomePage();
  if (currentPage === hotelPage) return openBarPage();
  if (currentPage === mapPage) return openHotelPage();
});

exitBtn.addEventListener("click", openHomePage);
nextBtn.addEventListener("click", openHotelPage);
tripBtn.addEventListener("click", openMapPage);

// Home Page
const goBtn = document.getElementById(goBtnSelector);
goBtn.addEventListener("click", openBarPage);

// Bar Page
const barCards = document.getElementById(barCardsSelector);
const themeButtons = document.getElementById(themesSelector);

let loadedBarCards = [];
function loadBars() {
  bars.forEach((barData) => {
    // Load start point
    if (barData.categories === "START POINT!") {
      startPoint = {
        name: barData.name,
        categories: barData.categories,
        lat: parseFloat(barData.latitude),
        lng: parseFloat(barData.longitude),
      };
      return;
    }

    // Load themes
    themes[barData.categories] = 1;

    // Fill bars card container
    const card = createCard(barData);

    let node;
    card.element.addEventListener("click", () => {
      if (node) {
        selectedBars.remove(node);
        node = null;
        card.element.classList.remove(cardActiveClass);
      } else {
        node = selectedBars.append(card);
        card.element.classList.add(cardActiveClass);
      }
    });

    loadedBarCards.push(card);
    barCards.append(card.element);
  });
}

function filterCards() {
  loadedBarCards.forEach((card) => {
    if (card.categories === currentTheme) {
      card.element.classList.remove(cardHiddenClass);
    } else {
      card.element.classList.add(cardHiddenClass);
    }
  });
}

function loadThemeButtons() {
  Object.keys(themes).forEach((themeName) => {
    const themeElement = createThemeButtonElement(themeName);
    themeButtons.append(themeElement);
  });
}

// Hotel Page
const hotelCards = document.getElementById(hotelCardsSelector);

function createHotelCards() {
  hotels.forEach((hotelData) => {
    // Fill hotels card container
    const card = createCard(hotelData);

    card.element.addEventListener("click", () => {
      if (selectedHotel) {
        selectedHotel.element.classList.remove(cardActiveClass);
      }

      card.element.classList.add(cardActiveClass);
      selectedHotel = card;
    });

    hotelCards.append(card.element);
  });
}

// Card
const cardTemplate = document.getElementById(cardTemplateSelector);

function createCard(data) {
  return {
    name: data.name,
    categories: data.categories,
    lat: parseFloat(data.latitude),
    lng: parseFloat(data.longitude),
    element: createCardElement(data),
  };
}

function createCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(cardSelectors.list)
    .cloneNode(true);

  const cardImage = cardElement.querySelector(cardSelectors.image);
  const cardName = cardElement.querySelector(cardSelectors.name);

  cardImage.src = data.image;
  cardImage.alt = data.name;
  cardName.textContent = data.name;

  return cardElement;
}

// Theme
const themeTemplate = document.getElementById(themeTemplateSelector);
let lastThemeButtonPressed;

function createThemeButtonElement(themeName) {
  const themeElement = themeTemplate.content
    .querySelector(themeSelectors.list)
    .cloneNode(true);

  themeElement.textContent = themeName;
  themeElement.addEventListener("click", () => {
    if (themeName === currentTheme) {
      themeElement.classList.remove(themeActiveClass);
      lastThemeButtonPressed = null;
      currentTheme = "";
      return;
    }

    if (lastThemeButtonPressed) {
      lastThemeButtonPressed.classList.remove(themeActiveClass);
      lastThemeButtonPressed = null;
    }

    themeElement.classList.add(themeActiveClass);
    currentTheme = themeName;
    filterCards();

    lastThemeButtonPressed = themeElement;
  });

  return themeElement;
}

// Map
import GoogleMap from "../utils/googleMap.js";
const mapElement = document.getElementById(mapSelector);

let map;
async function initMap() {
  if (!map) {
    map = new GoogleMap(mapId);
    map.load(mapElement);
  }

  map.clearMarkers();

  // Starting Marker
  map.addMarker(
    { lat: startPoint.lat, lng: startPoint.lng },
    startPoint.name,
    map.createPin(2, "#EA4335", "#EA4335", "1")
  );

  // Bar Markers
  let currentNode = selectedBars.head;
  let i = 2;
  while (currentNode) {
    const { lat, lng, name } = currentNode.item;
    map.addMarker(
      { lat: lat, lng: lng },
      name,
      map.createPin(2, "#EA4335", "#EA4335", i.toString())
    );
    i++;
    currentNode = currentNode.next;
  }

  // Endding Marker
  map.addMarker(
    { lat: selectedHotel.lat, lng: selectedHotel.lng },
    selectedHotel.name,
    map.createPin(2, "#EA4335", "#EA4335", i.toString())
  );

  map.displayRoute();
  map.focusViewOnMarkers();
}

// Init
loadBars();
loadThemeButtons();
createHotelCards();
