import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cycleReducer from "../features/cycle/cycleSlice"
import sectionReducer from "../features/section/sectionSlice"
import optionReducer from "../features/option/optionSlice"
import classroomReducer from "../features/classroom/classroomSlice"
import feesReducer from "../features/fees/feesSlice"
import yearReducer from "../features/year/yearSlice"
import userReducer from "../features/user/userSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    cycle: cycleReducer,
    section: sectionReducer,
    option: optionReducer,
    classroom: classroomReducer,
    fees: feesReducer,
    year: yearReducer,
    user: userReducer
  },
});

export default store;