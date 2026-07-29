import React, { useEffect, useMemo, useState } from "react";
import { Search, Filter, DollarSign, RefreshCcw, FileText } from "lucide-react";
import { useDispatch } from "react-redux";
import { getAllCurrentPaid } from "../../features/payment/paymentSlice";
import { useSelector } from "react-redux";

/* const years = ["2023-2024", "2024-2025", "2025-2026"];

const cycles = ["Maternelle", "Primaire", "Humanité", "Orientation"];
const sections = ["Scientifique", "Littéraire"];
const options = ["Biochimie", "Math Info"];
const classes = ["1ère A", "2ème B"]; */

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

const ListCurrentPaid = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCycle, setSelectedCycle] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTypeFees, setSelectedTypeFees] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    paymentList = [],
    loading,
    error,
  } = useSelector((state) => state.payment);

  const dispatch = useDispatch();

  const itemsPerPage = 10;

  const { classes, cycles, sections, options, years, typeFees } =
    useMemo(() => {
      return {
        classes: [
          ...new Set(
            paymentList
              .map((p) => p?.registerId?.classroomId?.name)
              .filter(Boolean),
          ),
        ].sort(),

        cycles: [
          ...new Set(
            paymentList
              .map((p) => p?.registerId?.cycleId?.name)
              .filter(Boolean),
          ),
        ].sort(),

        sections: [
          ...new Set(
            paymentList
              .map((p) => p?.registerId?.sectionId?.name)
              .filter(Boolean),
          ),
        ].sort(),

        options: [
          ...new Set(
            paymentList
              .map((p) => p?.registerId?.optionId?.name)
              .filter(Boolean),
          ),
        ].sort(),

        years: [
          ...new Set(
            paymentList.map((p) => p?.registerId?.yearId?.year).filter(Boolean),
          ),
        ].sort(),

        typeFees: [
          ...new Set(paymentList.map((p) => p?.typeFee).filter(Boolean)),
        ].sort(),
      };
    }, [paymentList]);

  const filteredPayments = useMemo(() => {
    return paymentList.filter((payment) => {
      return (
        (!selectedClass ||
          payment?.registerId?.classroomId?.name === selectedClass) &&
        (!selectedYear || payment?.registerId?.yearId?.year === selectedYear) &&
        (!selectedCycle ||
          payment?.registerId?.cycleId?.name === selectedCycle) &&
        (!selectedSection ||
          payment?.registerId?.sectionId?.name === selectedSection) &&
        (!selectedOption ||
          payment?.registerId?.optionId?.name === selectedOption) &&
        (!selectedTypeFees || payment?.typeFee === selectedTypeFees)
      );
    });
  }, [
    paymentList,
    selectedClass,
    selectedYear,
    selectedCycle,
    selectedSection,
    selectedOption,
    selectedTypeFees,
  ]);
  const stats = useMemo(() => {
    // Un seul register par élève
    const registers = [
      ...new Map(
        filteredPayments.map((p) => [p.registerId?._id, p.registerId]),
      ).values(),
    ];

    // Total déjà payé
    const totalPaid = filteredPayments.reduce(
      (sum, p) => sum + Number(p.amountPaid || 0),
      0,
    );

    // Total restant
    const totalRemaining = registers.reduce(
      (sum, r) => sum + Number(r.reste || 0),
      0,
    );

    // Total attendu
    const totalExpected = totalPaid + totalRemaining;

    // Elèves ayant tout payé
    const paidStudents = registers.filter((r) => Number(r.reste) === 0).length;

    const unpaidStudents = registers.length - paidStudents;

    const recoveryRate =
      totalExpected > 0 ? ((totalPaid / totalExpected) * 100).toFixed(1) : 0;

    return {
      totalPaid,
      totalRemaining,
      totalExpected,
      paidStudents,
      unpaidStudents,
      recoveryRate,
      totalStudents: registers.length,
    };
  }, [filteredPayments]);

  const handleResetFilters = () => {
    setSelectedClass("");
    setSelectedYear("");
    setSelectedCycle("");
    setSelectedSection("");
    setSelectedOption("");
    setSelectedTypeFees("");
  };

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleExportPDF = () => {
    console.log("Export PDF...");
    // Génération du PDF ici
  };

  useEffect(() => {
    dispatch(getAllCurrentPaid());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedClass,
    selectedYear,
    selectedCycle,
    selectedSection,
    selectedOption,
    selectedTypeFees,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [paymentList]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <DollarSign className="text-sky-900" />
            Paiements scolaires encours 
          </h1>
          <p className="text-sm text-gray-500">
            Gestion complète des paiements élèves
          </p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card
          title="Montant encaissé"
          value={`${stats.totalPaid.toLocaleString("fr-FR")} $`}
          subtitle="Total déjà perçu"
          color="green"
        />

        <Card
          title="Reste à encaisser"
          value={`${stats.totalRemaining.toLocaleString("fr-FR")} $`}
          subtitle="Montant restant"
          color="red"
        />

        <Card
          title="Élèves en règle"
          value={`${stats.paidStudents}/${stats.totalStudents}`}
          subtitle={`${stats.unpaidStudents} restant(s)`}
          color="blue"
        />

        <Card
          title="Taux de recouvrement"
          value={`${stats.recoveryRate}%`}
          subtitle="Progression des paiements"
          color="amber"
        />
      </div>

      {/* FILTERS */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
              <Filter size={20} className="text-sky-700 dark:text-sky-400" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Filtres des paiements
              </h3>

              <p className="text-sm text-gray-500">
                Affinez les résultats selon les critères souhaités.
              </p>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Année */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3"
          >
            <option value="">Toutes les années</option>

            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Cycle */}
          <select
            value={selectedCycle}
            onChange={(e) => setSelectedCycle(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3"
          >
            <option value="">Tous les cycles</option>

            {cycles.map((cycle) => (
              <option key={cycle} value={cycle}>
                {cycle}
              </option>
            ))}
          </select>

          {/* Section */}
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3"
          >
            <option value="">Toutes les sections</option>

            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>

          {/* Option */}
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3"
          >
            <option value="">Toutes les options</option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Classe */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3"
          >
            <option value="">Toutes les classes</option>

            {classes.map((classe) => (
              <option key={classe} value={classe}>
                {classe}
              </option>
            ))}
          </select>

          {/* Type de frais */}
          <div>
            <select
              value={selectedTypeFees}
              onChange={(e) => setSelectedTypeFees(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3"
            >
              <option value="">Tous les frais</option>

              {typeFees.map((type) => (
                <option key={type} value={type}>
                  {type === "Frais d'inscription"
                    ? "Frais d'inscription"
                    : "Frais scolaires"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end items-center gap-3">
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 transition-all duration-200"
          >
            <RefreshCcw size={18} />
            Réinitialiser
          </button>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-900 hover:bg-red-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <FileText size={18} />
            Exporter PDF
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sky-900 text-white">
            <tr>
              <th className="w-16 px-4 py-4 text-center font-semibold">N°</th>

              <th className="px-5 py-4 text-left font-semibold">Élève</th>

              <th className="px-4 py-4 text-center font-semibold">Classe</th>

              <th className="px-4 py-4 text-center font-semibold">
                Cycle / Section
              </th>

              <th className="px-4 py-4 text-center font-semibold">Année</th>

              <th className="px-4 py-4 text-center font-semibold">Reçu</th>

              <th className="px-4 py-4 text-right font-semibold">Montant</th>

              <th className="px-4 py-4 text-center font-semibold">Paiement</th>

              <th className="px-4 py-4 text-center font-semibold">Type</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-8">
                  Chargement...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-red-600">
                  {error}
                </td>
              </tr>
            ) : filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-500">
                  Aucun paiement trouvé.
                </td>
              </tr>
            ) : (
              paginatedPayments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-sky-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <td className="text-center font-semibold text-gray-500">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  {/* Elève */}
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {payment?.registerId?.studentId?.nom}{" "}
                        {payment?.registerId?.studentId?.postnom}
                      </p>

                      <p className="text-xs text-gray-500">
                        {payment?.registerId?.studentId?.prenom}
                      </p>

                      <p className="text-xs text-sky-700 font-medium">
                        {payment?.registerId?.studentId?.matricule}
                      </p>
                    </div>
                  </td>

                  {/* Classe */}
                  <td className="text-center">
                    {payment?.registerId?.classroomId?.name}
                  </td>

                  {/* Cycle */}
                  <td className="text-center">
                    <div>
                      <p>{payment?.registerId?.cycleId?.name}</p>

                      <p className="text-xs text-gray-500">
                        {payment?.registerId?.sectionId?.name || "-"}
                      </p>
                    </div>
                  </td>

                  {/* Année */}
                  <td className="text-center">
                    {payment?.registerId?.yearId?.year}
                  </td>

                  {/* Reçu */}
                  <td className="text-center">
                    <span className="font-mono text-sky-700 font-semibold">
                      {payment?.paymentNumber}
                    </span>
                  </td>

                  {/* Montant */}
                  <td className="text-right pr-6">
                    <span className="font-bold text-green-600 text-base">
                      {Number(payment?.amountPaid).toLocaleString("fr-FR")} $
                    </span>
                  </td>

                  {/* Mode */}
                  <td className="text-center">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      {payment?.paymentMode || "Espèces"}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment?.typeFee === "Frais d'inscription"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {payment?.typeFee === "Frais d'inscription"
                        ? "Inscription"
                        : "Frais scolaires"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-t dark:border-gray-800 rounded-b-2xl">
        <p className="text-sm text-gray-500">
          Page {currentPage} sur {totalPages || 1}
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded-xl border text-sm transition
        ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }
      `}
          >
            Précédent
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
            px-3 py-2 rounded-xl text-sm
            ${
              currentPage === page
                ? "bg-sky-900 text-white"
                : "border hover:bg-gray-100 dark:hover:bg-gray-800"
            }
          `}
              >
                {page}
              </button>
            ),
          )}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-xl border text-sm transition
        ${
          currentPage === totalPages || totalPages === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }
      `}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCurrentPaid;

/* ================= CARD ================= */
const Card = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-4">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
  </div>
);
