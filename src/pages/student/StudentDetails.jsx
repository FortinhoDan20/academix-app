import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  FileText,
  User,
  Phone,
  GraduationCap,
  School,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileStudent from "./ProfileStudent";
import StudentInfo from "./StudentInfo";
import PaidStudentInfo from "./PaidStudentInfo";
import FolderStudent from "./FolderStudent";

/* ================= MOCK DATA ================= */
const student = {
  name: "Jean Bosco",
  sex: "M",
  birthDate: "2008-05-12",
  phone: "+243 810 000 000",
  cycle: "Humanité",
  section: "Scientifique",
  option: "Math-Info",
  class: "1ère A",
  year: "2024-2025",
};

/* ================= INSCRIPTIONS ================= */
const inscriptions = [
  {
    year: "2024-2025",
    cycle: "Humanité",
    section: "Scientifique",
    option: "Math-Info",
    class: "1ère A",
    status: "Active",
  },
  {
    year: "2023-2024",
    cycle: "Humanité",
    section: "Scientifique",
    option: "Math-Info",
    class: "2ème A",
    status: "Terminée",
  },
];

/* ================= PAYMENTS ================= */
const payments = [
  {
    date: "2025-01-10",
    type: "Frais scolaire",
    amount: 150,
    status: "Payé",
  },
  {
    date: "2025-02-10",
    type: "Tranche",
    amount: 100,
    status: "Payé",
  },
  {
    date: "2025-03-10",
    type: "Tranche",
    amount: 50,
    status: "En attente",
  },
];

/* ================= DOCUMENTS ================= */
const documents = [
  { name: "Bulletin 2024", type: "PDF" },
  { name: "Certificat de naissance", type: "PDF" },
  { name: "Fiche d’inscription", type: "PDF" },
];

export default function StudentDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* ================= HEADER ================= */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5">
            {/* Titre */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Fiche élève
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Consultez les informations personnelles, les inscriptions et
                l'historique des paiements de l'élève.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="
          inline-flex items-center gap-2
          rounded-lg
          border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800
          px-4 py-2.5
          text-sm font-medium
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-700
          transition-all duration-200
        "
              >
                <ArrowLeft size={18} />
                Retour
              </button>
            </div>
          </div>
        </div>

        {/* ================= PROFILE ================= */}
        < ProfileStudent student={student}/>

        {/* ================= INSCRIPTIONS ================= */}
        <StudentInfo inscriptions={inscriptions}/>

        {/* ================= PAYMENTS ================= */}
       <PaidStudentInfo payments={payments}/>

        {/* ================= DOSSIER ================= */}

            <FolderStudent documents={documents} />
       
      </motion.div>
    </div>
  );
}
