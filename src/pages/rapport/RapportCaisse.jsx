import React from "react";
import { motion } from "framer-motion";
import { DollarSign, AlertTriangle } from "lucide-react";

/* ================= MOCK DATA ================= */
const caisseData = {
  totalRevenue: 18500,
  totalDebt: 3200,

  cycles: {
    Maternelle: {
      revenue: 4000,
      debt: 500,
      students: 80,
    },
    Primaire: {
      revenue: 9000,
      debt: 1200,
      students: 180,
    },
    Humanité: {
      revenue: 5500,
      debt: 1500,
      students: 160,
    },
  },

  transactions: [
    {
      id: 1,
      student: "Jean Bosco",
      type: "Inscription",
      amount: 150,
      status: "Paid",
      date: "2025-01-10",
      cycle: "Humanité",
    },
    {
      id: 2,
      student: "Marie Claire",
      type: "Tranche",
      amount: 100,
      status: "Paid",
      date: "2025-02-12",
      cycle: "Primaire",
    },
    {
      id: 3,
      student: "Patrick M.",
      type: "Mensualité",
      amount: 80,
      status: "Pending",
      date: "2025-03-05",
      cycle: "Humanité",
    },
  ],
};

/* ================= COMPONENT ================= */
export default function RapportCaisse() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        className="max-w-[1400px] mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* ================= HEADER ================= */}
        <div className="p-8 border-b">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Rapport de caisse scolaire
          </h1>
          <p className="text-sm text-gray-500">
            Analyse des revenus et dettes des élèves
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-2 gap-6 p-8">
          <StatCard
            title="Total revenus encaissés"
            value={`${caisseData.totalRevenue} $`}
            icon={<DollarSign />}
            color="green"
          />

          <StatCard
            title="Total dettes élèves"
            value={`${caisseData.totalDebt} $`}
            icon={<AlertTriangle />}
            color="red"
          />
        </div>

        {/* ================= TABLE PAR CYCLE ================= */}
        <div className="p-8 overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            {/* HEADER */}
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4 text-left font-semibold">Cycle</th>
                <th className="p-4 text-center">Élèves</th>
                <th className="p-4 text-center">Revenus ($)</th>
                <th className="p-4 text-center">Dettes ($)</th>
                <th className="p-4 text-center">Total attendu ($)</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="bg-white dark:bg-gray-900">
              {Object.keys(caisseData.cycles).map((cycle, index) => {
                const data = caisseData.cycles[cycle];
                const total = data.revenue + data.debt;

                return (
                  <tr
                    key={cycle}
                    className={`
              border-b dark:border-gray-800
              hover:bg-blue-50 dark:hover:bg-gray-800
              transition
              ${index % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-900" : ""}
            `}
                  >
                    {/* Cycle */}
                    <td className="p-4 font-semibold text-gray-800 dark:text-white">
                      {cycle}
                    </td>

                    {/* Students */}
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      {data.students}
                    </td>

                    {/* Revenue */}
                    <td className="p-4 text-center text-green-600 font-semibold">
                      {data.revenue} $
                    </td>

                    {/* Debt */}
                    <td className="p-4 text-center text-red-600 font-semibold">
                      {data.debt} $
                    </td>

                    {/* Total */}
                    <td className="p-4 text-center font-bold text-gray-800 dark:text-white">
                      {total} $
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================= TRANSACTIONS ================= */}
       {/* ================= TRANSACTIONS ================= */}
<div className="p-8">

  {/* HEADER */}
  <div className="flex justify-between items-center mb-5">

    <div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Transactions récentes
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Historique des derniers paiements effectués
      </p>
    </div>

    <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
      <p className="text-sm text-blue-900 dark:text-blue-300 font-medium">
        {caisseData.transactions.length} transactions
      </p>
    </div>

  </div>

  {/* TABLE */}
  <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">

    <table className="w-full min-w-[1000px] text-sm">

      {/* HEADER */}
      <thead className="bg-blue-900 text-white">

        <tr>

          <th className="p-4 text-left font-semibold">
            Élève
          </th>

          <th className="p-4 text-center font-semibold">
            Cycle
          </th>

          <th className="p-4 text-center font-semibold">
            Type paiement
          </th>

          <th className="p-4 text-center font-semibold">
            Montant
          </th>

          <th className="p-4 text-center font-semibold">
            Statut
          </th>

          <th className="p-4 text-center font-semibold">
            Date
          </th>

        </tr>

      </thead>

      {/* BODY */}
      <tbody className="bg-white dark:bg-gray-900">

        {caisseData.transactions.map((t, index) => (

          <tr
            key={t.id}
            className={`
              border-b dark:border-gray-800
              hover:bg-blue-50 dark:hover:bg-gray-800
              transition
              ${
                index % 2 === 0
                  ? "bg-gray-50/40 dark:bg-gray-900"
                  : ""
              }
            `}
          >

            {/* STUDENT */}
            <td className="p-4">

              <div className="flex items-center gap-3">

                <div className="
                  w-10 h-10 rounded-full
                  bg-blue-100 text-blue-900
                  flex items-center justify-center
                  font-bold text-sm
                ">
                  {t.student.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {t.student}
                  </p>

                  <p className="text-xs text-gray-500">
                    Référence #{t.id}
                  </p>
                </div>

              </div>

            </td>

            {/* CYCLE */}
            <td className="p-4 text-center text-gray-700 dark:text-gray-300">
              {t.cycle}
            </td>

            {/* TYPE */}
            <td className="p-4 text-center">

              <span className="
                px-3 py-1 rounded-full
                bg-gray-100 dark:bg-gray-800
                text-gray-700 dark:text-gray-300
                text-xs font-medium
              ">
                {t.type}
              </span>

            </td>

            {/* AMOUNT */}
            <td className="p-4 text-center font-bold text-green-600">
              {t.amount} $
            </td>

            {/* STATUS */}
            <td className="p-4 text-center">

              <span
                className={`
                  px-3 py-1 rounded-full
                  text-xs font-semibold
                  ${
                    t.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {t.status === "Paid" ? "Payé" : "En attente"}
              </span>

            </td>

            {/* DATE */}
            <td className="p-4 text-center text-gray-600 dark:text-gray-400">
              {t.date}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>
</div>
      </motion.div>
    </div>
  );
}

/* ================= CARD ================= */
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    green: "text-green-600",
    red: "text-red-600",
  };

  return (
    <div className="p-6 rounded-2xl border bg-white dark:bg-gray-900 shadow-sm">
      <div className={`flex items-center gap-2 ${colors[color]}`}>
        {icon}
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};
