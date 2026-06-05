import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  DollarSign,
  RefreshCcw,
} from "lucide-react";

const years = ["2023-2024", "2024-2025", "2025-2026"];

const cycles = ["Maternelle", "Primaire", "Humanité", "Orientation"];
const sections = ["Scientifique", "Littéraire"];
const options = ["Biochimie", "Math Info"];
const classes = ["1ère A", "2ème B"];

const mockPayments = [
  {
    student: "Jean Paul",
    cycle: "Primaire",
    section: "Scientifique",
    option: "Math Info",
    class: "1ère A",
    year: "2024-2025",
    amount: 150000,
    mode: "Mensuel",
    status: "Payé",
  },
];

const ListPaid = () => {
  const [filters, setFilters] = useState({
    search: "",
    year: "",
    cycle: "",
    section: "",
    option: "",
    class: "",
  });

  const setField = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      year: "",
      cycle: "",
      section: "",
      option: "",
      class: "",
    });
  };

  const filteredData = useMemo(() => {
    return mockPayments.filter((p) => {
      return (
        (!filters.search ||
          p.student.toLowerCase().includes(filters.search.toLowerCase())) &&
        (!filters.year || p.year === filters.year) &&
        (!filters.cycle || p.cycle === filters.cycle) &&
        (!filters.section || p.section === filters.section) &&
        (!filters.option || p.option === filters.option) &&
        (!filters.class || p.class === filters.class)
      );
    });
  }, [filters]);

  const stats = useMemo(() => {
    const total = filteredData.reduce((a, b) => a + b.amount, 0);
    const count = filteredData.length;

    return {
      total,
      count,
    };
  }, [filteredData]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <DollarSign className="text-sky-900" />
            Paiements scolaires
          </h1>
          <p className="text-sm text-gray-500">
            Gestion complète des paiements élèves
          </p>
        </div>

      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card title="Total paiements" value={`${stats.total.toLocaleString()} FC`} />
        <Card title="Nombre paiements" value={stats.count} />
        <Card title="Statut global" value="Actif" />

      </div>

      {/* FILTERS */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-5 space-y-4">

        <div className="flex items-center gap-2 text-gray-600">
          <Filter size={18} />
          <span className="font-semibold">Filtres avancés</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">

          <input
            placeholder="Rechercher élève..."
            value={filters.search}
            onChange={(e) => setField("search", e.target.value)}
            className="p-3 rounded-xl border dark:bg-gray-800"
          />

          <select
            onChange={(e) => setField("year", e.target.value)}
            className="p-3 rounded-xl border dark:bg-gray-800"
          >
            <option value="">Année</option>
            {years.map((y) => <option key={y}>{y}</option>)}
          </select>

          <select onChange={(e) => setField("cycle", e.target.value)} className="p-3 rounded-xl border dark:bg-gray-800">
            <option>Cycle</option>
            {cycles.map((c) => <option key={c}>{c}</option>)}
          </select>

          <select onChange={(e) => setField("section", e.target.value)} className="p-3 rounded-xl border dark:bg-gray-800">
            <option>Section</option>
            {sections.map((s) => <option key={s}>{s}</option>)}
          </select>

          <select onChange={(e) => setField("option", e.target.value)} className="p-3 rounded-xl border dark:bg-gray-800">
            <option>Option</option>
            {options.map((o) => <option key={o}>{o}</option>)}
          </select>

          <select onChange={(e) => setField("class", e.target.value)} className="p-3 rounded-xl border dark:bg-gray-800">
            <option>Classe</option>
            {classes.map((c) => <option key={c}>{c}</option>)}
          </select>

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800"
          >
            <RefreshCcw size={16} />
            Reset
          </button>

          <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-sky-900 text-white hover:bg-sky-800">
            <Search size={16} />
            Rechercher
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-sky-900 text-white">
            <tr>
              <th className="p-4">Élève</th>
              <th>Cycle</th>
              <th>Section</th>
              <th>Classe</th>
              <th>Année</th>
              <th>Montant</th>
              <th>Mode</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>

            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-10 text-gray-500">
                  Aucun paiement trouvé
                </td>
              </tr>
            ) : (
              filteredData.map((p, i) => (
                <tr key={i} className="border-b dark:border-gray-800">
                  <td className="p-3">{p.student}</td>
                  <td>{p.cycle}</td>
                  <td>{p.section}</td>
                  <td>{p.class}</td>
                  <td>{p.year}</td>
                  <td className="font-semibold">{p.amount} FC</td>
                  <td>{p.mode}</td>
                  <td>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ListPaid;

/* ================= CARD ================= */
const Card = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-4">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
  </div>
);