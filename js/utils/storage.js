import { playSound } from "./audio.js?v=6.1.0";

const favoritesSet = new Set(JSON.parse(localStorage.getItem("santuario_favorites") || "[]"));

export function isFavorite(dragonId) {
  return favoritesSet.has(dragonId);
}

export function toggleFavorite(dragonId) {
  if (favoritesSet.has(dragonId)) {
    favoritesSet.delete(dragonId);
  } else {
    favoritesSet.add(dragonId);
    playSound("chime");
  }
  localStorage.setItem("santuario_favorites", JSON.stringify([...favoritesSet]));
}

export function getFavoritesSet() {
  return favoritesSet;
}
