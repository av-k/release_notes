import axios from 'helpers/api/axiosClient';

export function getUsers(options) {
  return axios.get('/profiles', { params: { ...options } });
}

export function getUser(id) {
  return axios.get(`/profiles/${id}`);
}

export function createUser(data) {
  return axios.post('/users', data);
}

export function updateUser(id, data) {
  return axios.put(`/users/${id}`, data);
}

export function updateUserStatus(id, status) {
  return axios.put(`/users/${id}/status`, { status });
}

export const uploadAvatarUrl = '/users/resources';

export function getCsv(options) {
  return axios.get('/profiles/csv', { params: { ...options } });
}
