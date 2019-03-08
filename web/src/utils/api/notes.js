import { getAxios } from './axiosClient';

export function loadNotes(options) {
  const axios = getAxios();
  return axios.get('/note/list', { params: { ...options } });
}

export function loadNote(id, options) {
  const axios = getAxios();
  return axios.get(`/note/${id}`, { params: { ...options } });
}

export function createNote(data) {
  const axios = getAxios();
  return axios.put('/note/create', data);
}

export function updateNote(id, options) {
  const axios = getAxios();
  return axios.post(`/note/${id}`, options);
}

export function deleteNote(id) {
  const axios = getAxios();
  return axios.post(`/note/${id}`);
}
