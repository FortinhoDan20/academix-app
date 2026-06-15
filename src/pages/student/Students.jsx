import React, { useMemo, useState } from "react";
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

/* ================= DATA ================= */
const STUDENTS = [
  { _id: "1", name: "Jean Bosco", matricule: "ELV-001", gender: "M", classroom: "6ème A" },
  { _id: "2", name: "Marie Claire", matricule: "ELV-002", gender: "F", classroom: "5ème B" },
  { _id: "3", name: "Patrick K.", matricule: "ELV-003", gender: "M", classroom: "4ème C" },
  { _id: "4", name: "Aline Mukendi", matricule: "ELV-004", gender: "F", classroom: "6ème B" },
  { _id: "5", name: "Kevin Nzambe", matricule: "ELV-005", gender: "M", classroom: "5ème A" },
  { _id: "6", name: "Chantal B.", matricule: "ELV-006", gender: "F", classroom: "4ème A" },
  { _id: "7", name: "Junior M.", matricule: "ELV-007", gender: "M", classroom: "3ème A" },
];

/* ================= MAIN ================= */
export default function StudentsERPUX() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 5;

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return STUDENTS.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.matricule.toLowerCase().includes(search.toLowerCase());

      const matchGender = gender ? s.gender === gender : true;

      return matchSearch && matchGender;
    });
  }, [search, gender]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  /* ================= STATS ================= */
  const stats = useMemo(() => ({
    total: STUDENTS.length,
    boys: STUDENTS.filter(s => s.gender === "M").length,
    girls: STUDENTS.filter(s => s.gender === "F").length,
  }), []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">

{/* ================= HEADER ================= */}
<div className="flex flex-col md:flex-row justify-between gap-5 mb-6">

  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
      Gestion des élèves
    </h1>
    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
      Vue globale des inscriptions scolaires
    </p>
  </div>

  <div className="flex items-center gap-3 w-full md:w-auto">

    {/* SEARCH */}
    <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-sm border dark:border-gray-700 w-full md:w-96">
      <Search size={18} className="text-gray-400" />
      <input
        className="ml-2 w-full bg-transparent outline-none text-gray-700 dark:text-white"
        placeholder="Rechercher élève ou matricule..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* CTA BUTTON */}
    <button
      onClick={() => navigate("/students/new")}
      className="
        flex
        items-center
        gap-2
        px-5
        py-3
        rounded-2xl
        text-white
        font-semibold
        bg-gradient-to-r
        from-sky-600
        to-indigo-600
        shadow-lg
        hover:scale-105
        hover:shadow-xl
        transition
        whitespace-nowrap
      "
    >
      <UserRound size={18} />
      Nouvel élève
    </button>

  </div>

</div>

      {/* ================= STATS (GLASS STYLE) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <StatCard
          title="Total élèves"
          value={stats.total}
          icon={<Users />}
          color="from-blue-500 to-blue-700"
        />

        <StatCard
          title="Garçons"
          value={stats.boys}
          icon={<UserRound />}
          color="from-sky-500 to-sky-700"
        />

        <StatCard
          title="Filles"
          value={stats.girls}
          icon={<User />}
          color="from-pink-500 to-pink-700"
        />

      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl border dark:border-gray-700 mb-6">

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Filter size={16} />
          Filtres rapides
        </div>

        <div className="flex gap-3">

          <select
            className="px-3 py-2 rounded-xl border dark:bg-gray-900 dark:border-gray-700 text-sm"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Tous</option>
            <option value="M">Garçons</option>
            <option value="F">Filles</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setGender("");
            }}
            className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm hover:opacity-80"
          >
            Reset
          </button>

        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border dark:border-gray-700 shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-50 dark:bg-gray-700 text-sm">
            <tr>
              <th className="p-4 text-left">Élève</th>
              <th className="p-4 text-left">Matricule</th>
              <th className="p-4 text-left">Sexe</th>
              <th className="p-4 text-left">Classe</th>
            </tr>
          </thead>

          <tbody>

            {paginated.map((s) => (

              <tr
                key={s._id}
                className="
                  group
                  border-t
                  dark:border-gray-700
                  hover:bg-gray-50
                  dark:hover:bg-gray-700
                  transition
                  relative
                "
              >

                {/* LEFT ACCENT UX */}
                <td className="p-4 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow">
                    {s.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {s.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Élève actif
                    </p>
                  </div>

                </td>

                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {s.matricule}
                </td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    s.gender === "M"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-pink-100 text-pink-700"
                  }`}>
                    {s.gender === "M" ? "Garçon" : "Fille"}
                  </span>
                </td>

                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {s.classroom}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {paginated.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            Aucun résultat trouvé
          </div>
        )}

      </div>

      {/* ================= PAGINATION UX ================= */}
      <div className="flex items-center justify-between mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-40"
        >
          <ChevronLeft />
        </button>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          Page <b>{page}</b> / {totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-40"
        >
          <ChevronRight />
        </button>

      </div>

    </div>
  );
}

/* ================= STAT CARD (GLASS PREMIUM) ================= */
const StatCard = ({ title, value, icon, color }) => (
  <div className={`p-5 rounded-2xl text-white bg-gradient-to-r ${color} shadow-lg flex justify-between items-center hover:scale-[1.02] transition`}>

    <div>
      <p className="text-white/80 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>

    <div className="opacity-80">
      {icon}
    </div>

  </div>
);