import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Eye,
  Edit,
  CreditCard,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ================= MOCK ================= */
const students = [
  {
    id: 1,
    name: "Jean Bosco",
    cycle: "Humanité",
    class: "1ère A",
    section: "Scientifique",
    option: "Math-Info",
    year: "2024-2025",
    gender: "M",
  },
  {
    id: 2,
    name: "Marie Claire",
    cycle: "Primaire",
    class: "3ème B",
    section: "",
    option: "",
    year: "2025-2026",
    gender: "F",
  },
];

/* ================= COMPONENT ================= */
export default function StudentDossierList() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: "",
    year: "",
    cycle: "",
    class: "",
  });

  const filtered = students.filter((s) =>
    (!filters.search ||
      s.name.toLowerCase().includes(filters.search.toLowerCase())) &&
    (!filters.year || s.year === filters.year) &&
    (!filters.cycle || s.cycle === filters.cycle) &&
    (!filters.class || s.class === filters.class)
  );

  const total = students.length;
  const boys = students.filter((s) => s.gender === "M").length;
  const girls = students.filter((s) => s.gender === "F").length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        className="max-w-[1400px] mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
      >

        {/* ================= HEADER ================= */}
        <div className="p-8 border-b flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Dossiers élèves
            </h1>
            <p className="text-sm text-gray-500">
              Gestion complète des élèves inscrits
            </p>
          </div>

        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">

          <StatCard title="Total élèves" value={total} />
          <StatCard title="Garçons" value={boys} />
          <StatCard title="Filles" value={girls} />

        </div>

        {/* ================= FILTERS ================= */}
        <div className="p-8 grid md:grid-cols-4 gap-5 bg-gray-50 dark:bg-gray-800">

          {/* SEARCH */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-3 rounded-xl border col-span-1 md:col-span-1">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Rechercher un élève..."
              className="w-full outline-none bg-transparent"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          <select
            className="input"
            onChange={(e) =>
              setFilters({ ...filters, year: e.target.value })
            }
          >
            <option value="">Année</option>
            <option>2024-2025</option>
            <option>2025-2026</option>
          </select>

          <select
            className="input"
            onChange={(e) =>
              setFilters({ ...filters, cycle: e.target.value })
            }
          >
            <option value="">Cycle</option>
            <option>Humanité</option>
            <option>Primaire</option>
          </select>

          <select
            className="input"
            onChange={(e) =>
              setFilters({ ...filters, class: e.target.value })
            }
          >
            <option value="">Classe</option>
            <option>1ère A</option>
            <option>2ème A</option>
            <option>3ème B</option>
          </select>

        </div>

        {/* ================= TABLE ================= */}
        <div className="p-6 overflow-x-auto">

          <table className="w-full min-w-[1000px] text-sm">

            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4 text-left">Nom</th>
                <th>Cycle</th>
                <th>Classe</th>
                <th>Section</th>
                <th>Option</th>
                <th>Année</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-4 font-semibold">{s.name}</td>
                  <td>{s.cycle}</td>
                  <td>{s.class}</td>
                  <td>{s.section || "-"}</td>
                  <td>{s.option || "-"}</td>
                  <td>{s.year}</td>

                  {/* ACTIONS */}
                  <td className="flex justify-center gap-2 p-3">

                    <IconBtn color="blue">
                      <Eye size={16} />
                    </IconBtn>

                    <IconBtn color="yellow">
                      <Edit size={16} />
                    </IconBtn>

                    <IconBtn color="green">
                      <CreditCard size={16} />
                    </IconBtn>

                    <IconBtn color="gray">
                      <FileText size={16} />
                    </IconBtn>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </motion.div>
    </div>
  );
}

/* ================= UI ================= */
const StatCard = ({ title, value }) => (
  <div className="p-6 rounded-2xl border bg-white dark:bg-gray-900">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-blue-900">{value}</p>
  </div>
);

const IconBtn = ({ children, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    yellow: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    green: "bg-green-100 text-green-700 hover:bg-green-200",
    gray: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };

  return (
    <button className={`p-2 rounded-lg ${colors[color]}`}>
      {children}
    </button>
  );
};