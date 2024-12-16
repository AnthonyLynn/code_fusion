/*import {
  initialCards,
  hotelCards,
  cardsHeader,
  profileGoButton,
  profileSection,
  pageSection,
  cardsBackButton,
  selectHotelButton,
  nextHotelButton,
  exitAppButton,
  infoAppButton,
  footerSection,
  cardsSection,
  cardContentContainer,
  mapElement,
  mapId,
} from "../utils/constants.js";
import GoogleMap from "../utils/googleMap.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

function getCardElement(data) {
  const cardElement = document
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);

  cardElement.querySelector(".card__footer-title").textContent = data.name;

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;

  const id = uuidv4();

  // const cardHeartBtn = cardElement.querySelector(".card__footer-heart-btn");

  // cardHeartBtn.addEventListener("click", () => {
  //   handleLikeButton(cardHeartBtn);
  // });

  // const cardTrashButton = cardElement.querySelector(".card__trash-btn");

  // cardTrashButton.addEventListener("click", () => {
  //   handleDeleteButton(cardElement);
  // });

  cardImage.addEventListener("click", () => {
    // openImageModal(cardElement);
  });

  return cardElement;
}
function handleLikeButton(cardEl) {
  cardEl.classList.toggle("card__footer-heart-btn-liked");
}

function displayCards(cardData) {
  cardData.forEach((item) => {
    cardContentContainer.append(getCardElement(item));
  });
}

function barsPage() {
  cardsHeader.textContent = "Select Bars";
  cardsBackButton.style = "display: none";
  selectHotelButton.style = "display: none";
  infoAppButton.style = "display: none";
  nextHotelButton.style =
    "background-image: url('../images/SelectHotel-btn.svg')";
  cardContentContainer.innerHTML = "";
  profileSection.style = "display: none";
  footerSection.style = "display: none";
  pageSection.style = "background-color: #EAE7E5";
  const barCards = displayCards(initialCards);
  cardsSection.style.display = "block";
  mapElement.style.display = "none";
}

function hotelPage() {
  cardsHeader.textContent = "Select Hotels";
  cardsBackButton.style.display = "";
  cardContentContainer.innerHTML = "";
  nextHotelButton.style = "display: none";
  selectHotelButton.style.display = "";
  infoAppButton.style = "display: none";
  mapElement.style.display = "none";
  displayCards(hotelCards);
}
function mapPage() {
  cardsHeader.textContent = "Your Bar Hoppin Route";
  cardsBackButton.style.display = "";
  cardContentContainer.innerHTML = "";
  selectHotelButton.style = "display: none";
  nextHotelButton.style = "display: none";
  infoAppButton.style.display = "";
  mapElement.style.display = "";
}

function homeStart() {
  profileSection.style.display = "";
  pageSection.style = "background-color: #1e1e1e";
  cardsSection.style.display = "none";
  mapElement.style.display = "none";
}

profileGoButton.addEventListener("click", () => {
  barsPage();
  history.pushState({ view: "bars" }, "Select Bars", "?view=bars");
});

exitAppButton.addEventListener("click", () => {
  homeStart();
});

nextHotelButton.addEventListener("click", () => {
  hotelPage();
  history.pushState({ view: "hotels" }, "Select Hotels", "?view=hotels");
});

selectHotelButton.addEventListener("click", () => {
  mapPage();
  history.pushState({ view: "map" }, "Your Route Map", "?view=map");
});

cardsBackButton.addEventListener("click", () => {
  history.back();
});

window.addEventListener("popstate", (event) => {
  if (event.state) {
    if (event.state.view === "bars") {
      barsPage();
    } else if (event.state.view === "hotels") {
      hotelPage();
    } else if (event.state.view === "map") {
      mapPage();
    }
  } else {
    homeStart();
  }
});

async function initMap() {
  const map = new GoogleMap(mapId);
  map.load(mapElement);
  const pinOne = map.createPin(2, "#EA4335", "#EA4335", "1");
  map.addMarker(
    { lat: 39.00507919540697, lng: -77.37462108939121 },
    "Test",
    pinOne
  );
  const pinTwo = map.createPin(2, "#EA4335", "#EA4335", "2");
  map.addMarker(
    { lat: 39.03521359683118, lng: -77.46924041091553 },
    "Test",
    pinTwo
  );
  const pinThree = map.createPin(2, "#EA4335", "#EA4335", "3");
  map.addMarker(
    { lat: 39.11396980323522, lng: -77.52863987934046 },
    "Test",
    pinThree
  );
  map.displayRoute();
  document.addEventListener("mousedown", (evt) => {
    map.focusViewOnMarkers();
  });
}

window.addEventListener("load", initMap);
*/
