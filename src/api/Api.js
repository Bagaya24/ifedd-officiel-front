import axios from "axios";

// const urlbase = import.meta.env.VITE_APP_URL_DEVELOPEMENT;
const urlbase="https://api.officiel.ifedd-rdc.org/";

const tokenString = localStorage.getItem("token") ?? "{}";
const jwtToken= JSON.parse(tokenString);

const api = axios.create({
  baseURL: urlbase,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwtToken}`,
  },
});

const apiFormData = axios.create({
  baseURL: urlbase,
  timeout: 50000,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${jwtToken}`,
  },
});

export { api, apiFormData, urlbase };
