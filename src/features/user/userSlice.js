import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";


export const createUser = createAsyncThunk(
  "user/create",

  async (
    { formValue, navigate, toast },
    { rejectWithValue }
  ) => {

    try {


      /* ================= API REQUEST ================= */

      const response = await api.addUser(formValue);

      /* ================= SUCCESS TOAST ================= */

      toast.success(
        response.message 
      );

      /* ================= REDIRECT ================= */

      navigate("/users");

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

export const allUser = createAsyncThunk(
  "user/all-user",

  async (_, { rejectWithValue } ) => {

    try {

      const response = await api.getAllUsers();

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

export const schoolAllUsers = createAsyncThunk(
  "user/school-list",

  async (_, { rejectWithValue } ) => {

    try {


      /* ================= API REQUEST ================= */

      const response = await api.getSchoolUsers();

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


const userSlice = createSlice({

  name: "user",

  initialState: {

    user: null,

    users: [],

    loading: false,

    error: null,

  },


  extraReducers: (builder) => {

    builder
      .addCase(createUser.pending, (state) => {

        state.loading = true;

        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {

        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload || "Erreur de connexion";
      })
      .addCase(allUser.pending, (state) => {

        state.loading = true;

        state.error = null;
      })
      .addCase(allUser.fulfilled, (state, action) => {

        state.loading = false;
        state.users = action.payload.data;
        state.error = null;
      })
      .addCase(allUser.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload || "Erreur de connexion";
      })
      .addCase(schoolAllUsers.pending, (state) => {

        state.loading = true;

        state.error = null;
      })
      .addCase(schoolAllUsers.fulfilled, (state, action) => {

        state.loading = false;
        state.users = action.payload.data;
        state.error = null;
      })
      .addCase(schoolAllUsers.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload || "Erreur de connexion";
      })
  },
});


export default userSlice.reducer;