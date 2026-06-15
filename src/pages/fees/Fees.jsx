import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronsUpDown,
  DollarSign,
  Search,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  BadgeDollarSign,
  CalendarDays,
  GraduationCap,
  AlertCircle,
} from "lucide-react";

import { Listbox } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { getAllFees } from "../../features/fees/feesSlice";

const sortFieldOptions = [
  { value: "year", label: "Année Scolaire" },
  { value: "amount", label: "Montant" },
  { value: "cycle", label: "Cycle" },
];

const ITEMS_PER_PAGE = 5;

const Fees = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(sortFieldOptions[0]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const { allFees, loading } = useSelector(
    (state) => state.fees
  );

  /*
  |--------------------------------------------------------------------------
  | FETCH DATA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(getAllFees());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | FILTER + SORT
  |--------------------------------------------------------------------------
  */

  const filteredFees = useMemo(() => {
    let data = [...allFees];

    // SEARCH
    data = data.filter((f) =>
      f.cycleId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      f.feeType
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      f.yearId?.year
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    // SORT
    data.sort((a, b) => {
      let first;
      let second;

      switch (sortField.value) {
        case "cycle":
          first = a.cycleId?.name || "";
          second = b.cycleId?.name || "";
          break;

        case "amount":
          first = a.total || 0;
          second = b.total || 0;
          break;

        case "createdAt":
          first = new Date(a.createdAt);
          second = new Date(b.createdAt);
          break;

        default:
          first = a.createdAt;
          second = b.createdAt;
      }

      if (typeof first === "string") {
        first = first.toLowerCase();
        second = second.toLowerCase();
      }

      return sortOrder === "asc"
        ? first > second
          ? 1
          : -1
        : first < second
        ? 1
        : -1;
    });

    return data;
  }, [allFees, search, sortField, sortOrder]);

  /*
  |--------------------------------------------------------------------------
  | PAGINATION
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.ceil(
    filteredFees.length / ITEMS_PER_PAGE
  );

  const paginatedFees = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return filteredFees.slice(start, end);
  }, [filteredFees, currentPage]);

  /*
  |--------------------------------------------------------------------------
  | RESET PAGE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortField, sortOrder]);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="
              w-16
              h-16
              border-4
              border-sky-200
              border-t-sky-900
              rounded-full
              mx-auto
            "
          />

          <h2 className="mt-5 text-lg font-semibold text-gray-700 dark:text-white">
            Chargement des frais...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">

            <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
              <DollarSign className="w-6 h-6" />
            </div>

            Gestion des frais scolaires
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Gestion complète des frais académiques
          </p>
        </div>

        <button
          onClick={() => navigate("/add-fees")}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-sky-900
            hover:bg-sky-800
            text-white
            px-5
            py-3
            rounded-xl
            shadow-md
            transition
          "
        >
          <DollarSign className="w-5 h-5" />
          Nouveau frais
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* TOTAL */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total des frais
              </p>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {allFees.length}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
              <BadgeDollarSign className="w-6 h-6" />
            </div>

          </div>

        </div>

        {/* EFFECTIF */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Frais affichés
              </p>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {paginatedFees.length}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-green-100 text-green-700">
              <GraduationCap className="w-6 h-6" />
            </div>

          </div>

        </div>

        {/* YEAR */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pagination
              </p>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                {currentPage}/{totalPages || 1}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-purple-100 text-purple-700">
              <CalendarDays className="w-6 h-6" />
            </div>

          </div>

        </div>

      </div>

      {/* FILTER */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">

        <div className="flex flex-col xl:flex-row xl:items-center gap-4">

          {/* SEARCH */}
          <div className="relative w-full xl:w-96">

            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Rechercher un frais..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-10
                pr-4
                py-3
                border
                rounded-xl
                bg-gray-50
                dark:bg-gray-700
                dark:text-white
                focus:ring-2
                focus:ring-sky-500
                outline-none
              "
            />
          </div>

          {/* SORT */}
          <div className="w-full xl:w-64">

            <Listbox value={sortField} onChange={setSortField}>

              <div className="relative">

                <Listbox.Button
                  className="
                    w-full
                    flex
                    justify-between
                    items-center
                    px-4
                    py-3
                    border
                    rounded-xl
                    bg-gray-50
                    dark:bg-gray-700
                    dark:text-white
                  "
                >
                  {sortField.label}

                  <ChevronsUpDown className="w-4 h-4" />
                </Listbox.Button>

                <Listbox.Options
                  className="
                    absolute
                    z-50
                    mt-2
                    w-full
                    bg-white
                    dark:bg-gray-700
                    rounded-xl
                    shadow-xl
                    overflow-hidden
                  "
                >
                  {sortFieldOptions.map((opt) => (
                    <Listbox.Option
                      key={opt.value}
                      value={opt}
                      className="
                        px-4
                        py-3
                        cursor-pointer
                        hover:bg-gray-100
                        dark:hover:bg-gray-600
                      "
                    >
                      {opt.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>

              </div>

            </Listbox>

          </div>

          {/* ORDER */}
          <button
            type="button"
            onClick={() =>
              setSortOrder(
                sortOrder === "asc" ? "desc" : "asc"
              )
            }
            className="
              px-5
              py-3
              border
              rounded-xl
              bg-gray-100
              dark:bg-gray-700
              dark:text-white
              hover:scale-105
              transition
            "
          >
            {sortOrder === "asc"
              ? "⬆️ Asc"
              : "⬇️ Desc"}
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px] text-sm">

            <thead className="bg-sky-900 text-white uppercase text-xs">

              <tr>

                <th className="px-6 py-4 text-left">
                  #
                </th>

                <th className="px-6 py-4 text-left">
                  Cycle
                </th>

                <th className="px-6 py-4 text-left">
                  Année scolaire
                </th>

                <th className="px-6 py-4 text-left">
                  Type
                </th>

                <th className="px-6 py-4 text-right">
                  Total
                </th>

                <th className="px-6 py-4 text-center">
                  Statut
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {paginatedFees.length > 0 ? (
                paginatedFees.map((f, index) => (

                  <motion.tr
                    key={f._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="
                      border-b
                      dark:border-gray-700
                      hover:bg-sky-50
                      dark:hover:bg-gray-700/40
                      transition
                    "
                  >

                    <td className="px-6 py-4">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">
                      {f.cycleId?.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {f.yearId?.year}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className="
                          inline-flex
                          items-center
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          bg-blue-100
                          text-blue-700
                        "
                      >
                        {f.feeType}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-right">

                      <span className="font-bold text-green-600 text-base">
                        ${f.total}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className="
                          inline-flex
                          items-center
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          bg-emerald-100
                          text-emerald-700
                        "
                      >
                        Actif
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center justify-center gap-2">

                        <button
                          className="
                            p-2
                            rounded-lg
                            text-emerald-600
                            hover:bg-emerald-100
                            transition
                          "
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          className="
                            p-2
                            rounded-lg
                            text-blue-600
                            hover:bg-blue-100
                            transition
                          "
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          className="
                            p-2
                            rounded-lg
                            text-red-600
                            hover:bg-red-100
                            transition
                          "
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>

                    </td>

                  </motion.tr>
                ))
              ) : (
                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="p-4 rounded-full bg-red-100 text-red-600">
                        <AlertCircle className="w-8 h-8" />
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
                        Aucun frais trouvé
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Aucun résultat disponible
                      </p>

                    </div>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-4
              px-6
              py-5
              border-t
              dark:border-gray-700
              bg-gray-50
              dark:bg-gray-800
            "
          >

            {/* LEFT */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Affichage de{" "}
              <span className="font-bold text-sky-700">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              à{" "}
              <span className="font-bold text-sky-700">
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredFees.length
                )}
              </span>{" "}
              sur{" "}
              <span className="font-bold">
                {filteredFees.length}
              </span>{" "}
              frais
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">

              {/* PREV */}
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
                className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-xl
                  border
                  bg-white
                  dark:bg-gray-700
                  dark:text-white
                  hover:bg-sky-50
                  transition
                  disabled:opacity-40
                "
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* NUMBERS */}
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`
                      w-10
                      h-10
                      rounded-xl
                      font-semibold
                      transition

                      ${
                        currentPage === page
                          ? "bg-sky-900 text-white shadow-md"
                          : "bg-white dark:bg-gray-700 dark:text-white hover:bg-sky-50"
                      }
                    `}
                  >
                    {page}
                  </button>
                );
              })}

              {/* NEXT */}
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
                className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-xl
                  border
                  bg-white
                  dark:bg-gray-700
                  dark:text-white
                  hover:bg-sky-50
                  transition
                  disabled:opacity-40
                "
              >
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Fees;