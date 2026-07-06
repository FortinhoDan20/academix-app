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
import { useSelector } from "react-redux";
import { getAllCycle } from "../../features/cycle/cycleSlice";
import { getAllSection } from "../../features/section/sectionSlice";
import { getAllYears } from "../../features/year/yearSlice";
import { getAllOptions } from "../../features/option/optionSlice";
import { getAllClassrooms } from "../../features/classroom/classroomSlice";
import { GraduationCap } from "lucide-react";
import { User } from "lucide-react";
import { Users } from "lucide-react";
import { useForm } from "react-hook-form";

export default function ListInscritERPWide() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { registers = [], loading } = useSelector((state) => state.register);

  const { cycles = [] } = useSelector((state) => state.cycle);
  const { sections = [] } = useSelector((state) => state.section);
  const { allYears = [] } = useSelector((state) => state.year);
  const { options = [] } = useSelector((state) => state.option);
  const { classrooms = [] } = useSelector((state) => state.classroom);

  const [filters, setFilters] = useState({
    search: "",
    cycle: "",
    section: "",
    option: "",
    classroom: "",
    year: "",
  });

  const [page, setPage] = useState(1);
  const perPage = 5;

  /* ================= FILTER ================= */

  /* ================= CASCADE DROPDOWNS ================= */

const filteredSections = useMemo(() => {
  if (!filters.cycle) return [];
  return sections.filter(
    (s) => s?.cycleId?._id === filters.cycle
  );
}, [sections, filters.cycle]);


const filteredOptions = useMemo(() => {
  if (!filters.section) return [];
  return options.filter(
    (o) => o?.sectionId?._id === filters.section
  );
}, [options, filters.section]);


