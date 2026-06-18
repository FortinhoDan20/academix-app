import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Search,
  RotateCcw,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllRegisters } from "../../features/register/registerSlice";

/* ================= MOCK DATA ================= */
const students = Array.from({ length: 60 }).map((_, i) => {
  const cycles = ["maternelle", "primaire", "humanite"];
  const sections = ["Scientifique", "Littéraire"];
  const options = ["Math-Info", "Biochimie"];
  const classes = ["1A", "1B", "2A", "2B"];
  const years = ["2024-2025", "2025-2026"];

  return {
    id: i + 1,
    name: i % 2 === 0 ? `Jean Bosco ${i}` : `Marie Claire ${i}`,
    sex: i % 2 === 0 ? "M" : "F",
    cycle: cycles[i % cycles.length],
    section: sections[i % sections.length],
    option: options[i % options.length],
    class: classes[i % classes.length],
    year: years[i % years.length],
  };
});

export default function ListInscritERPWide() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    search: "",
    cycle: "",
    section: "",
    option: "",
    class: "",
    year: "",
  });

  const [page, setPage] = useState(1);
  const perPage = 5;

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return students.filter((s) => {
      return (
        (!filters.search || s.name.toLowerCase().includes(filters.search.toLowerCase())) &&
        (!filters.cycle || s.cycle === filters.cycle) &&
        (!filters.section || s.section === filters.section) &&
        (!filters.option || s.option === filters.option) &&
        (!filters.class || s.class === filters.class) &&
        (!filters.year || s.year === filters.year)
      );
    });
  }, [filters]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const stats = {
    total: students.length,
    boys: students.filter(s => s.sex === "M").length,
    girls: students.filter(s => s.sex === "F").length,
  };

  useEffect(() => {
      dispatch(getAllRegisters());
    }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}

        /* 🔥 W I D T H   U L T R A   L A R G E */
        className="max-w-[1600px] mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
      >

        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 p-8 border-b">

          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              🎓 LES DES ÉLÈVES 
            </h1>
            <p className="text-gray-500 mt-1">
              Vue ERP large — gestion complète des inscriptions
            </p>
          </div>

          <div className="flex gap-3">

            <button className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center gap-2">
              <RotateCcw size={16} />
              Reset
            </button>

            <button className="px-5 py-2 rounded-xl bg-blue-900 text-white flex items-center gap-2 hover:bg-blue-800">
              <Download size={16} />
              Export Excel
            </button>

            <button className="px-5 py-2 rounded-xl bg-green-800 text-white flex items-center gap-2 hover:bg-green-700">
              <Download size={16} />
              Export PDF
            </button>

          </div>

        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">

          <Stat label="Total élèves" value={stats.total} color="bg-blue-900" />
          <Stat label="Garçons" value={stats.boys} color="bg-green-700" />
          <Stat label="Filles" value={stats.girls} color="bg-pink-600" />

        </div>

        {/* ================= FILTERS (PLUS LARGE UX) ================= */}
        <div className="p-8 bg-gray-50 dark:bg-gray-800">

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">

            {/* SEARCH */}
            <div className="md:col-span-2 flex items-center bg-white dark:bg-gray-900 px-4 rounded-xl border shadow-sm">
              <Search size={16} className="text-gray-400" />
              <input
                className="w-full p-3 outline-none bg-transparent"
                placeholder="Rechercher élève..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            <Select label="Cycle" value={filters.cycle} onChange={(v) => setFilters({ ...filters, cycle: v })} />
            <Select label="Section" value={filters.section} onChange={(v) => setFilters({ ...filters, section: v })} />
            <Select label="Option" value={filters.option} onChange={(v) => setFilters({ ...filters, option: v })} />
            <Select label="Classe" value={filters.class} onChange={(v) => setFilters({ ...filters, class: v })} />

          </div>

        </div>

        {/* ================= TABLE (AIR + SPACE UX) ================= */}
        <div className="overflow-x-auto p-8">

          <table className="w-full text-sm">

            <thead className="bg-blue-900 text-white text-sm">
              <tr>
                <th className="p-4 text-left">Nom complet</th>
                <th>Sexe</th>
                <th>Cycle</th>
                <th>Section</th>
                <th>Option</th>
                <th>Classe</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {paginated.map((s) => (

                <tr key={s.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">

                  <td className="p-4 font-semibold text-gray-800 dark:text-white">
                    {s.name}
                  </td>

                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      s.sex === "M"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-pink-100 text-pink-700"
                    }`}>
                      {s.sex}
                    </span>
                  </td>

                  <td>{s.cycle}</td>
                  <td>{s.section}</td>
                  <td>{s.option}</td>
                  <td>{s.class}</td>

                  <td>
                    <div className="flex gap-4 justify-center">

                      <Eye size={18} className="text-blue-600 cursor-pointer hover:scale-110 transition" />
                      <Edit size={18} className="text-yellow-600 cursor-pointer hover:scale-110 transition" />
                      <Trash2 size={18} className="text-red-600 cursor-pointer hover:scale-110 transition" />

                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-between items-center px-8 pb-8">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-xl disabled:opacity-40"
          >
            <ChevronLeft />
          </button>

          <span className="text-gray-500">
            Page {page} / {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-xl disabled:opacity-40"
          >
            <ChevronRight />
          </button>

        </div>

      </motion.div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */
const Stat = ({ label, value, color }) => (
  <div className={`${color} text-white p-6 rounded-2xl shadow-lg`}>
    <p className="text-sm opacity-80">{label}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
  </div>
);

const Select = ({ label, value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="p-3 rounded-xl border bg-white dark:bg-gray-900"
  >
    <option value="">{label}</option>
    <option value="humanite">Humanité</option>
    <option value="primaire">Primaire</option>
    <option value="maternelle">Maternelle</option>
    <option value="Scientifique">Scientifique</option>
    <option value="Littéraire">Littéraire</option>
  </select>
);