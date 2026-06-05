import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";


export const addNewYear = createAsyncThunk("year/add",  async ({ finalData, navigate, toast }, { rejectWithValue }) => {
    
        try {
          
        
          const response = await api.addNewFees(finalData);    
    
          toast.success(
            response.data.message
          );
        
          navigate("/year-list");
    
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

export const getAllYears = createAsyncThunk("year/all", async(_, { rejectWithValue }) => {
  
        try {
          
            const response = await api.getAllYears()
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


  const yearSlice = createSlice({

    name: "year",

    initialState: {

      year: {},

      allYears: [],

      loading: false,

      error: null,
    },
     extraReducers: (builder) => {
    
        builder  
          .addCase(addNewYear.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(addNewYear.fulfilled, (state, action) => {    
            state.loading = false;     
            state.year = action.payload;         
            state.error = null;
          })        
          .addCase(addNewYear.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          .addCase(getAllYears.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(getAllYears.fulfilled, (state, action) => {    
            state.loading = false;     
            state.allYears = action.payload.data;         
            state.error = null;
          })        
          .addCase(getAllYears.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          
      },

  })

  export default yearSlice.reducer