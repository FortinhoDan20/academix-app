import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";


export const addNewStudent = createAsyncThunk("student/add",  async ({finalData, formValue, navigate, toast }, { rejectWithValue }) => {
    
        try {
          
          console.log('dans student slice:', finalData)
        
          const response = await api.addStudent(finalData);    
    
          toast.success(
            response.data.message
          );
        
          navigate("/register-nofeepaid");
    
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

export const getAllStudents = createAsyncThunk("student/all", async(_, { rejectWithValue }) => {
  
        try {
            const response = await api.getAllStudets()
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

  export const detailsStudent = createAsyncThunk("student/details", async (id, { rejectWithValue }) => {
      try {
        const response = await api.getStudents(id, formValue);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  )


  const studentSlice = createSlice({

    name: "student",

    initialState: {

      student: {},

      students: [],

      loading: false,

      error: null,
    },
     extraReducers: (builder) => {
    
        builder  
          .addCase(addNewStudent.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(addNewStudent.fulfilled, (state, action) => {    
            state.loading = false;     
            state.student = action.payload?.data?.student;         
            state.error = null;
          })        
          .addCase(addNewStudent.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur d'enregistrement";
          })

          .addCase(getAllStudents.pending, (state) => {    
            state.loading = true;   
            state.error = null;
          })
      
          .addCase(getAllStudents.fulfilled, (state, action) => {    
            state.loading = false;     
            state.students = action.payload.sections;         
            state.error = null;
          })        
          .addCase(getAllStudents.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })

            .addCase(detailsStudent.pending, (state) => {    
            state.loading = true;    
            state.error = null;
          })
      
          .addCase(detailsStudent.fulfilled, (state, action) => {    
            state.loading = false;     
            state.section = action.payload;         
            state.error = null;
          })        
          .addCase(detailsStudent.rejected, (state, action) => {    
            state.loading = false;    
            state.error = action.payload || "Erreur de connexion";
          })
          
      },

  })

  export default studentSlice.reducer