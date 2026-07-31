import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  DollarSign,
  RefreshCcw,
  FileText,
  Wallet,
  AlertCircle,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { getAllCurrentPaid } from "../../features/payment/paymentSlice";
import { useSelector } from "react-redux";
import PageLoader from "./PageLoader";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const ListCurrentPaid = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCycle, setSelectedCycle] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTypeFees, setSelectedTypeFees] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [exportingPDF, setExportingPDF] = useState(false);
  const {
    paymentList = [],
    loading,
    error,
  } = useSelector((state) => state.payment);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleExportPDF = async () => {
    try {
      setExportingPDF(true);

      const doc = new jsPDF("l", "mm", "a4");

      const today = new Date();

      // ==========================
      // FILTRES ACTIFS
      // ==========================

      const filters = {
        "Année scolaire": selectedYear,
        Cycle: selectedCycle,
        Section: selectedSection,
        Option: selectedOption,
        Classe: selectedClass,
        "Type de frais":
          selectedTypeFees === "inscription"
            ? "Frais d'inscription"
            : selectedTypeFees === "scolarite"
              ? "Frais scolaires"
              : selectedTypeFees,
      };

      const activeFilters = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key} : ${value}`);

      // ==========================
      // TITRE
      // ==========================

      doc.setFontSize(18);
      doc.setTextColor(15, 23, 42);

      doc.text("RAPPORT DES PAIEMENTS SCOLAIRES", 148, 18, {
        align: "center",
      });

      let tableStartY = 35;

      // ==========================
      // AFFICHAGE DES FILTRES
      // ==========================

      if (activeFilters.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);

        doc.text("FILTRES APPLIQUÉS", 14, 30);

        doc.setFontSize(10);
        doc.setTextColor(70);

        activeFilters.forEach((filter, index) => {
          doc.text(`• ${filter}`, 20, 38 + index * 6);
        });

        tableStartY = 45 + activeFilters.length * 6;
      }

      // ==========================
      // INFORMATIONS RAPPORT
      // ==========================

      doc.setFontSize(10);
      doc.setTextColor(100);

      doc.text(`Date : ${today.toLocaleDateString("fr-FR")}`, 14, tableStartY);

      doc.text(
        `Nombre de paiements : ${filteredPayments.length}`,
        14,
        tableStartY + 6,
      );

      // ==========================
      // DONNEES TABLEAU
      // ==========================

      const body = filteredPayments.map((p, index) => [
        index + 1,

        p?.registerId?.studentId?.nom || "",

        p?.registerId?.studentId?.postnom || "",

        p?.registerId?.studentId?.prenom || "",

        p?.paymentNumber || "-",

        `${Number(p?.amountPaid || 0).toLocaleString("fr-FR")} $`,
      ]);

      // ==========================
      // CREATION TABLEAU PDF
      // ==========================

      autoTable(doc, {
        startY: tableStartY + 15,

        head: [["N°", "Nom", "Postnom", "Prénom", "Reçu", "Montant payé"]],

        body,

        theme: "grid",

        styles: {
          fontSize: 9,
          valign: "middle",
        },

        headStyles: {
          fillColor: [15, 23, 42],
          textColor: 255,
          halign: "center",
          fontStyle: "bold",
        },

        columnStyles: {
          0: {
            halign: "center",
            cellWidth: 15,
          },

          4: {
            halign: "center",
          },

          5: {
            halign: "right",
          },
        },
      });

      // ==========================
      // AFFICHER PDF NAVIGATEUR
      // ==========================

      const pdfBlob = doc.output("blob");

      const pdfUrl = URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Erreur génération PDF", error);
    } finally {
      setExportingPDF(false);
    }
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

  if (loading) {
    return <PageLoader />;
  }

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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Montant encaissé */}
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-900 border border-green-100 dark:border-green-800/40 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-28 h-28 bg-green-100 dark:bg-green-800/20 rounded-full blur-3xl"></div>

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Montant encaissé
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {stats.totalPaid.toLocaleString("fr-FR")} $
              </h3>

              <p className="mt-2 text-sm text-green-700 dark:text-green-400 font-medium">
                Total déjà perçu
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg shadow-green-500/20">
              <Wallet size={26} />
            </div>
          </div>
        </div>

        {/* Reste à encaisser */}
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-900 border border-red-100 dark:border-red-800/40 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-28 h-28 bg-red-100 dark:bg-red-800/20 rounded-full blur-3xl"></div>

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Reste à encaisser
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {stats.totalRemaining.toLocaleString("fr-FR")} $
              </h3>

              <p className="mt-2 text-sm text-red-700 dark:text-red-400 font-medium">
                Montant restant
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
              <AlertCircle size={26} />
            </div>
          </div>
        </div>

        {/* Élèves en règle */}
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 to-white dark:from-sky-900/20 dark:to-gray-900 border border-sky-100 dark:border-sky-800/40 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-28 h-28 bg-sky-100 dark:bg-sky-800/20 rounded-full blur-3xl"></div>

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Élèves en règle
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {stats.paidStudents}
                <span className="text-lg font-semibold text-gray-400">
                  /{stats.totalStudents}
                </span>
              </h3>

              <p className="mt-2 text-sm text-sky-700 dark:text-sky-400 font-medium">
                {stats.unpaidStudents} élève(s) restant(s)
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
              <UserCheck size={26} />
            </div>
          </div>
        </div>

        {/* Taux de recouvrement */}
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-900 border border-amber-100 dark:border-amber-800/40 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-28 h-28 bg-amber-100 dark:bg-amber-800/20 rounded-full blur-3xl"></div>

          <div className="relative flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Taux de recouvrement
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {stats.recoveryRate}%
              </h3>

              {/* Barre de progression */}
              <div className="mt-4 h-2.5 w-full rounded-full bg-amber-100 dark:bg-amber-900/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                  style={{ width: `${stats.recoveryRate}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-amber-700 dark:text-amber-400 font-medium">
                Progression des paiements
              </p>
            </div>

            <div className="ml-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
              <TrendingUp size={26} />
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600"></div>

        <div className="p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-5">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center shadow-sm">
                <Filter size={20} className="text-sky-700 dark:text-sky-400" />
              </div>

              <div>
                <div className="inline-flex items-center rounded-full bg-sky-50 dark:bg-sky-900/20 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300 mb-1">
                  Recherche avancée
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Filtres des paiements
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
                  Sélectionnez un ou plusieurs critères pour afficher uniquement
                  les paiements correspondants.
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-xs text-gray-600 dark:text-gray-300">
              <Search size={14} />
              <span>Filtrage instantané</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Année scolaire
              </label>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              >
                <option value="">Toutes les années</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Cycle
              </label>

              <select
                value={selectedCycle}
                onChange={(e) => setSelectedCycle(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              >
                <option value="">Tous les cycles</option>
                {cycles.map((cycle) => (
                  <option key={cycle} value={cycle}>
                    {cycle}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Section
              </label>

              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              >
                <option value="">Toutes les sections</option>
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Option
              </label>

              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              >
                <option value="">Toutes les options</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Classe
              </label>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              >
                <option value="">Toutes les classes</option>
                {classes.map((classe) => (
                  <option key={classe} value={classe}>
                    {classe}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Type de frais
              </label>

              <select
                value={selectedTypeFees}
                onChange={(e) => setSelectedTypeFees(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
              >
                <option value="">Tous les frais</option>

                {typeFees.map((type) => (
                  <option key={type} value={type}>
                    {type === "inscription"
                      ? "Frais d'inscription"
                      : "Frais scolaires"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 px-3 py-2 border border-gray-100 dark:border-gray-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">
                  <Search size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                    Filtrage intelligent
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mise à jour automatique des résultats.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 shadow-sm hover:bg-red-50"
                >
                  <RefreshCcw size={16} />
                  Réinitialiser
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={exportingPDF}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all
    ${
      exportingPDF
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-sky-900 via-blue-800 to-indigo-800 hover:from-sky-800 hover:via-blue-700 hover:to-indigo-700"
    }
  `}
                >
                  <FileText size={16} />
                  Exporter le rapport PDF
                </button>
              </div>
            </div>
          </div>
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

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {error ? (
              <tr>
                <td colSpan={9} className="py-16 text-center">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    <span className="text-lg">⚠️</span>
                    <span className="font-medium">{error}</span>
                  </div>
                </td>
              </tr>
            ) : filteredPayments.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400">
                    <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl">
                      📭
                    </div>
                    <p className="font-medium">Aucun paiement trouvé</p>
                    <p className="text-sm">
                      Modifiez les filtres ou vérifiez les données disponibles.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedPayments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-sky-50/60 dark:hover:bg-gray-800/60 transition-colors duration-200"
                >
                  {/* Numéro */}
                  <td className="px-3 py-4 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>

                  {/* Élève */}
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-900 dark:text-white leading-tight">
                        {payment?.registerId?.studentId?.nom}{" "}
                        {payment?.registerId?.studentId?.postnom}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {payment?.registerId?.studentId?.prenom}
                      </p>

                      <span className="mt-1 inline-flex w-fit rounded-lg bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                        {payment?.registerId?.studentId?.matricule}
                      </span>
                    </div>
                  </td>

                  {/* Classe */}
                  <td className="px-4 py-4 text-center font-medium text-gray-700 dark:text-gray-200">
                    {payment?.registerId?.classroomId?.name || "-"}
                  </td>

                  {/* Cycle / Section */}
                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {payment?.registerId?.cycleId?.name || "-"}
                      </span>

                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {payment?.registerId?.sectionId?.name ||
                          "Aucune section"}
                      </span>
                    </div>
                  </td>

                  {/* Année */}
                  <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">
                    {payment?.registerId?.yearId?.year || "-"}
                  </td>

                  {/* Reçu */}
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex rounded-lg bg-gray-100 px-3 py-1 font-mono text-xs font-semibold text-sky-700 dark:bg-gray-800 dark:text-sky-300">
                      {payment?.paymentNumber || "-"}
                    </span>
                  </td>

                  {/* Montant */}
                  <td className="px-4 py-4 text-right">
                    <span className="text-base font-bold text-green-600 dark:text-green-400">
                      {Number(payment?.amountPaid || 0).toLocaleString("fr-FR")}{" "}
                      $
                    </span>
                  </td>

                  {/* Mode de paiement */}
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {payment?.paymentMode || "Espèces"}
                    </span>
                  </td>

                  {/* Type de frais */}
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        payment?.typeFee === "inscription"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      }`}
                    >
                      {payment?.typeFee === "inscription"
                        ? "Frais d'inscription"
                        : "Frais scolaires"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-6 py-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 rounded-b-2xl shadow-sm">
        {/* Infos pagination */}
        <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Page {currentPage} sur {totalPages || 1}
          </span>

          <span>
            Affichage de {paginatedPayments.length} paiement(s) sur{" "}
            {filteredPayments.length}
          </span>
        </div>

        {/* Boutons pagination */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* Précédent */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-700 text-gray-400"
                : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm"
            }`}
          >
            <span>←</span>
            <span className="hidden sm:inline">Précédent</span>
          </button>

          {/* Numéros de pages */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[40px] h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? "bg-sky-900 text-white shadow-lg shadow-sky-900/20 scale-105"
                      : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          {/* Suivant */}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
              currentPage === totalPages || totalPages === 0
                ? "opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-700 text-gray-400"
                : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm"
            }`}
          >
            <span className="hidden sm:inline">Suivant</span>
            <span>→</span>
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
