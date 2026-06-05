import React, { useState } from "react";
import { motion } from "framer-motion";

/* ================= MOCK DATA ================= */
const reportData = {
  "2023-2024": {
    totalStudents: 420,
    cycles: {
      Maternelle: { students: 80, revenue: 4000 },
      Primaire: { students: 180, revenue: 9000 },
      Humanité: { students: 160, revenue: 12000 },
    },
  },
  "2024-2025": {
    totalStudents: 510,
    cycles: {
      Maternelle: { students: 90, revenue: 4500 },
      Primaire: { students: 210, revenue: 10500 },
      Humanité: { students: 210, revenue: 16500 },
    },
  },
};

/* ================= COMPONENT ================= */
export default function RapportGlobal() {
  const [yearA] = useState("2023-2024");
  const [yearB] = useState("2024-2025");

  const dataA = reportData[yearA];
  const dataB = reportData[yearB];

  const totalGainA =
    dataA.cycles.Maternelle.revenue +
    dataA.cycles.Primaire.revenue +
    dataA.cycles.Humanité.revenue;

  const totalGainB =
    dataB.cycles.Maternelle.revenue +
    dataB.cycles.Primaire.revenue +
    dataB.cycles.Humanité.revenue;

  const growth = ((totalGainB - totalGainA) / totalGainA) * 100;

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
            Rapport global financier
          </h1>
          <p className="text-sm text-gray-500">
            Analyse comparative des années scolaires
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-4 gap-6 p-8">

          <StatCard title={yearA} value={`${totalGainA} $`} />
          <StatCard title={yearB} value={`${totalGainB} $`} />

          <StatCard
            title="Évolution"
            value={`${growth.toFixed(2)} %`}
            highlight
          />

          <StatCard
            title="Différence"
            value={`${totalGainB - totalGainA} $`}
            highlight
          />

        </div>

        {/* ================= TABLE COMPARATIVE ================= */}
        <div className="p-8 overflow-x-auto">

          <table className="w-full min-w-[900px] text-sm">

            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4 text-left">Cycle</th>
                <th>{yearA} - Élèves</th>
                <th>{yearA} - Gain $</th>
                <th>{yearB} - Élèves</th>
                <th>{yearB} - Gain $</th>
                <th>Évolution</th>
              </tr>
            </thead>

            <tbody>

              {Object.keys(dataA.cycles).map((cycle) => {
                const a = dataA.cycles[cycle];
                const b = dataB.cycles[cycle];

                const cycleGrowth =
                  ((b.revenue - a.revenue) / a.revenue) * 100;

                return (
                  <tr
                    key={cycle}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                  >

                    <td className="p-4 font-semibold">{cycle}</td>

                    <td>{a.students}</td>
                    <td>{a.revenue} $</td>

                    <td>{b.students}</td>
                    <td>{b.revenue} $</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          cycleGrowth >= 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {cycleGrowth.toFixed(1)} %
                      </span>
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* ================= INSIGHT PANEL ================= */}
        <div className="p-8 grid md:grid-cols-3 gap-6">

          <InsightCard
            title="Tendance générale"
            value={growth > 0 ? "Croissance 📈" : "Baisse 📉"}
          />

          <InsightCard
            title="Cycle le plus rentable"
            value="Humanité"
          />

          <InsightCard
            title="Performance globale"
            value="Stable / Bonne gestion"
          />

        </div>

      </motion.div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, highlight }) => (
  <div
    className={`p-6 rounded-2xl border shadow-sm ${
      highlight
        ? "bg-blue-900 text-white"
        : "bg-white dark:bg-gray-900"
    }`}
  >
    <p className="text-sm opacity-70">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const InsightCard = ({ title, value }) => (
  <div className="p-6 rounded-2xl border bg-white dark:bg-gray-900">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-lg font-semibold text-blue-900">{value}</p>
  </div>
);