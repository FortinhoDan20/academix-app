import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  School,
  Search,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllCycle } from "../../features/cycle/cycleSlice";

/* ================= CONFIG ================= */
const sortOptions = [
  { value: "createdAt", label: "Date de création" },
  { value: "name", label: "Nom du cycle" },
  { value: "slug", label: "Abréviation" },
];

const ITEMS_PER_PAGE = 5;

/* ================= COMPONENT ================= */
const Cycle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(sortOptions[0]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const { cycles, loading, error } = useSelector((state) => state.cycle);

  /* ================= LOAD ================= */
  useEffect(() => {
    dispatch(getAllCycle());
  }, [dispatch]);

  /* ================= FILTER + SORT ================= */
  const filteredCycles = useMemo(() => {
    if (!cycles) return [];

    let data = [...cycles];

    data = data.filter((c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.slug?.toLowerCase().includes(search.toLowerCase())
    );

    data.sort((a, b) => {
      const field = sortField.value;

      let first = a?.[field] ?? "";
      let second = b?.[field] ?? "";

      // sécurisation string
      first = String(first).toLowerCase();
      second = String(second).toLowerCase();

      if (sortOrder === "asc") {
        return first > second ? 1 : -1;
      } else {
        return first < second ? 1 : -1;
      }
    });

    return data;
  }, [cycles, search, sortField, sortOrder]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredCycles.length / ITEMS_PER_PAGE);

  const paginatedCycles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCycles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCycles, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortField, sortOrder]);

  /* ================= PAGINATION SMART ================= */
  const maxVisible = 3;
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-4 border-sky-200 border-t-sky-900 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
              <School className="w-6 h-6" />
            </div>
            Gestion des cycles
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Organisation des cycles scolaires
          </p>
        </div>

        <button
          onClick={() => navigate("/add-cycle")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Nouveau cycle
        </button>

      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Total cycles</p>
          <h2 className="text-3xl font-bold">{cycles?.length || 0}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Résultats filtrés</p>
          <h2 className="text-3xl font-bold">{filteredCycles.length}</h2>
        </div>

      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* ================= FILTER ================= */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow space-y-4">

        <div className="flex flex-col xl:flex-row gap-3">

          {/* SEARCH */}
          <div className="relative w-full xl:w-96">

            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-10 pr-10 py-3 border rounded-xl dark:bg-gray-700"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-3 text-gray-400"
              >
                ✕
              </button>
            )}

          </div>

          {/* SORT */}
          <Listbox value={sortField} onChange={setSortField}>
            <div className="relative w-full xl:w-64">

              <Listbox.Button className="w-full flex justify-between p-3 border rounded-xl dark:bg-gray-700">
                {sortField.label}
                <ChevronsUpDown className="w-4 h-4" />
              </Listbox.Button>

              <Listbox.Options className="absolute mt-2 w-full bg-white dark:bg-gray-700 rounded-xl shadow z-50">
                {sortOptions.map((opt) => (
                  <Listbox.Option
                    key={opt.value}
                    value={opt}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    {opt.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>

            </div>
          </Listbox>

          {/* ORDER */}
          <button
            onClick={() =>
              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }
            className="px-5 py-3 border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {sortOrder === "asc" ? "⬆ Asc" : "⬇ Desc"}
          </button>

        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Nom</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {paginatedCycles.length > 0 ? (
              paginatedCycles.map((c, i) => (
                <tr key={c._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">

                  <td className="p-4">
                    {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                  </td>

                  <td className="p-4 font-semibold">{c.name}</td>

                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {c.slug}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:bg-red-100 p-2 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-500">
                  Aucun cycle trouvé
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border rounded-xl disabled:opacity-40"
          >
            Prev
          </button>

          <div className="flex gap-2">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-10 h-10 rounded-xl ${
                  currentPage === p
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border rounded-xl disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default Cycle;