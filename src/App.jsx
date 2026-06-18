import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./css/style.css";
import "./charts/ChartjsConfig";

/* ================= LAYOUT ================= */
import MainLayout from "./layout.js/MainLayout";

/* ================= AUTH ================= */
import Login from "./pages/auth/Login";

/* ================= PAGES ================= */
import Dashboard from "./pages/Dashoard1";

/* USERS */
import Utilisateur from "./pages/utilisateur/Utilisateur";
import AddUser from "./pages/utilisateur/AddUser";
import DetailsInfos from "./pages/utilisateur/DetailsInfos";
import EditUser from "./pages/utilisateur/EditUser";

/* SCHOOL */
import School from "./pages/school/School";
import AddSchool from "./pages/school/AddSchool";
import EditSchool from "./pages/school/EditSchool";
import DetailsSchool from "./pages/school/DetailsSchool";

/* CYCLE */
import Cycle from "./pages/cycle/Cycle";
import AddCycle from "./pages/cycle/AddCycle";

/* SECTION */
import Section from "./pages/section/Section";
import AddSection from "./pages/section/AddSection";

/* OPTION */
import Option from "./pages/option/Option";
import AddOption from "./pages/option/AddOption";

/* CLASSROOM */
import Classrroom from "./pages/classroom/Classrroom";
import AddClassroom from "./pages/classroom/AddClassroom";

/* FEES */
import Fees from "./pages/fees/Fees";
import AddFees from "./pages/fees/AddFees";

/* PAYMENT */
import NewPaid from "./pages/payment/NewPaid";
import ListPaid from "./pages/payment/ListPaid";
import Caisse from "./pages/payment/Caisse";

/* STUDENT */
import NewStudent from "./pages/student/NewStudent";
import ListInscrit from "./pages/student/ListInscrit";
import StudentDetails from "./pages/student/StudentDetails";
import StudentDossier from "./pages/student/StudentDossier";

/* RAPPORT */
import RapportGlobal from "./pages/rapport/RapportGlobal";
import RapportCaisse from "./pages/rapport/RapportCaisse";
import RapportEntreprise from "./pages/rapport/rapportEntrepise";

/* STATISTIQUES */
import StatistiqueGlobal from "./pages/rapport/StatistiqueGlobal";
import StatistiqueEntreprise from "./pages/rapport/StatistiqueEntreprise";

import ProtectedRoute from "./pages/protected/ProtectedRoute";
import { setUser } from "./features/auth/authSlice";
import Profile from "./pages/student/profile";
import Students from "./pages/student/Students";
import ListNoFeePaid from "./pages/payment/ListNoFeePaid";
import Receipt from "./pages/payment/Receipt";
import VerifyReceipt from "./pages/payment/VerifyReceipt";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  /* ================= SCROLL TOP ================= */
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0 });
    document.documentElement.style.scrollBehavior = "";
  }, [location.pathname]);

  /* ================= RESTORE USER ================= */
useEffect(() => {

  const storedProfile = localStorage.getItem("profile");

  if (!storedProfile || storedProfile === "undefined") return;

  try {

    const parsed = JSON.parse(storedProfile);

    if (parsed?.token) {
      dispatch(setUser(parsed));
    } else {
      localStorage.removeItem("profile");
    }

  } catch (error) {


    localStorage.removeItem("profile");
  }

}, [dispatch]);

  return (
    <>
      <ToastContainer />

      <Routes>

        {/* ================= LOGIN ================= */}
        <Route path="/login" element={<Login />} />

        {/* ================= PROTECTED ROUTES ================= */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          {/* DASHBOARD */}
          <Route index element={<Dashboard />} />

          {/* USERS */}
          <Route path="users" element={<Utilisateur />} />
          <Route path="add-new-user" element={<AddUser />} />
          <Route path="/users/view/:id" element={<DetailsInfos />} />
          <Route path="edit-user" element={<EditUser />} />

          {/* SCHOOL */}
          <Route path="list-school" element={<School />} />
          <Route path="add-new-school" element={<AddSchool />} />
          <Route path="edit-school" element={<EditSchool />} />
          <Route path="details-school" element={<DetailsSchool />} />

          {/* CYCLE */}
          <Route path="cycle-list" element={<Cycle />} />
          <Route path="add-cycle" element={<AddCycle />} />

          {/* SECTION */}
          <Route path="section-list" element={<Section />} />
          <Route path="add-section" element={<AddSection />} />

          {/* OPTION */}
          <Route path="option-list" element={<Option />} />
          <Route path="add-option" element={<AddOption />} />

          {/* CLASSROOM */}
          <Route path="classroom-list" element={<Classrroom />} />
          <Route path="add-classroom" element={<AddClassroom />} />

          {/* FEES */}
          <Route path="/fees-list" element={<Fees />} />
          <Route path="/add-fees" element={<AddFees />} />

          {/* PAYMENT */}
          <Route path="add-new-paid" element={<NewPaid />} />
          <Route path="list-paid" element={<ListPaid />} />
          <Route path="caisse" element={<Caisse />} />
          <Route path="register-nofeepaid" element={<ListNoFeePaid />} />
           <Route path="/receipt-inscription/:id" element={<Receipt />} />
           <Route path="/verify-receipt/:id" element={<VerifyReceipt />} />

          {/* STUDENT */}
          <Route path="add-new-student" element={<NewStudent />} />
          <Route path="list-inscrit" element={<ListInscrit />} />
          <Route path="details-student" element={<StudentDetails />} />
          <Route path="profile-student" element={<Profile />} />
          <Route path="/student-dossier/:id" element={<StudentDossier />} />
          <Route path="/students" element={<Students />} />

          {/* RAPPORT */}
          <Route path="rapport-global" element={<RapportGlobal />} />
          <Route path="rapport-caisse" element={<RapportCaisse />} />
          <Route path="rapport-entreprise" element={<RapportEntreprise />} />

          {/* STATISTIQUES */}
          <Route path="statistique-global" element={<StatistiqueGlobal />} />
          <Route path="statistique-academix" element={<StatistiqueEntreprise />} />

       

         

        </Route>

        {/* ================= REDIRECT ================= */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </>
  );
}

export default App;