/**
 *
 */
export function clearStorage() {
  clear();
}

/**
 *
 * @param key
 * @returns {string}
 */
export function getItem(key) {
  return localStorage.getItem(key);
}

/**
 *
 * @param key
 * @param data
 */
export function setItem(key, data) {
  localStorage.setItem(key, data);
}

/**
 *
 * @param key
 */
export function removeItem(key) {
  localStorage.removeItem(key);
}

/**
 *
 */
export function clear() {
  localStorage.clear();
}
