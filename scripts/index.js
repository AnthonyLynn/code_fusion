import {
  initialCards,
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
  cardId
} from "../utils/constants.js";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";

function getCardElement(data, cardType) {
  const cardElement = document
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.setAttribute("data-card-type", cardType);

  return cardElement;
}

function getSelectedCards(cardsSection) {
  cardsSection.addEventListener("click", (event) => {
    const card = event.target.closest(".card");

    if (card) {
      const cardType = card.getAttribute("data-card-type");
      const dataId = uuidv4();
      const cardData = {
        id: dataId,
        card_Type: cardType
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

      console.log("Selected Cards:", selectedCardList);

      console.log(`Card selected: ${dataId}`);
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
  displayCards(initialCards, cardType);
  cardsSection.style.display = "block";
}

function hotelPage() {
  cardsHeader.textContent = "Select Hotels";
  cardsBackButton.style.display = "";
  cardContentContainer.innerHTML = "";
  nextHotelButton.style = "display: none";
  selectHotelButton.style.display = "";
  infoAppButton.style = "display: none";
  const cardType = "hotel";
  displayCards(hotelCards, cardType);
}
function mapPage() {
  cardsHeader.textContent = "Your Bar Hoppin Route";
  cardsBackButton.style.display = "";
  cardContentContainer.innerHTML = "";
  selectHotelButton.style = "display: none";
  nextHotelButton.style = "display: none";
  infoAppButton.style.display = "";
}

function homeStart() {
  profileSection.style.display = "";
  pageSection.style = "background-color: #1e1e1e";
  cardsSection.style.display = "none";
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
getSelectedCards(cardsSection);
