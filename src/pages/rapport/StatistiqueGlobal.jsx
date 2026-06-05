import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  TrendingUp,
  GraduationCap,
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
} from "recharts";

/* ================= MOCK DATA ================= */

const stats = {
  students: 2480,
  revenue: 48500,
  growth: 18.6,
  graduates: 620,
};

const inscriptionsData = [
  { year: "2021", students: 1200 },
  { year: "2022", students: 1500 },
  { year: "2023", students: 1800 },
  { year: "2024", students: 2100 },
  { year: "2025", students: 2480 },
];

const revenuesData = [
  { year: "2021", revenue: 22000 },
  { year: "2022", revenue: 28000 },
  { year: "2023", revenue: 35000 },
  { year: "2024", revenue: 42000 },
  { year: "2025", revenue: 48500 },
];

/* ================= COMPONENT ================= */

export default function StatistiqueGlobal() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        className="max-w-[1600px] mx-auto"
      >

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Statistiques globales de l’école
          </h1>

          <p className="text-gray-500 mt-2">
            Analyse des inscriptions et revenus scolaires
          </p>

        </div>

        {/* ================= KPI ================= */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <StatCard
            title="Élèves inscrits"
            value={stats.students}
            icon={<Users size={26} />}
            color="blue"
          />

          <StatCard
            title="Revenus générés"
            value={`${stats.revenue} $`}
            icon={<DollarSign size={26} />}
            color="green"
          />

          <StatCard
            title="Taux de croissance"
            value={`${stats.growth}%`}
            icon={<TrendingUp size={26} />}
            color="orange"
          />

          <StatCard
            title="Finalistes"
            value={stats.graduates}
            icon={<GraduationCap size={26} />}
            color="indigo"
          />

        </div>

        {/* ================= CHARTS ================= */}

        <div className="grid xl:grid-cols-2 gap-8">

          {/* ================= INSCRIPTIONS ================= */}

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Évolution des inscriptions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Nombre d’élèves inscrits par année scolaire
              </p>

            </div>

            <div className="h-[420px] p-6">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={inscriptionsData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#0f172a"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* ================= REVENUS ================= */}

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Évolution des revenus
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Revenus scolaires générés par année
              </p>

            </div>

            <div className="h-[420px] p-6">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={revenuesData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="revenue"
                    fill="#0f172a"
                    radius={[8, 8, 0, 0]}
                  />

                </BarChart>

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
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    indigo: "bg-indigo-100 text-indigo-700",
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