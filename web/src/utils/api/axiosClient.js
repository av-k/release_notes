import axios from 'axios';
import lodash from 'lodash';
let axiosClient = null;

class AxiosClient {
  constructor(props = {}) {
    Object.keys(props).forEach((propName) => {
      this[`_${propName}`] = props[propName];
    });

    const localAxios = axios.create({
      baseURL: `http://${this._API_HOST}${this._API_PORT ? `:${this._API_PORT}` : ''}/v${this._API_VERSION}`,
      timeout: 5000,
    });

    localAxios.interceptors.request.use((config) => {
      const store = this._store;
      const state = store.getState();
      const accessToken = lodash.get(state, 'user.accessToken');
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      return {
        ...config,
        headers,
      };
    });

    localAxios.interceptors.response.use(
      response => Promise.resolve(lodash.get(response, 'data', null)), // FIXME
      error => Promise.reject(error.response),
    );

    this._client = localAxios;
  }

  getAxios() {
    return this._client;
  }
}

/**
 *
 * @param props
 */
function init(props) {
  axiosClient = new AxiosClient(props);
}

function getAxios() {
  return axiosClient.getAxios();
}

export {
  init,
  getAxios
}
