import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

/* ================================================= */
/* LOGIN */
/* ================================================= */

export const signIn = createAsyncThunk(
  "auth/login",

  async (
    { formValue, navigate, toast },
    { rejectWithValue }
  ) => {

    try {

      /* ================= DEBUG ================= */

      console.log("FORM VALUE:", formValue);

      /* ================= API REQUEST ================= */

      const response = await api.login(formValue);

      console.log("RESPONSE:", response);

      /* ================= SUCCESS TOAST ================= */

      toast.success(
        response.message || "Connexion réussie"
      );

      /* ================= REDIRECT ================= */

      navigate("/");

      /* ================= RETURN DATA ================= */

      return response.data;

    } catch (error) {

      console.log("FULL ERROR:", error);

      const message =
        error.response?.message ||
        error.message ||
        "Erreur serveur";

      toast.error(message);

      return rejectWithValue(message);
    }
  }
);

/* ================================================= */
/* SLICE */
/* ================================================= */

const authSlice = createSlice({

  name: "auth",

  initialState: {

    user: null,

    loading: false,

    error: null,
    isAuthenticated: false,

  },

  reducers: {

    /* ================= SET USER ================= */

    setUser: (state, action) => {

      state.user = action.payload;
      state.isAuthenticated = true;
    },

    /* ================= LOGOUT ================= */

    setLogout: (state) => {

       localStorage.clear();

      state.user = null;  
      state.error = null;
      state.isAuthenticated = false;
    },
  },



  extraReducers: (builder) => {

    builder


      .addCase(signIn.pending, (state) => {

        state.loading = true;

        state.error = null;
      })


      .addCase(signIn.fulfilled, (state, action) => {

        state.loading = false;


        state.user = action.payload;


        localStorage.setItem(
          "profile",
          JSON.stringify(action.payload)
        );

        state.error = null;
      })


      .addCase(signIn.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload || "Erreur de connexion";
      });
  },
});


export const {
  setUser,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;