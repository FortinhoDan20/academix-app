import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  DollarSign,
  TrendingUp,
} from "lucide-react";

/* ================= MOCK DATA ================= */
const companyData = {
  currentYear: {
    schools: 24,
    students: 8420,
    revenue: 16840,
  },

  previousYear: {
    schools: 17,
    students: 5900,
    revenue: 11800,
  },

  schools: [
    {
      id: 1,
      name: "Collège Saint Agathe",
      students: 1200,
      revenue: 2400,
      city: "Kinshasa",
    },
    {
      id: 2,
      name: "Institut Lumière",
      students: 800,
      revenue: 1600,
      city: "Lubumbashi",
    },
    {
      id: 3,
      name: "Complexe Scolaire Horizon",
      students: 1500,
      revenue: 3000,
      city: "Goma",
    },
  ],
};

/* ================= GROWTH ================= */
const growth =
  (
    (companyData.currentYear.revenue -
      companyData.previousYear.revenue) /
    companyData.previousYear.revenue
  ) * 100;

/* ================= COMPONENT ================= */
export default function RapportEntreprise() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        className="max-w-[1500px] mx-auto"
      >

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Rapport entreprise SaaS
          </h1>

          <p className="text-gray-500 mt-2">
            Revenus générés par les écoles partenaires
          </p>
        </div>

        {/* ================= KPI ================= */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <StatCard
            title="Écoles partenaires"
            value={companyData.currentYear.schools}
            icon={<Building2 />}
            color="blue"
          />

          <StatCard
            title="Élèves enregistrés"
            value={companyData.currentYear.students}
            icon={<GraduationCap />}
            color="indigo"
          />

          <StatCard
            title="Revenus générés"
            value={`${companyData.currentYear.revenue} $`}
            icon={<DollarSign />}
            color="green"
          />

          <StatCard
            title="Croissance annuelle"
            value={`${growth.toFixed(1)} %`}
            icon={<TrendingUp />}
            color="orange"
          />

        </div>

        {/* ================= COMPARAISON ================= */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden mb-8">

          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Comparaison annuelle
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] text-sm">

              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-4 text-left">Année</th>
                  <th className="p-4 text-center">Écoles</th>
                  <th className="p-4 text-center">Élèves</th>
                  <th className="p-4 text-center">Revenus</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b hover:bg-blue-50 dark:hover:bg-gray-800">
                  <td className="p-4 font-semibold">
                    2024 - 2025
                  </td>

                  <td className="text-center">
                    {companyData.previousYear.schools}
                  </td>

                  <td className="text-center">
                    {companyData.previousYear.students}
                  </td>

                  <td className="text-center font-bold text-green-600">
                    {companyData.previousYear.revenue} $
                  </td>
                </tr>

                <tr className="hover:bg-blue-50 dark:hover:bg-gray-800">
                  <td className="p-4 font-semibold">
                    2025 - 2026
                  </td>

                  <td className="text-center">
                    {companyData.currentYear.schools}
                  </td>

                  <td className="text-center">
                    {companyData.currentYear.students}
                  </td>

                  <td className="text-center font-bold text-green-600">
                    {companyData.currentYear.revenue} $
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* ================= TOP SCHOOLS ================= */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Écoles les plus rentables
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px] text-sm">

              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-4 text-left">École</th>
                  <th className="p-4 text-center">Ville</th>
                  <th className="p-4 text-center">Élèves</th>
                  <th className="p-4 text-center">
                    Prix / élève
                  </th>
                  <th className="p-4 text-center">
                    Revenus générés
                  </th>
                </tr>
              </thead>

              <tbody>

                {companyData.schools.map((school, index) => (

                  <tr
                    key={school.id}
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

                    <td className="p-4 font-semibold">
                      {school.name}
                    </td>

                    <td className="text-center">
                      {school.city}
                    </td>

                    <td className="text-center">
                      {school.students}
                    </td>

                    <td className="text-center">
                      2 $
                    </td>

                    <td className="text-center font-bold text-green-600">
                      {school.revenue} $
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
    blue: "bg-blue-100 text-blue-700",
    indigo: "bg-indigo-100 text-indigo-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800 dark:text-white">
            {value}
          </h2>
        </div>

        <div className={`p-4 rounded-2xl ${colors[color]}`}>
          {icon}
        </div>

      </div>

    </div>
  );
};