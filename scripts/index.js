import {
  barCards,
  hotelCards,
  selectedCardList,
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
  cardId
} from "../utils/constants.js";
import GoogleMap from "../utils/googleMap.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

function getCardElement(data, cardType) {
  const cardElement = document
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.image;
  cardImage.alt = data.name;

  cardElement.setAttribute("data-card-type", cardType);
  cardElement.setAttribute("data-latitude", data.latitude);
  cardElement.setAttribute("data-longitude", data.longitude);

  return cardElement;
}

function getSelectedCards(cardsSection) {
  cardsSection.addEventListener("click", (event) => {
    const card = event.target.closest(".card");

    if (card) {
      const cardName = card.dataset.name;
      const cardType = card.dataset.cardType;
      const cardlatitude = card.dataset.latitude;
      const cardlongitude = card.dataset.longitude;

      const dataId = uuidv4();
      const cardData = {
        name: cardName,
        id: dataId,
        card_Type: cardType,
        card_Lat: parseFloat(cardlatitude),
        card_Long: parseFloat(cardlongitude)
      };

      if (cardType === "hotel") {
        document.querySelectorAll(".card--selected").forEach((selectedCard) => {
          selectedCard.classList.remove("card--selected");
          selectedCard.classList.remove("card--disabled");
        });
        if (!card.classList.contains("card--selected")) {
          card.classList.add("card--selected");
          card.classList.add("card--disabled");

          const hotelIndex = selectedCardList.findIndex(
            (item) => item.card_Type === "hotels"
          );
          if (hotelIndex !== -1) {
            selectedCardList.splice(hotelIndex, 1);
          }

          selectedCardList.push(cardData);
        }
      } else if (cardType === "bars") {
        if (card.classList.toggle("card--selected")) {
          card.classList.add("card--disabled");
          selectedCardList.push(cardData);
        } else {
          const index = selectedCardList.findIndex(
            (item) => item.id === dataId
          );
          if (index !== -1) {
            selectedCardList.splice(index, 1);
            card.classList.remove("card--disabled");
          }
        }
      }
    }
  });
}

function displayCards(cardData, cardType) {
  cardData.forEach((item) => {
    cardContentContainer.append(getCardElement(item, cardType));
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
  const cardType = "bars";
  displayCards(barCards, cardType);
  cardsSection.style.display = "block";
  mapElement.style.display = "none";
}

function hotelPage() {
  cardsHeader.textContent = "Select Hotel";
  cardsBackButton.style.display = "";
  cardContentContainer.innerHTML = "";
  nextHotelButton.style = "display: none";
  selectHotelButton.style.display = "";
  infoAppButton.style = "display: none";
  const cardType = "hotel";
  displayCards(hotelCards, cardType);
  mapElement.style.display = "none";
}
function mapPage() {
  cardsHeader.textContent = "Your Bar Hoppin Route";
  cardsBackButton.style.display = "";
  cardContentContainer.innerHTML = "";
  selectHotelButton.style = "display: none";
  nextHotelButton.style = "display: none";
  infoAppButton.style.display = "";
  mapElement.style.display = "";
  initMap();
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
  while (selectedCardList.length > 0) {
    selectedCardList.pop();
  }
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
  selectedCardList.pop();
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
getSelectedCards(cardsSection);

async function initMap() {
  const map = new GoogleMap(mapId);
  map.load(mapElement);
  const pinOne = map.createPin(2, "#EA4335", "#EA4335", "1"); // Creates element to display

  selectedCardList.forEach((card, index) => {
    const pin = map.createPin(2, "#EA4335", "#EA4335", (index + 1).toString());
    map.addMarker(
      { lat: parseFloat(card.card_Lat), lng: parseFloat(card.card_Long) },
      card.name,
      pin
    );
  });
  // map.addMarker({ lat: 40.751373, lng: -73.993552 }, "Test", pinOne); // Adds the marker to the map
  // const pinTwo = map.createPin(2, "#EA4335", "#EA4335", "2");
  // map.addMarker(
  //   { lat: 39.03521359683118, lng: -77.46924041091553 },
  //   "Test",
  //   pinTwo
  // );
  // const pinThree = map.createPin(2, "#EA4335", "#EA4335", "3");
  // map.addMarker(
  //   { lat: 39.11396980323522, lng: -77.52863987934046 },
  //   "Test",
  //   pinThree
  // );

  map.displayRoute(); // Creates map from markers
  document.addEventListener("mousedown", (evt) => {
    map.focusViewOnMarkers();
  });
}
// window.addEventListener("load", initMap);
