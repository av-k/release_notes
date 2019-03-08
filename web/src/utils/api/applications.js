import { getAxios } from './axiosClient';

export function loadApplications(options) {
  const axios = getAxios();
  return axios.get('/application/list', { params: { ...options } });
}

export function loadApplication(id, options) {
  const axios = getAxios();
  return axios.get(`/application/${id}`, { params: { ...options } });
}

export function createApplication(data) {
  const axios = getAxios();
  return axios.put('/application/create', data);
}

export function updateApplication(id, options) {
  const axios = getAxios();
  return axios.post(`/application/${id}`, options);
}

export function deleteApplication(id) {
  const axios = getAxios();
  return axios.post(`/application/${id}`);
}
