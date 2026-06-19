import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";


export const addNewOption = createAsyncThunk("option/add",  async ({ finalData, navigate, toast }, { rejectWithValue }) => {
    
        try {
          
          console.log("option data slice :", finalData)
        
          const response = await api.addNewOption(finalData);    
    
          toast.success(
            response.data.message
          );
        
          navigate("/option-list");
    
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

export const getAllOptions = createAsyncThunk("option/all", async(_, { rejectWithValue }) => {
  
        try {
            const response = await api.getAllOptions()

            console.log("data options: ", response)
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

export const getAllOptionsBySection = createAsyncThunk("option/all", async(id, { rejectWithValue }) => {
  
        try {
            const response = await api.getOptionById(id)
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




  const optionSlice = createSlice({

    name: "option",

    initialState: {

      option: {},

      options: [],

      loading: false,

      error: null,
    },
     extraReducers: (builder) => {
    
        builder  
          .addCase(addNewOption.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(addNewOption.fulfilled, (state, action) => {    
            state.loading = false;     
            state.option = action.payload;         
            state.error = null;
          })        
          .addCase(addNewOption.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          .addCase(getAllOptions.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(getAllOptions.fulfilled, (state, action) => {    
            state.loading = false;     
            state.options = action.payload.data;         
            state.error = null;
          })        
          .addCase(getAllOptions.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          
      },

  })

  export default optionSlice.reducer