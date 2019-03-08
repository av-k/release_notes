import { getAxios } from './axiosClient';

const axios = getAxios();

export function login(data) {
  return axios.post('/tokens/email', data);
}