const filteredClassrooms = useMemo(() => {
  if (!filters.cycle) return [];

  const cycleObj = cycles.find(
    (c) => c._id === filters.cycle
  );

  const isHumanite =
    cycleObj?.name?.toLowerCase()?.trim() === "humanité";

  if (isHumanite) {
    if (!filters.option) return [];
    return classrooms.filter(
      (c) => c?.optionId?._id === filters.option
    );
  }

  return classrooms.filter(
    (c) => c?.cycleId?._id === filters.cycle
  );
}, [classrooms, filters.cycle, filters.option, cycles]);


  const filtered = useMemo(() => {
    const searchValue = filters.search
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const safeRegisters = registers ?? [];

    return safeRegisters.filter((item) => {
      const fullname = [
        item?.studentId?.matricule,
        item?.studentId?.nom,
        item?.studentId?.postnom,
        item?.studentId?.prenom,
      ]
        .filter(Boolean)
        .join(" ")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      const matchSearch = !searchValue || fullname.includes(searchValue);

      const matchCycle = !filters.cycle || item?.cycleId?._id === filters.cycle;

      const matchSection =
        !filters.section || item?.sectionId?._id === filters.section;

      const matchOption =
        !filters.option || item?.optionId?._id === filters.option;

      const matchClassroom =
        !filters.classroom || item?.classroomId?._id === filters.classroom;

      const matchYear = !filters.year || item?.yearId?._id === filters.year;

      return (
        matchSearch &&
        matchCycle &&
        matchSection &&
        matchOption &&
        matchClassroom &&
        matchYear
      );
    });
  }, [registers, filters]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  /*==================FILTER STATS ===================*/
  const filteredStats = useMemo(() => {
    const total = filtered.length;

    const garcons = filtered.filter((i) => i?.studentId?.sexe === "M").length;

    const filles = filtered.filter((i) => i?.studentId?.sexe === "F").length;

    return { total, garcons, filles };
  }, [filtered]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    dispatch(getAllRegisters());
    dispatch(getAllCycle());
    dispatch(getAllSection());
    dispatch(getAllYears());
    dispatch(getAllOptions());
    dispatch(getAllClassrooms());
  }, [dispatch]);

  const Stat = ({ label, value, icon: Icon, color, subtitle }) => {
    return (
      <div
        className="
      relative
      overflow-hidden
      rounded-2xl
      border
      border-gray-200
      dark:border-gray-700
      bg-white
      dark:bg-gray-900
      p-6
      shadow-sm
      hover:shadow-lg
      hover:-translate-y-1
      transition-all
      duration-300
    "
      >
        <div className={`absolute top-0 left-0 w-1.5 h-full ${color}`} />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>

            <h2 className="mt-2 text-4xl font-bold text-gray-800 dark:text-white">
              {value}
            </h2>

            <p className="mt-2 text-xs text-gray-400">{subtitle}</p>
          </div>

          <div
            className={`h-16 w-16 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center`}
          >
            <Icon size={30} className="text-current" />
          </div>
        </div>
      </div>
    );
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      cycle: "",
      section: "",
      option: "",
      classroom: "",
      year: "",
    });

    setPage(1);
  };

  const handleCycleChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      cycle: value,
      section: "",
      option: "",
      classroom: "",
    }));
  };

  const handleSectionChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      section: value,
      option: "",
      classroom: "",
    }));
  };

  const handleOptionChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      option: value,
      classroom: "",
    }));
  };

  const FilterSelect = ({
    label,
    value,
    options = [],
    onChange,
    optionLabel = "name",
    disabled = false,
  }) => {
    return (
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 rounded-xl border outline-none transition
        ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-800"
        }`}
      >
        <option value="">{label}</option>

        {options.map((item) => (
          <option key={item._id} value={item._id}>
            {item[optionLabel]}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-950 p-10">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/60 backdrop-blur-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              ease: "linear",
            }}
            className="w-14 h-14 border-4 border-blue-300 border-t-blue-900 rounded-full"
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        /* 🔥 W I D T H   U L T R A   L A R G E */
        className="max-w-[1600px] mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 mb-6">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
            {/* TITLE */}
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                <GraduationCap size={30} className="text-white" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Gestion des élèves
                </h1>

                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  Consultation, recherche et gestion complète des inscriptions.
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={resetFilters}
                className="h-11 px-5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center gap-2 hover:shadow-md transition"
              >
                <RotateCcw size={17} />
                Réinitialiser
              </button>

              <button className="h-11 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 shadow-sm transition">
                <Download size={17} />
                Excel
              </button>

              <button className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 shadow-sm transition">
                <Download size={17} />
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8">
          <Stat
            label="Total élèves"
            value={filteredStats.total}
            subtitle="Tous les élèves inscrits"
            color="bg-blue-600"
            icon={GraduationCap}
          />

          <Stat
            label="Garçons"
            value={filteredStats.garcons}
            subtitle={
              filteredStats.total > 0
                ? `${Math.round((filteredStats.garcons / filteredStats.total) * 100)} % du total`
                : "0 % du total"
            }
            color="bg-green-600"
            icon={User}
          />

          <Stat
            label="Filles"
            value={filteredStats.filles}
            subtitle={
              filteredStats.total > 0
                ? `${Math.round((filteredStats.filles / filteredStats.total) * 100)} % du total`
                : "0 % du total"
            }
            color="bg-pink-600"
            icon={Users}
          />
        </div>

        {/* ================= FILTERS (PLUS LARGE UX) ================= */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          {/* ================= ROW 1 ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* SEARCH */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Rechercher un élève..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
              />
            </div>

            {/* CYCLE */}
            <FilterSelect
              label="Cycle"
              value={filters.cycle}
              options={cycles}
              onChange={handleCycleChange}
            />

            {/* YEAR */}
            <FilterSelect
              label="Année scolaire"
              value={filters.year}
              options={allYears}
              optionLabel="year"
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  year: value,
                }))
              }
            />
          </div>

          {/* ================= ROW 2 ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {/* SECTION */}
            <FilterSelect
              label="Section"
              value={filters.section}
              options={filteredSections}
              onChange={handleSectionChange}
              disabled={!filters.cycle}
            />

            {/* OPTION */}
            <FilterSelect
              label="Option"
              value={filters.option}
              options={filteredOptions}
              onChange={handleOptionChange}
              disabled={!filters.section}
            />

            {/* CLASSROOM */}
            <FilterSelect
              label="Classe"
              value={filters.classroom}
              options={filteredClassrooms}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  classroom: value,
                }))
              }
              disabled={!filters.cycle}
            />
          </div>
        </div>

        {/* ================= TABLE (AIR + SPACE UX) ================= */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Liste des élèves
              </h2>
              <p className="text-sm text-gray-500">
                {filteredStats.total} élève(s) trouvé(s)
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition">
              Actualiser
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300">
                  <th className="px-6 py-4 text-left">Élève</th>
                  <th className="text-center">Sexe</th>
                  <th className="text-center">Cycle</th>
                  <th className="text-center">Section</th>
                  <th className="text-center">Option</th>
                  <th className="text-center">Classe</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((s) => (
                    <tr
                      key={s._id}
                      className="border-t border-gray-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            {`${s?.studentId?.nom?.[0] || ""}${s?.studentId?.postnom?.[0] || ""}`}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {s?.studentId?.nom} {s?.studentId?.postnom}
                            </p>

                            <p className="text-sm text-gray-500">
                              {s?.studentId?.prenom}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            s?.studentId?.sexe === "M"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-pink-100 text-pink-700"
                          }`}
                        >
                          {s?.studentId?.sexe === "M" ? "Masculin" : "Féminin"}
                        </span>
                      </td>

                      <td className="text-center">{s?.cycleId?.name}</td>

                      <td className="text-center">
                        {s?.sectionId?.name || "-"}
                      </td>

                      <td className="text-center">
                        {s?.optionId?.name || "-"}
                      </td>

                      <td className="text-center">{s?.classroomId?.name}</td>

                      <td>
                        <div className="flex justify-center gap-2">
                          <button className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 hover:scale-110 transition flex items-center justify-center">
                            <Eye size={18} />
                          </button>

                          <button className="h-9 w-9 rounded-full bg-yellow-100 text-yellow-700 hover:scale-110 transition flex items-center justify-center">
                            <Edit size={18} />
                          </button>

                          <button className="h-9 w-9 rounded-full bg-red-100 text-red-700 hover:scale-110 transition flex items-center justify-center">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      Aucun élève trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-5 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500">
              Page {page} sur {totalPages || 1}
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center transition"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold">
                {page}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
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

const FilterSelect = ({
  label,
  value,
  options = [],
  onChange,
  optionLabel = "name",
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-xl border bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
    >
      <option value="">{label}</option>

      {options.map((item) => (
        <option key={item._id} value={item._id}>
          {item[optionLabel]}
        </option>
      ))}
    </select>
  );
};
