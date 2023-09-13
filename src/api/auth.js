import axios from "./axios.js";

export async function registerRequest(user) {
  return await axios.post(`/auth/register`, user);
}

export async function verifyTokenRequest(token) {
  return await axios.get(`/auth/verify-token`, token);
}

export async function loginRequest(user) {
  return await axios.post(`/auth/login`, user);
}

export async function logoutRequest() {
  return await axios.get(`/auth/logout`);
}
