import hotelsJson from "../hotels.json" with { type: "json" };
import barsJson from "../santacon_2024_venues.json" with { type: "json" };

// Page
export const hidePageClass = "page__section_hidden";

// Home page
export const homePageSelector = "home-page";
export const goBtnSelector = "go-btn";

// Bar page
export const barPageSelector = "bar-page";
export const themesSelector = "themes";
export const barCardsSelector = "bar-cards";

export const bars = barsJson.data;

// Hotel page
export const hotelPageSelector = "hotel-page";
export const hotelCardsSelector = "hotel-cards";

export const hotels = hotelsJson.Hotels;

// Map page
export const mapPageSelector = "map-page";
export const mapSelector = "map";
export const mapId = "38b778211c09ff7e";

// Buttons
export const buttonsSelector = "buttons";
export const hideButtonsClass = "buttons_hidden";

export const backBtnSelector = "back-btn";
export const nextBtnSelector = "next-btn";
export const infoBtnSelector = "info-btn";
export const tripBtnSelector = "trip-btn";
export const exitBtnSelector = "exit-btn";
export const hideButtonClass = "buttons__button_hidden";

// Templates
export const themeTemplateSelector = "theme";
export const themeSelectors = {
  list: ".theme",
}
export const themeActiveClass = "theme_active";

export const cardTemplateSelector = "card";
export const cardSelectors = {
  list: ".card",
  image: ".card__image",
  name: ".card__name",
};
export const cardActiveClass = "card_active";
export const cardHiddenClass = "card_hidden";
