import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
import { id } from "date-fns/locale/id";


export const createUser = createAsyncThunk(
  "user/create",

  async (
    { finalData, navigate, toast },
    { rejectWithValue }
  ) => {

    try {


      /* ================= API REQUEST ================= */

      const response = await api.addUser(finalData);


      /* ================= SUCCESS TOAST ================= */

      toast.success(

        response.data.message 
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

export const detailsUser = createAsyncThunk(
  "user/details-infos",

  async (id, { rejectWithValue } ) => {

    try {


      /* ================= API REQUEST ================= */
      
      const response = await api.getUser(id); 

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
      .addCase(detailsUser.pending, (state) => {

        state.loading = true;

        state.error = null;
      })
      .addCase(detailsUser.fulfilled, (state, action) => {

        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(detailsUser.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload || "Erreur de connexion";
      })
  },
});


export default userSlice.reducer;