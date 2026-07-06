import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  User,
  UserRound,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllStudents } from "../../features/student/studentSlice";
import { useDispatch } from "react-redux";
import { Eye } from "lucide-react";
import { Edit } from "lucide-react";
import { RefreshCcw } from "lucide-react";

/* ================= DATA ================= */

/* ================= MAIN ================= */
export default function StudentsERPUX() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);

  const { students, loading } = useSelector((state) => state.student);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const perPage = 5;

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    const safeStudents = students ?? [];

    return safeStudents.filter((s) => {
      const fullName = `${s?.nom || ""} ${s?.matricule || ""}`.toLowerCase();

      const matchSearch = !searchValue || fullName.includes(searchValue);

      const matchGender = !gender || s?.sexe === gender;

      return matchSearch && matchGender;
    });
  }, [students, search, gender]);
  /* ================= PAGINATION ================= */

  const safeFiltered = Array.isArray(filtered) ? filtered : [];

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(safeFiltered.length / perPage));
  }, [safeFiltered.length, perPage]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return safeFiltered.slice(start, start + perPage);
  }, [safeFiltered, page, perPage]);

  /* ================= STATS ================= */
  const stats = useMemo(() => {
    const safeStudents = Array.isArray(students) ? students : [];

    return {
      total: safeStudents.length,
      boys: safeStudents.filter((s) => s?.sexe === "M").length,
      girls: safeStudents.filter((s) => s?.sexe === "F").length,
    };
  }, [students]);
  const StatCard = ({ title, value, icon: Icon, color, description }) => {
    return (
      <div
        className="
        relative
        overflow-hidden
        rounded-3xl
        bg-white
        dark:bg-gray-900
        border
        border-gray-200
        dark:border-gray-700
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
      "
      >
        {/* décoration */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">
              {value}
            </h2>

            <p className="mt-2 text-xs text-gray-400">{description}</p>
          </div>

          <div
            className={`
            h-16
            w-16
            rounded-2xl
            ${color}
            flex
            items-center
            justify-center
            shadow-lg
          `}
          >
            <Icon size={30} className="text-white" />
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
      {/* ================= HEADER ================= */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl mb-8">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>

        <div className="relative p-8">
          <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-8">
            {/* ================= LEFT ================= */}

            <div className="flex items-center gap-5">
              <div
                className="
            h-20
            w-20
            rounded-3xl
            bg-gradient-to-br
            from-blue-600
            via-indigo-600
            to-blue-800
            flex
            items-center
            justify-center
            shadow-xl
          "
              >
                <UserRound size={38} className="text-white" />
              </div>

              <div>
                <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3">
                  ERP SCOLAIRE
                </span>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Gestion des élèves
                </h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-xl">
                  Consultez rapidement les inscriptions, recherchez un élève,
                  filtrez par cycle, section ou classe et gérez efficacement
                  votre établissement.
                </p>
              </div>
            </div>

            {/* ================= RIGHT ================= */}

            <div className="flex flex-col lg:flex-row gap-4 w-full xl:w-auto">
              {/* SEARCH */}

              {/* BUTTON */}

              <button
                onClick={() => navigate("/add-new-student")}
                className="
            h-14
            px-8
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-blue-800
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-3
            shadow-lg
            hover:shadow-2xl
            hover:-translate-y-1
            active:scale-95
            transition-all
            duration-300
            whitespace-nowrap
          "
              >
                <UserRound size={20} />
                Nouvel élève
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STATS (GLASS STYLE) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total des élèves"
          value={stats.total}
          icon={Users}
          color="bg-blue-600"
          description="Effectif global"
        />

        <StatCard
          title="Garçons"
          value={stats.boys}
          icon={UserRound}
          color="bg-sky-600"
          description="Élèves masculins"
        />

        <StatCard
          title="Filles"
          value={stats.girls}
          icon={User}
          color="bg-pink-600"
          description="Élèves féminins"
        />
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Titre */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Recherche rapide
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Recherchez un élève par matricule, nom, postnom ou prénom.
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full lg:w-[420px]">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nom complet ou matricule..."
                className="
            w-full
            h-12
            pl-11
            pr-4
            rounded-2xl
            border
            border-gray-200
            dark:border-gray-700
            bg-gray-50
            dark:bg-gray-800
            text-gray-700
            dark:text-white
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            outline-none
            transition
          "
              />
            </div>

            <button
              onClick={() => setSearch("")}
              className="
          h-12
          px-5
          rounded-2xl
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-medium
          transition
          whitespace-nowrap
        "
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* ================= TABLE HEADER ================= */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Liste des élèves
            </h2>
            <p className="text-sm text-gray-500">
              {paginated.length} résultat(s)
            </p>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
          {/* TABLE WRAPPER */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* HEADER */}
              <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left">Élève</th>
                  <th className="px-6 py-4 text-left">Matricule</th>
                  <th className="px-6 py-4 text-center">Sexe</th>
                  <th className="px-6 py-4 text-center">Nationalité</th>
                  <th className="px-6 py-4 text-center">Adresse</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginated.length > 0 ? (
                  paginated.map((s) => (
                    <tr
                      key={s._id}
                      className="group hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                    >
                      {/* ================= STUDENT ================= */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* AVATAR */}
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow">
                            {(s?.nom || "U").charAt(0).toUpperCase()}
                          </div>

                          {/* NAME */}
                          <div className="leading-tight">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {s.nom} {s.postnom}
                            </p>
                            <p className="text-xs text-gray-500">
                              Élève inscrit
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* MATRICULE */}
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">
                        {s.matricule}
                      </td>

                      {/* SEXE */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      s.sexe === "M"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-pink-100 text-pink-700"
                    }
                  `}
                        >
                          {s.sexe === "M" ? "Garçon" : "Fille"}
                        </span>
                      </td>

                      {/* NATIONALITÉ */}
                      <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                        {s.nationalite || "-"}
                      </td>

                      {/* ADRESSE */}
                      <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                        {s.adresse || "-"}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                          {/* VIEW */}
                          <button
                            onClick={() => navigate(`/details-student/${s._id}`)}
                            className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition cursor-pointer"
                            title="Voir"
                            type="button"
                          >
                            <Eye size={18} />
                          </button>

                          {/* EDIT */}
                          <button
                            onClick={() => navigate(`/students/edit/${s._id}`)}
                            className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition cursor-pointer"
                            title="Modifier"
                            type="button"
                          >
                            <Edit size={18} />
                          </button>

                          {/* RE-INSCRIPTION */}
                          <button
                            onClick={() =>
                              navigate(`/students/reinscription/${s._id}`)
                            }
                            className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition cursor-pointer"
                            title="Réinscription"
                            type="button"
                          >
                            <RefreshCcw size={18} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <div className="text-gray-400 text-sm">
                        Aucun élève trouvé
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= EMPTY STATE ================= */}
        {paginated.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-gray-400 text-sm">Aucun élève trouvé</div>
          </div>
        )}
      </div>
      {/* ================= PAGINATION UX ================= */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 px-2">
        {/* INFO */}
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Affichage de{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {(page - 1) * perPage + 1}
          </span>{" "}
          à{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.min(page * perPage, filtered.length)}
          </span>{" "}
          sur{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {filtered.length}
          </span>{" "}
          élèves
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="flex items-center gap-2">
          {/* PREV */}
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="h-10 w-10 flex items-center justify-center rounded-xl border
      bg-white dark:bg-gray-800 dark:border-gray-700
      hover:bg-gray-100 dark:hover:bg-gray-700
      disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={18} />
          </button>

          {/* CURRENT PAGE */}
          <div className="px-4 h-10 flex items-center rounded-xl bg-blue-600 text-white font-semibold shadow">
            {page}
          </div>

          {/* NEXT */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="h-10 w-10 flex items-center justify-center rounded-xl border
      bg-white dark:bg-gray-800 dark:border-gray-700
      hover:bg-gray-100 dark:hover:bg-gray-700
      disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD (GLASS PREMIUM) ================= */
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`p-5 rounded-2xl text-white bg-gradient-to-r ${color} shadow-lg flex justify-between items-center hover:scale-[1.02] transition`}
  >
    <div>
      <p className="text-white/80 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>

    <div className="opacity-80">{icon}</div>
  </div>
);
