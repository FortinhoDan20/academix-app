import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";


export const addNewFees = createAsyncThunk("fees/add",  async ({ finalData, navigate, toast }, { rejectWithValue }) => {
    
        try {
          
        
          const response = await api.addNewFees(finalData);    
    
          toast.success(
            response.data.message
          );
        
          navigate("/fees-list");
    
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

export const getAllFees = createAsyncThunk("fees/all", async(_, { rejectWithValue }) => {
  
        try {
            console.log("on est ici sur frais scolaire")
            const response = await api.getAllFees()
            console.log("frais :", response )

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


  const feesSlice = createSlice({

    name: "fees",

    initialState: {

      fees: {},

      allFees: [],

      loading: false,

      error: null,
    },
     extraReducers: (builder) => {
    
        builder  
          .addCase(addNewFees.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(addNewFees.fulfilled, (state, action) => {    
            state.loading = false;     
            state.fees = action.payload;         
            state.error = null;
          })        
          .addCase(addNewFees.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          .addCase(getAllFees.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(getAllFees.fulfilled, (state, action) => {    
            state.loading = false;     
            state.allFees = action.payload.data;         
            state.error = null;
          })        
          .addCase(getAllFees.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          
      },

  })

  export default feesSlice.reducer