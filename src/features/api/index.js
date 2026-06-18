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
/* FEES */
/* ================================================= */

export const addNewFees = (data) =>
  API.post("/api/fees/add", data);

export const getAllFees = () =>
  API.get("/api/fees/all");

/* ================================================= */
/* USER */
/* ================================================= */

export const addUser = (data) =>
  API.post("/api/user/add-user", data);

export const getAllUsers = () =>
  API.get("/api/user/all_users");

export const getSchoolUsers = () =>
  API.get("/api/user/school-users");

export const getUser = (id) =>
  API.get(`/api/user/${id}`);

/* ================================================= */
/* STUDENT */
/* ================================================= */

export const addStudent = (data) => API.post("/api/student/add", data);

export const getAllStudets = () => API.get("/api/student/all");

export const getStudents = (id) => API.get(`/api/student/${id}`);

/* ================================================= */
/* CYCLE */
/* ================================================= */

export const addNewClycle = (data) =>
  API.post("/api/cycle/add", data);

export const getAllCycles = () =>
  API.get("/api/cycle/all");


export const getCycle = (id) =>
  API.get(`/api/cycle/${id}`);

/* ================================================= */
/* REGISTER */
/* ================================================= */

export const addRegister = (data) =>
  API.post("/api/register/add", data);

export const allRegisters = () =>
  API.get("/api/register/all");

export const registersNoFeePaid = () =>
  API.get("/api/register/all-no-feepaid");

export const getRegister = (id) =>
  API.get(`/api/register/${id}`); 


/* ================================================= */
/* REGISTER  PAID*/
/* ================================================= */

export const addRegisterPaid = (data) =>
  API.post("/api/regiser-fee-paid/add", data)
;

export const allRegistersPaid = () =>
  API.get("/api/regiser-fee-paid/all");

export const getRegisterRecu = (id) =>
  API.get(`/api/regiser-fee-paid/${id}`); 


export default API;