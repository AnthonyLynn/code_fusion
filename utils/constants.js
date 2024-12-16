import hotelData from "../hotels.json" with { type: "json" };
import barsData from "../santacon_2024_venues.json" with { type: "json" };

export const selectedCardList = [];
export const barCards = barsData.data;
export const hotelCards = hotelData.Hotels;
export const pageSection = document.querySelector(".page");
export const profileGoButton = document.querySelector(".profile__go-btn");
export const profileSection = document.querySelector(".profile");
export const cardsSection = document.querySelector(".cards");
export const cardsHeader = document.querySelector(".cards__header");
export const cardId = cardsSection.querySelector("#id");
export const cardContentContainer = document.querySelector(".cards__pics");
export const cardsBackButton = document.querySelector(".cards__back-btn");
export const selectHotelButton = document.querySelector(
  ".cards__selecthotel-btn"
);
export const nextHotelButton = document.querySelector(".cards__nexthotel-btn");
export const exitAppButton = document.querySelector(".cards__exit-btn");
export const infoAppButton = document.querySelector(".cards__info-btn");

export const footerSection = document.querySelector(".footer");


export const mapElement = document.getElementById("map");
export const mapId = "38b778211c09ff7e";


