import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";


export const addNewClassroom = createAsyncThunk("classroom/add",  async ({ finalData, navigate, toast }, { rejectWithValue }) => {
    
        try {
          
          console.log("slice data :", finalData)
        
          const response = await api.addNewClassroom(finalData);    
    
          toast.success(
            response.data.message
          );
        
          navigate("/classroom-list");
    
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

export const getAllClassrooms = createAsyncThunk("classroom/all", async(_, { rejectWithValue }) => {
  
        try {
            const response = await api.getAllClassroom()
            console.log("response :", response )

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


  const classroomSlice = createSlice({

    name: "classroom",

    initialState: {

      classroom: {},

      classrooms: [],

      loading: false,

      error: null,
    },
     extraReducers: (builder) => {
    
        builder  
          .addCase(addNewClassroom.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(addNewClassroom.fulfilled, (state, action) => {    
            state.loading = false;     
            state.classroom = action.payload;         
            state.error = null;
          })        
          .addCase(addNewClassroom.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          .addCase(getAllClassrooms.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(getAllClassrooms.fulfilled, (state, action) => {    
            state.loading = false;     
            state.classrooms = action.payload.data;         
            state.error = null;
          })        
          .addCase(getAllClassrooms.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

          
      },

  })

  export default classroomSlice.reducer