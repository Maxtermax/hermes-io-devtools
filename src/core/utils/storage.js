export function getItemFromLocalStorage (key = "") {
  return window.localStorage.getItem(key) || "";
}

export function setItemFromLocalStorage (key = "", value = "") {
  return window.localStorage.setItem(key, value);
}
