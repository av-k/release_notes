import * as localStorageHelper from './localStorage';

const PREFIX = process.env.WEB_APP_PREFIX;
const KEYS = {
  STORE: `${PREFIX}_$`
};

/**
 *
 * @param key
 * @param store
 */
export const saveItem = (key, store = {}) => {
  localStorageHelper.setItem(`${KEYS.STORE}${key}`, JSON.stringify(store));
};

/**
 *
 * @param key
 */
export const getItem = (key) => {
  localStorageHelper.getItem(`${KEYS.STORE}${key}`);
};

/**
 *
 * @param store
 */
export const saveStore = (store = {}) => {
  localStorageHelper.setItem(KEYS.STORE, JSON.stringify(store));
};

/**
 *
 */
export const loadStore = () => {
  let store = {};
  const data = localStorageHelper.getItem(KEYS.STORE);
  if (!data) return store;
  try { store = JSON.parse(data); } catch (e) {}
  return store;
};

export const cleatStore = () => {
  localStorageHelper.clear();
};
