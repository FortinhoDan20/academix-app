import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Search,
  RotateCcw,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

/* ================= MOCK DATA ================= */
const students = [
  {
    id: 1,
    name: "Jean Bosco",
    sex: "M",
    cycle: "humanite",
    section: "Scientifique",
    option: "Math-Info",
    class: "1ère A",
    year: "2024-2025",
  },
  {
    id: 2,
    name: "Marie Claire",
    sex: "F",
    cycle: "primaire",
    section: "",
    option: "",
    class: "3ème B",
    year: "2025-2026",
  },
];

/* ================= OPTIONS ================= */
const cycles = ["maternelle", "primaire", "humanite", "orientation"];
const sections = ["Scientifique", "Littéraire"];
const options = ["Math-Info", "Biochimie"];
const classes = ["1ère A", "2ème B"];
const years = ["2024-2025", "2025-2026"];

const ListInscrit = () => {

  /* ================= FILTER STATE ================= */
  const [tempFilters, setTempFilters] = useState({
    year: "",
    cycle: "",
    section: "",
    option: "",
    class: "",
    search: "",
  });

  const [filters, setFilters] = useState(tempFilters);

  const handleSearch = () => {
    setFilters(tempFilters);
  };

  const resetFilters = () => {
    const empty = {
      year: "",
      cycle: "",
      section: "",
      option: "",
      class: "",
      search: "",
    };
    setTempFilters(empty);
    setFilters(empty);
  };

  /* ================= FILTER DATA ================= */
  const filtered = students.filter((s) => {
    return (
      (!filters.year || s.year === filters.year) &&
      (!filters.cycle || s.cycle === filters.cycle) &&
      (!filters.section || s.section === filters.section) &&
      (!filters.option || s.option === filters.option) &&
      (!filters.class || s.class === filters.class) &&
      (!filters.search ||
        s.name.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  /* ================= STATS ================= */
  const total = students.length;
  const boys = students.filter(s => s.sex === "M").length;
  const girls = students.filter(s => s.sex === "F").length;

  const cycleStats = students.reduce((acc, s) => {
    acc[s.cycle] = (acc[s.cycle] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
      >

        {/* ================= HEADER ================= */}
        <div className="p-5 border-b flex justify-between items-center">

          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Élèves inscrits
            </h1>
            <p className="text-sm text-gray-500">
              Tableau de gestion scolaire
            </p>
          </div>

          <div className="flex gap-2">

            <button
              onClick={resetFilters}
              className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm"
            >
              <RotateCcw size={14} />
              Reset
            </button>

            <button
              className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800"
            >
              <Download size={16} />
              Export PDF
            </button>

          </div>

        </div>

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-4 gap-4 p-5">

          <div className="bg-blue-900 text-white p-4 rounded-xl">
            <p className="text-sm opacity-80">Total inscrits</p>
            <h2 className="text-3xl text-white font-bold">{total}</h2>
          </div>

          <div className="bg-green-800 text-white p-4 rounded-xl">
            <p className="text-sm opacity-80">Garçons</p>
            <h2 className="text-3xl text-white  font-bold">{boys}</h2>
          </div>

          <div className="bg-pink-600 text-white p-4 rounded-xl">
            <p className="text-sm opacity-80">Filles</p>
            <h2 className="text-3xl text-white font-bold">{girls}</h2>
          </div>

          <div className="bg-gray-500 text-white p-4 rounded-xl">
            <p className="text-sm opacity-80">Cycles</p>
            <h2 className="text-3xl text-white font-bold">
              {Object.keys(cycleStats).length}
            </h2>
          </div>

        </div>

        {/* ================= CYCLE BREAKDOWN ================= */}
        <div className="grid md:grid-cols-4 gap-3 px-5 pb-5">

          {Object.entries(cycleStats).map(([cycle, count]) => (
            <div
              key={cycle}
              className="bg-white dark:bg-gray-800 border rounded-xl p-3"
            >
              <p className="text-sm text-gray-500">{cycle}</p>
              <h3 className="text-xl font-bold text-blue-900">{count}</h3>
            </div>
          ))}

        </div>

        {/* ================= FILTERS ================= */}
        <div className="p-5 grid md:grid-cols-6 gap-3 bg-gray-50 dark:bg-gray-800">

          <div className="md:col-span-2 flex items-center gap-2 bg-white dark:bg-gray-900 px-3 rounded-lg border">

            <Search size={16} className="text-gray-400" />

            <input
              value={tempFilters.search}
              placeholder="Rechercher élève..."
              className="w-full py-2 outline-none bg-transparent text-sm"
              onChange={(e) =>
                setTempFilters({ ...tempFilters, search: e.target.value })
              }
            />

            <button
              onClick={handleSearch}
              className="bg-blue-900 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-800"
            >
              OK
            </button>

          </div>

          <select className="input" value={tempFilters.year}
            onChange={(e) => setTempFilters({ ...tempFilters, year: e.target.value })}>
            <option value="">Année</option>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>

          <select className="input" value={tempFilters.cycle}
            onChange={(e) => setTempFilters({ ...tempFilters, cycle: e.target.value })}>
            <option value="">Cycle</option>
            {cycles.map(c => <option key={c}>{c}</option>)}
          </select>

          <select className="input" value={tempFilters.section}
            onChange={(e) => setTempFilters({ ...tempFilters, section: e.target.value })}>
            <option value="">Section</option>
            {sections.map(s => <option key={s}>{s}</option>)}
          </select>

          <select className="input" value={tempFilters.option}
            onChange={(e) => setTempFilters({ ...tempFilters, option: e.target.value })}>
            <option value="">Option</option>
            {options.map(o => <option key={o}>{o}</option>)}
          </select>

          <select className="input" value={tempFilters.class}
            onChange={(e) => setTempFilters({ ...tempFilters, class: e.target.value })}>
            <option value="">Classe</option>
            {classes.map(c => <option key={c}>{c}</option>)}
          </select>

        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3 text-left">Nom</th>
                <th className="text-center">Année</th>
                <th className="text-center">Cycle</th>
                <th className="text-center">Section</th>
                <th className="text-center">Option</th>
                <th className="text-center">Classe</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="text-center">{s.year}</td>
                  <td className="text-center">{s.cycle}</td>
                  <td className="text-center">{s.section || "-"}</td>
                  <td className="text-center">{s.option || "-"}</td>
                  <td className="text-center">{s.class}</td>

                  <td className="text-center">
                    <div className="flex justify-center gap-3">

                      <Eye className="text-blue-600 cursor-pointer hover:scale-110" size={18} />
                      <Edit className="text-yellow-600 cursor-pointer hover:scale-110" size={18} />
                      <Trash2 className="text-red-600 cursor-pointer hover:scale-110" size={18} />

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </motion.div>
    </div>
  );
};

export default ListInscrit;