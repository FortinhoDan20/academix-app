import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const newRegisterPaid = createAsyncThunk(
  "payment/register/add",
  async ({ FormData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addRegisterPaid(FormData);

      console.log("data slices :", response);

      const payment = response?.data?.payment?._id 

      console.log("data payment :", payment)

      if (payment) {
        toast.success(response.data.message);

        navigate(`/receipt/${payment}`);
      }

      /* ================= RETURN DATA ================= */

      // return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Erreur serveur";

      toast.error(message);

      return rejectWithValue(message);
    }
  },
);

export const getAllRegisterPaid = createAsyncThunk(
  "payment/register/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.allRegistersPaid();

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Erreur serveur";

      toast.error(message);

      return rejectWithValue(message);
    }
  },
);

export const getRegisterRecu = createAsyncThunk(
  "payment/register/recu",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getRegisterRecu(id);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Erreur serveur";

      toast.error(message);

      return rejectWithValue(message);
    }
  },
);

export const getAllCurrentPaid = createAsyncThunk(
  "payment/current/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.AllCurrentPaid();
      console.log("response :", response.data)

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Erreur serveur";

      toast.error(message);

      return rejectWithValue(message);
    }
  },
);

export const getAllPayment = createAsyncThunk(
  "payment/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.AllPayments();

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Erreur serveur";

      toast.error(message);

      return rejectWithValue(message);
    }
  },
);



const paymentSlice = createSlice({
  name: "register",

  initialState: {
    registerPaid: {},

    detailsRecu: {},

    tuitionPaid: {},

    paymentList: [],

    registersList: [],

    loading: false,

    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(newRegisterPaid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(newRegisterPaid.fulfilled, (state, action) => {
        state.loading = false;
        // state.registerPaid = action.payload.data;
        state.error = null;
      })
      .addCase(newRegisterPaid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur de connexion";
      })

      .addCase(getAllRegisterPaid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRegisterPaid.fulfilled, (state, action) => {
        state.loading = false;
        state.registersList = action.payload.data;
        state.error = null;
      })
      .addCase(getAllRegisterPaid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur de connexion";
      })
      .addCase(getRegisterRecu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRegisterRecu.fulfilled, (state, action) => {
        state.loading = false;
        state.detailsRecu = action.payload.data;
        state.error = null;
      })
      .addCase(getRegisterRecu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur de connexion";
      })
      .addCase(getAllCurrentPaid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCurrentPaid.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentList = action.payload.data;
        state.error = null;
      })
      .addCase(getAllCurrentPaid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur de connexion";
      })


  },
});

export default paymentSlice.reducer;
