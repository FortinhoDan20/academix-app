import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  School,
  Users,
  Wallet,
  TrendingUp,
} from "lucide-react";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Dashoard1 = () => {

  /* ================================================= */
  /* LOADING */
  /* ================================================= */

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);

  }, []);

  /* ================================================= */
  /* DATA */
  /* ================================================= */

  const stats = {
    schoolsTotal: 12,
    schoolsThisYear: 3,

    studentsTotal: 2450,
    studentsThisYear: 680,

    paymentsTotal: 185000,
    paymentsThisYear: 62000,
    paymentsMonth: 8500,

    revenueTotal: 185000,
    revenueThisYear: 62000,
  };

  const yearlyComparison = [
    { year: 2022, students: 900, revenue: 30000 },
    { year: 2023, students: 1400, revenue: 52000 },
    { year: 2024, students: 1800, revenue: 78000 },
    { year: 2025, students: 2450, revenue: 185000 },
  ];

  const monthlyPayments = [
    { month: "Jan", amount: 5000 },
    { month: "Feb", amount: 6200 },
    { month: "Mar", amount: 4800 },
    { month: "Apr", amount: 7100 },
    { month: "May", amount: 8500 },
  ];

  /* ================================================= */
  /* TABLE STATE */
  /* ================================================= */

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("year");
  const [sortOrder, setSortOrder] = useState("desc");

  /* ================================================= */
  /* USER ROLE */
  /* ================================================= */

  const { user } = useSelector((state) => state.auth);

  const role = user?.user?.role;

  /* ================================================= */
  /* KPI ROLE BASED */
  /* ================================================= */

  const cards =
    role === "super_admin"
      ? [
          {
            title: "Écoles total",
            value: stats.schoolsTotal,
            icon: School,
            color: "text-blue-600",
            sub: `+${stats.schoolsThisYear} cette année`,
          },

          {
            title: "Élèves total",
            value: stats.studentsTotal,
            icon: Users,
            color: "text-green-600",
          },

          {
            title: "Revenus global ERP",
            value: `$${stats.revenueTotal}`,
            icon: TrendingUp,
            color: "text-purple-600",
          },

          {
            title: "Écoles cette année",
            value: stats.schoolsThisYear,
            icon: School,
            color: "text-indigo-600",
          },

          {
            title: "Élèves cette année",
            value: stats.studentsThisYear,
            icon: Users,
            color: "text-emerald-600",
          },

          {
            title: "Revenus ERP cette année",
            value: `$${stats.revenueThisYear}`,
            icon: TrendingUp,
            color: "text-pink-600",
          },
        ]
      : [
          {
            title: "Élèves total",
            value: stats.studentsTotal,
            icon: Users,
            color: "text-green-600",
          },

          {
            title: "Paiements globaux",
            value: `$${stats.paymentsTotal}`,
            icon: Wallet,
            color: "text-yellow-600",
          },

          {
            title: "Revenus globaux ERP",
            value: `$${stats.revenueTotal}`,
            icon: TrendingUp,
            color: "text-purple-600",
          },

          {
            title: "Élèves cette année",
            value: stats.studentsThisYear,
            icon: Users,
            color: "text-emerald-600",
          },

          {
            title: "Paiements cette année",
            value: `$${stats.paymentsThisYear}`,
            icon: Wallet,
            color: "text-orange-600",
          },

          {
            title: "Revenus ERP cette année",
            value: `$${stats.revenueThisYear}`,
            icon: TrendingUp,
            color: "text-pink-600",
          },
        ];

  /* ================================================= */
  /* ALERT SYSTEM */
  /* ================================================= */

  const alert = useMemo(() => {

    const last = yearlyComparison[yearlyComparison.length - 1];

    const prev = yearlyComparison[yearlyComparison.length - 2];

    const diff =
      ((last.revenue - prev.revenue) / prev.revenue) * 100;

    if (diff < -10) {
      return {
        type: "danger",
        msg: `⚠ Forte baisse revenus (${diff.toFixed(1)}%)`,
      };
    }

    if (diff < 0) {
      return {
        type: "warning",
        msg: `📉 Légère baisse revenus (${diff.toFixed(1)}%)`,
      };
    }

    return {
      type: "success",
      msg: `📈 Croissance positive +${diff.toFixed(1)}%`,
    };

  }, []);

  /* ================================================= */
  /* TABLE FILTER + SORT */
  /* ================================================= */

  const filteredData = useMemo(() => {

    let data = [...yearlyComparison];

    if (search) {
      data = data.filter((d) =>
        d.year.toString().includes(search)
      );
    }

    data.sort((a, b) => {

      const valA = a[sortKey];
      const valB = b[sortKey];

      return sortOrder === "asc"
        ? valA - valB
        : valB - valA;

    });

    return data;

  }, [search, sortKey, sortOrder]);

  /* ================================================= */
  /* KPI CARD */
  /* ================================================= */

  const KpiCard = ({
    title,
    value,
    icon: Icon,
    color,
    sub,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        p-5
        bg-white
        dark:bg-gray-900
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
        border
        border-gray-100
        dark:border-gray-800
      "
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className={`text-2xl font-bold mt-1 ${color}`}>
            {value}
          </h2>

          {sub && (
            <p className="text-xs text-gray-400 mt-1">
              {sub}
            </p>
          )}
        </div>

        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
          <Icon
            className="text-gray-600 dark:text-gray-300"
            size={22}
          />
        </div>

      </div>

      <div
        className="
          absolute
          -right-10
          -bottom-10
          w-32
          h-32
          bg-gradient-to-r
          from-blue-400
          to-purple-500
          opacity-10
          rounded-full
          blur-2xl
        "
      />
    </motion.div>
  );

  /* ================================================= */
  /* LOADING SCREEN */
  /* ================================================= */

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-gray-50
          dark:bg-gray-950
        "
      >

        <div className="text-center">

          {/* ANIMATION */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="
              w-16
              h-16
              border-4
              border-sky-200
              border-t-sky-900
              rounded-full
              mx-auto
            "
          />

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="
              mt-6
              text-xl
              font-semibold
              text-gray-700
              dark:text-white
            "
          >
            Chargement du tableau de bord...
          </motion.h2>

          <p className="text-gray-500 text-sm mt-2">
            Veuillez patienter
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-950 min-h-screen">

      {/* ================= TITLE ================= */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Tableau de bord ERP
        </h1>

        <p className="text-gray-500 mt-1">
          Analyse globale des performances scolaires et financières
        </p>
      </div>

      {/* ================= ALERT ================= */}

      {alert && (
        <div
          className={`
            p-4
            rounded-xl
            text-sm
            font-medium
            ${
              alert.type === "danger"
                ? "bg-red-100 text-red-700"
                : alert.type === "warning"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }
          `}
        >
          {alert.msg}
        </div>
      )}

      {/* ================= KPI ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {cards.map((card, i) => (
          <KpiCard key={i} {...card} />
        ))}

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART */}

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">

          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Croissance annuelle
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="students"
                fill="#3b82f6"
                radius={[10, 10, 0, 0]}
              />
              <Bar
                dataKey="revenue"
                fill="#10b981"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* LINE CHART */}

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">

          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Évolution des paiements
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyPayments}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#f59e0b"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">

        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Performance annuelle
        </h2>

        {/* FILTER */}

        <div className="mb-4 flex flex-col md:flex-row gap-3">

          <input
            type="text"
            placeholder="Rechercher une année..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              px-3
              py-2
              border
              rounded-lg
              text-sm
              dark:bg-gray-800
              dark:border-gray-700
            "
          />

          <select
            onChange={(e) => setSortKey(e.target.value)}
            className="
              px-6
              py-2
              border
              rounded-lg
              text-sm
              dark:bg-gray-800
              dark:border-gray-700
            "
          >
            <option value="year">Année</option>
            <option value="students">Élèves</option>
            <option value="revenue">Revenus</option>
          </select>

          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="
              px-8
              py-2
              border
              rounded-lg
              text-sm
              dark:bg-gray-800
              dark:border-gray-700
            "
          >
            <option value="desc">Décroissant</option>
            <option value="asc">Croissant</option>
          </select>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="text-left border-b dark:border-gray-700 text-gray-500">

                <th className="p-3">Année</th>
                <th>Élèves</th>
                <th>Revenus</th>
                <th>Évolution</th>
                <th>Performance</th>

              </tr>

            </thead>

            <tbody>

              {filteredData.map((row, i) => {

                const prev = filteredData[i - 1];

                const growth = prev
                  ? ((row.revenue - prev.revenue) / prev.revenue) * 100
                  : 0;

                return (

                  <tr
                    key={i}
                    className="
                      border-b
                      hover:bg-gray-50
                      dark:hover:bg-gray-800
                      transition
                    "
                  >

                    <td className="p-3 font-medium text-gray-800 dark:text-white">
                      {row.year}
                    </td>

                    <td className="text-gray-600 dark:text-gray-300">
                      {row.students}
                    </td>

                    <td className="text-gray-600 dark:text-gray-300">
                      ${row.revenue.toLocaleString()}
                    </td>

                    <td>

                      <span
                        className={`
                          px-2
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${
                            growth >= 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {growth >= 0 ? "+" : ""}
                        {growth.toFixed(1)}%
                      </span>

                    </td>

                    <td>

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${
                            row.revenue > 70000
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >
                        {row.revenue > 70000
                          ? "Excellent"
                          : "Moyen"}
                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashoard1;