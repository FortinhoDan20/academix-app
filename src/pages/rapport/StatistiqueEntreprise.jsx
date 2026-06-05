import React from "react";
import { motion } from "framer-motion";

import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ================= MOCK DATA ================= */

const globalStats = {
  schools: 42,
  students: 18540,
  revenue: 37080,
  growth: 26.4,
};

/* ================= CHARTS ================= */

const revenueEvolution = [
  { year: "2022", revenue: 8000 },
  { year: "2023", revenue: 14500 },
  { year: "2024", revenue: 22000 },
  { year: "2025", revenue: 31000 },
  { year: "2026", revenue: 37080 },
];

const schoolsEvolution = [
  { year: "2022", schools: 8 },
  { year: "2023", schools: 15 },
  { year: "2024", schools: 24 },
  { year: "2025", schools: 35 },
  { year: "2026", schools: 42 },
];

const topSchools = [
  {
    name: "CS Saint Agathe",
    students: 2200,
    revenue: 4400,
  },
  {
    name: "Institut Horizon",
    students: 1800,
    revenue: 3600,
  },
  {
    name: "CS Excellence",
    students: 1400,
    revenue: 2800,
  },
  {
    name: "Institut Lumière",
    students: 1000,
    revenue: 2000,
  },
];

const pieData = [
  { name: "Kinshasa", value: 18 },
  { name: "Lubumbashi", value: 10 },
  { name: "Goma", value: 7 },
  { name: "Kisangani", value: 4 },
  { name: "Matadi", value: 3 },
];

const COLORS = [
  "#1e3a8a",
  "#2563eb",
  "#0f766e",
  "#ea580c",
  "#7c3aed",
];

/* ================= COMPONENT ================= */

export default function StatistiqueEntreprise() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        className="max-w-[1700px] mx-auto"
      >

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Rapport statistique entreprise
          </h1>

          <p className="text-gray-500 mt-2">
            Analyse globale de la plateforme SaaS scolaire
          </p>

        </div>

        {/* ================= KPI ================= */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <StatCard
            title="Écoles partenaires"
            value={globalStats.schools}
            icon={<Building2 size={26} />}
            color="blue"
          />

          <StatCard
            title="Élèves enregistrés"
            value={globalStats.students}
            icon={<Users size={26} />}
            color="indigo"
          />

          <StatCard
            title="Revenus entreprise"
            value={`${globalStats.revenue} $`}
            icon={<DollarSign size={26} />}
            color="green"
          />

          <StatCard
            title="Croissance annuelle"
            value={`${globalStats.growth}%`}
            icon={<TrendingUp size={26} />}
            color="orange"
          />

        </div>

        {/* ================= CHARTS ================= */}

        <div className="grid xl:grid-cols-2 gap-8 mb-8">

          {/* ================= REVENUE CHART ================= */}

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Évolution des revenus
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Revenus générés par la plateforme SaaS
              </p>

            </div>

            <div className="h-[420px] p-6">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={revenueEvolution}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0f172a"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* ================= SCHOOLS CHART ================= */}

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Croissance des écoles
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Nombre d’écoles clientes par année
              </p>

            </div>

            <div className="h-[420px] p-6">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={schoolsEvolution}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="schools"
                    fill="#0f172a"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* ================= SECOND ROW ================= */}

        <div className="grid xl:grid-cols-3 gap-8">

          {/* ================= TOP SCHOOLS ================= */}

          <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Écoles les plus rentables
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] text-sm">

                <thead className="bg-blue-900 text-white">

                  <tr>
                    <th className="p-4 text-left">
                      École
                    </th>

                    <th className="p-4 text-center">
                      Élèves
                    </th>

                    <th className="p-4 text-center">
                      Tarif / élève
                    </th>

                    <th className="p-4 text-center">
                      Revenus
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {topSchools.map((school, index) => (

                    <tr
                      key={index}
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

                      <td className="p-4 font-semibold text-gray-800 dark:text-white">
                        {school.name}
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

          {/* ================= PIE ================= */}

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Répartition géographique
              </h2>

            </div>

            <div className="h-[420px] p-6 flex items-center justify-center">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >

                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

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
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3 text-gray-800 dark:text-white">
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