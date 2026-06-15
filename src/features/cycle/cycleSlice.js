import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";


export const addNewCycle = createAsyncThunk("cycle/add",  async ({ finalData, navigate, toast }, { rejectWithValue }) => {
    
        try {
    
        
          const response = await api.addNewClycle(finalData);    
    
          toast.success(
            response.data.message
          );
        
          navigate("/cycle-list");
    
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

export const getAllCycle = createAsyncThunk("cycle/all", async(_, { rejectWithValue }) => {
  
        try {
            const response = await api.getAllCycles()
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

  export const detailsCycle = createAsyncThunk(
    "cycle/details",
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.getCycle(id, formValue);
        navigate(`/teacher`)
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  )


  const cycleSlice = createSlice({

    name: "cycle",

    initialState: {

      cycle: {},

      cycles: [],

      loading: false,

      error: null,
    },
     extraReducers: (builder) => {
    
        builder  
          .addCase(addNewCycle.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(addNewCycle.fulfilled, (state, action) => {    
            state.loading = false;     
            state.cycle = action.payload;         
            state.error = null;
          })        
          .addCase(addNewCycle.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          .addCase(getAllCycle.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(getAllCycle.fulfilled, (state, action) => {    
            state.loading = false;     
            state.cycles = action.payload.cycles;         
            state.error = null;
          })        
          .addCase(getAllCycle.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

            .addCase(detailsCycle.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(detailsCycle.fulfilled, (state, action) => {    
            state.loading = false;     
            state.cycle = action.payload;         
            state.error = null;
          })        
          .addCase(detailsCycle.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })
          
      },

  })

  export default cycleSlice.reducer