import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";


export const addNewSection = createAsyncThunk("section/add",  async ({finalData, formValue, navigate, toast }, { rejectWithValue }) => {
    
        try {
          
        
          const response = await api.addSection(finalData);    
    
          toast.success(
            response.data.message
          );
        
          navigate("/section-list");
    
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

export const getAllSection = createAsyncThunk("section/all", async(_, { rejectWithValue }) => {
  
        try {
            const response = await api.getAllSections()
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

  export const detailsSection = createAsyncThunk(
    "cycle/details",
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.getSectionById(id, formValue);
        navigate(`/teacher`)
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  )


  const sectionSlice = createSlice({

    name: "section",

    initialState: {

      section: {},

      sections: [],

      loading: false,

      error: null,
    },
     extraReducers: (builder) => {
    
        builder  
          .addCase(addNewSection.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(addNewSection.fulfilled, (state, action) => {    
            state.loading = false;     
            state.section = action.payload;         
            state.error = null;
          })        
          .addCase(addNewSection.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          .addCase(getAllSection.pending, (state) => {    
            state.loading = true;   
            state.error = null;
          })
      
          .addCase(getAllSection.fulfilled, (state, action) => {    
            state.loading = false;     
            state.sections = action.payload.sections;         
            state.error = null;
          })        
          .addCase(getAllSection.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

            .addCase(detailsSection.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(detailsSection.fulfilled, (state, action) => {    
            state.loading = false;     
            state.section = action.payload;         
            state.error = null;
          })        
          .addCase(detailsSection.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })
          
      },

  })

  export default sectionSlice.reducer