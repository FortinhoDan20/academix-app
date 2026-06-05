import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        <div className="p-6 border-b flex justify-between items-center bg-white dark:bg-gray-900">

          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Fiche élève
            </h1>
            <p className="text-sm text-gray-500">
              Détails complets du dossier scolaire
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition"
          >
            <ArrowLeft size={18} />
            Retour
          </button>

        </div>

        {/* ================= PROFILE ================= */}
        <div className="p-6 grid md:grid-cols-4 gap-4">

          <div className="bg-blue-900 text-white rounded-2xl p-5 shadow-md">
            <p className="text-sm opacity-80">Nom complet</p>
            <h2 className="text-xl font-bold">{student.name}</h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border rounded-2xl p-5">
            <p className="text-sm text-gray-500">Téléphone</p>
            <p className="font-semibold">{student.phone}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border rounded-2xl p-5">
            <p className="text-sm text-gray-500">Cycle actuel</p>
            <p className="font-semibold">{student.cycle}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border rounded-2xl p-5">
            <p className="text-sm text-gray-500">Classe</p>
            <p className="font-semibold">{student.class}</p>
          </div>

        </div>

        {/* ================= INSCRIPTIONS ================= */}
        <div className="p-6">

          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            📚 Historique des inscriptions
          </h2>

          <div className="overflow-x-auto rounded-xl border">

            <table className="w-full text-sm">

              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-3 text-left">Année</th>
                  <th>Cycle</th>
                  <th>Section</th>
                  <th>Option</th>
                  <th>Classe</th>
                  <th>Statut</th>
                </tr>
              </thead>

              <tbody>
                {inscriptions.map((i, idx) => (
                  <tr
                    key={idx}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="p-3">{i.year}</td>
                    <td>{i.cycle}</td>
                    <td>{i.section}</td>
                    <td>{i.option}</td>
                    <td>{i.class}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          i.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {i.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

        {/* ================= PAYMENTS ================= */}
        <div className="p-6">

          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            💰 Historique des paiements
          </h2>

          <div className="overflow-x-auto rounded-xl border">

            <table className="w-full text-sm">

              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th>Type</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((p, idx) => (
                  <tr
                    key={idx}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="p-3">{p.date}</td>
                    <td>{p.type}</td>
                    <td className="font-semibold">{p.amount} $</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          p.status === "Payé"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

        {/* ================= DOSSIER ================= */}
        <div className="p-6">

          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            📁 Dossier scolaire
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {documents.map((d, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl border bg-gray-50 dark:bg-gray-800 hover:shadow-md transition"
              >
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-blue-900" />
                  <div>
                    <p className="font-medium">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.type}</p>
                  </div>
                </div>

                <Download
                  size={18}
                  className="text-blue-900 cursor-pointer hover:scale-110 transition"
                />
              </div>
            ))}

          </div>

        </div>

      </motion.div>
    </div>
  );
}