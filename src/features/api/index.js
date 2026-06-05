import axios from "axios";
import { setLogout } from "../auth/authSlice";


let store; // injection du store

export const injectStore = (_store) => {
  store = _store;
};

const API = axios.create({
  baseURL: "http://localhost:5000",
});

/* ================================================= */
/* REQUEST INTERCEPTOR */
/* ================================================= */

API.interceptors.request.use(
  (req) => {
    const profile = localStorage.getItem("profile");

    if (profile && profile !== "undefined") {
      try {
        const parsed = JSON.parse(profile);

        if (parsed?.token) {
          req.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (e) {
        localStorage.removeItem("profile");
      }
    }

    return req;
  },
  (error) => Promise.reject(error)
);

/* ================================================= */
/* RESPONSE INTERCEPTOR */
/* ================================================= */

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 && store) {
      console.log("Session expirée");

      localStorage.removeItem("profile");

      store.dispatch(setLogout());

      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

/* ================================================= */
/* AUTH */
/* ================================================= */

export const login = (formData) => API.post("/api/auth/login", formData);


/* ================================================= */
/* CYCLE */
/* ================================================= */

export const addCycle = (data) =>
  API.post("/api/cycle/add", data);

export const getAllCycle = () =>
  API.get("/api/cycle/all");

export const getCycleById = (id) =>
  API.get(`/api/cycle/${id}`);

/* ================================================= */
/* SECTION */
/* ================================================= */

export const addSection = (data) =>
  API.post("/api/section/add", data);

export const getAllSection = () =>
  API.get("/api/section/all");

/* ================================================= */
/* OPTION */
/* ================================================= */

export const addOption = (data) =>
  API.post("/api/option/add", data);

export const getAllOption = () =>
  API.get("/api/option/all");

/* ================================================= */
/* CLASSROOM */
/* ================================================= */

export const addClassroom = (data) =>
  API.post("/api/classroom/add", data);

export const getAllClassroom = () =>
  API.get("/api/classroom/all");

/* ================================================= */
/* YEAR */
/* ================================================= */

export const addYear = (data) =>
  API.post("/api/year/add", data);

export const getAllYears = () =>
  API.get("/api/year/all");

/* ================================================= */
/* USER */
/* ================================================= */

export const addUser = (data) =>
  API.post("/api/user/add-user", data);

export const getAllUsers = () =>
  API.get("/api/user/all_users");

export const getSchoolUsers = () =>
  API.get("/api/user/school-users");

export default API;