import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";


export const addRegistration = createAsyncThunk("register/add",  async ({ finalData, navigate, toast }, { rejectWithValue }) => {
    
        try {
         
        
          const response = await api.addRegister(finalData);    
    
          toast.success(
            response.data.message
          );
        
          navigate("/list-inscrit");
    
          /* ================= RETURN DATA ================= */
    
          return response.data;
    
        } catch (error) {

          const message =
            error.response?.data?.message ||
            error.message ||
            "Erreur serveur";
    
          toast.error(message);
    
          return rejectWithValue(message);
        }
      
})


export const getAllRegisters = createAsyncThunk("register/all", async(_, { rejectWithValue }) => {
  
        try {
            const response = await api.allRegisters()

            return response.data

  
        } catch (error) {

          const message =
            error.response?.data?.message ||
            error.message ||
            "Erreur serveur";
    
          toast.error(message);
    
          return rejectWithValue(message);
        }
  
})

export const allRegistersNofeePaid = createAsyncThunk("register/all-no-feepaid", async(_, { rejectWithValue }) => {
  
        try {
            const response = await api.registersNoFeePaid()

            console.log("data slice :", response)

            return response.data

  
        } catch (error) {

          const message =
            error.response?.data?.message ||
            error.message ||
            "Erreur serveur";
    
          toast.error(message);
    
          return rejectWithValue(message);
        }
  
})



  const registerSlice = createSlice({

    name: "register",

    initialState: {

      register: {},

      effectif: 0,

      garcons: 0,

      filles: 0,

      registers: [],

      loading: false,

      error: null,
    },
     extraReducers: (builder) => {
    
        builder  
          .addCase(addRegistration.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(addRegistration.fulfilled, (state, action) => {    
            state.loading = false;     
            state.register = action.payload;         
            state.error = null;
          })        
          .addCase(addRegistration.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          .addCase(getAllRegisters.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })      
          .addCase(getAllRegisters.fulfilled, (state, action) => {    
            state.loading = false;     
            state.registers = action.payload.data;  
            state.effectif = action.payload.effectif
            state.garcons = action.payload.garcons  
            state.filles = action.payload.filles         
            state.error = null;
          })        
          .addCase(getAllRegisters.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })
          .addCase(allRegistersNofeePaid.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })      
          .addCase(allRegistersNofeePaid.fulfilled, (state, action) => {    
            state.loading = false;     
            state.registers = action.payload.data;       
            state.error = null;
          })        
          .addCase(allRegistersNofeePaid.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          
      },

  })

  export default registerSlice.reducer