import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  School,
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Layers3,
  ChevronsUpDown,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { getAllSection } from "../../features/section/sectionSlice";

const sortOptions = [
  { value: "createdAt", label: "Date de création" },
  { value: "name", label: "Nom de la section" },
];

const ITEMS_PER_PAGE = 5;

const Section = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(sortOptions[0]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const { sections, loading, error } = useSelector(
    (state) => state.section
  );

  useEffect(() => {
    dispatch(getAllSection());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | FILTER + SORT
  |--------------------------------------------------------------------------
  */

  const filteredSections = useMemo(() => {
    if (!sections) return [];

    let data = [...sections];

    // SEARCH
    data = data.filter(
      (s) =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.cycleId?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    // SORT
    data.sort((a, b) => {
      const field = sortField.value;

      let first = a[field];
      let second = b[field];

      if (typeof first === "string") {
        first = first.toLowerCase();
        second = second.toLowerCase();
      }

      if (sortOrder === "asc") {
        return first > second ? 1 : -1;
      } else {
        return first < second ? 1 : -1;
      }
    });

    return data;
  }, [sections, search, sortField, sortOrder]);

  /*
  |--------------------------------------------------------------------------
  | PAGINATION
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.ceil(
    filteredSections.length / ITEMS_PER_PAGE
  );

  const paginatedSections = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return filteredSections.slice(start, end);
  }, [filteredSections, currentPage]);

  /*
  |--------------------------------------------------------------------------
  | RESET PAGE WHEN SEARCH
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="
              mt-5
              text-xl
              font-bold
              text-gray-700
              dark:text-white
            "
          >
            Chargement des sections...
          </motion.h2>

          <p className="text-sm text-gray-500 mt-2">
            Veuillez patienter
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <div className="flex items-center gap-3">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-sky-500
                to-sky-800
                text-white
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <Layers3 className="w-7 h-7" />
            </div>

            <div>

              <h1 className="text-3xl font-black text-gray-800 dark:text-white">
                Gestion des sections
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Gérez toutes les sections scolaires
              </p>

            </div>

          </div>

        </div>

        <button
          onClick={() => navigate("/add-section")}
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
            rounded-2xl
            shadow-lg
            transition-all
            hover:scale-[1.02]
            active:scale-[0.98]
          "
        >
          <Plus className="w-5 h-5" />
          Nouvelle section
        </button>

      </div>

      {/* ========================================================= */}
      {/* STATS */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div
          className="
            bg-white
            dark:bg-gray-900
            border
            border-gray-100
            dark:border-gray-800
            rounded-3xl
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total sections
              </p>

              <h2 className="text-3xl font-black text-gray-800 dark:text-white mt-2">
                {sections?.length || 0}
              </h2>

            </div>

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-blue-100
                text-blue-700
                flex
                items-center
                justify-center
              "
            >
              <School className="w-6 h-6" />
            </div>

          </div>
        </div>

        <div
          className="
            bg-white
            dark:bg-gray-900
            border
            border-gray-100
            dark:border-gray-800
            rounded-3xl
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Résultats trouvés
              </p>

              <h2 className="text-3xl font-black text-gray-800 dark:text-white mt-2">
                {filteredSections.length}
              </h2>

            </div>

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-emerald-100
                text-emerald-700
                flex
                items-center
                justify-center
              "
            >
              <Filter className="w-6 h-6" />
            </div>

          </div>
        </div>

        <div
          className="
            bg-white
            dark:bg-gray-900
            border
            border-gray-100
            dark:border-gray-800
            rounded-3xl
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Pagination
              </p>

              <h2 className="text-3xl font-black text-gray-800 dark:text-white mt-2">
                {ITEMS_PER_PAGE}
              </h2>

            </div>

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-purple-100
                text-purple-700
                flex
                items-center
                justify-center
              "
            >
              <ArrowUpDown className="w-6 h-6" />
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* ERROR */}
      {/* ========================================================= */}

      {error && (
        <div
          className="
            bg-red-50
            border
            border-red-200
            text-red-700
            px-5
            py-4
            rounded-2xl
            font-medium
          "
        >
          {error}
        </div>
      )}

      {/* ========================================================= */}
      {/* FILTER BAR */}
      {/* ========================================================= */}

      <div
        className="
          bg-white
          dark:bg-gray-900
          border
          border-gray-100
          dark:border-gray-800
          rounded-3xl
          p-5
          shadow-sm
        "
      >

        <div className="flex flex-col xl:flex-row gap-4 xl:items-center">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Rechercher une section..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-12
                pl-12
                pr-4
                rounded-2xl
                border
                border-gray-200
                dark:border-gray-700
                bg-gray-50
                dark:bg-gray-800
                dark:text-white
                focus:ring-2
                focus:ring-sky-500
                outline-none
                transition
              "
            />

          </div>

          {/* SORT FIELD */}

          <div className="w-full xl:w-64">

            <Listbox value={sortField} onChange={setSortField}>

              <div className="relative">

                <Listbox.Button
                  className="
                    w-full
                    h-12
                    flex
                    items-center
                    justify-between
                    px-4
                    rounded-2xl
                    border
                    border-gray-200
                    dark:border-gray-700
                    bg-gray-50
                    dark:bg-gray-800
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
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    dark:bg-gray-800
                    border
                    border-gray-100
                    dark:border-gray-700
                    shadow-xl
                  "
                >
                  {sortOptions.map((opt) => (
                    <Listbox.Option
                      key={opt.value}
                      value={opt}
                      className="
                        px-4
                        py-3
                        cursor-pointer
                        hover:bg-sky-50
                        dark:hover:bg-gray-700
                      "
                    >
                      {opt.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>

              </div>

            </Listbox>

          </div>

          {/* SORT ORDER */}

          <button
            onClick={() =>
              setSortOrder(
                sortOrder === "asc" ? "desc" : "asc"
              )
            }
            className="
              h-12
              px-5
              rounded-2xl
              border
              border-gray-200
              dark:border-gray-700
              bg-gray-50
              dark:bg-gray-800
              dark:text-white
              font-medium
              hover:bg-sky-50
              dark:hover:bg-gray-700
              transition
            "
          >
            {sortOrder === "asc"
              ? "⬆ Croissant"
              : "⬇ Décroissant"}
          </button>

        </div>

      </div>

      {/* ========================================================= */}
      {/* TABLE */}
      {/* ========================================================= */}

      <div
        className="
          bg-white
          dark:bg-gray-900
          border
          border-gray-100
          dark:border-gray-800
          rounded-3xl
          shadow-sm
          overflow-hidden
        "
      >

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead
              className="
                bg-gradient-to-r
                from-sky-900
                to-sky-800
                text-white
              "
            >
              <tr className="text-sm uppercase">

                <th className="px-6 py-5 text-left font-semibold">
                  #
                </th>

                <th className="px-6 py-5 text-left font-semibold">
                  Cycle
                </th>

                <th className="px-6 py-5 text-left font-semibold">
                  Section
                </th>

                <th className="px-6 py-5 text-center font-semibold">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {paginatedSections.length > 0 ? (

                paginatedSections.map((s, index) => (

                  <motion.tr
                    key={s._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="
                      border-b
                      border-gray-100
                      dark:border-gray-800
                      hover:bg-sky-50/70
                      dark:hover:bg-gray-800
                      transition
                    "
                  >

                    <td className="px-6 py-5 font-medium text-gray-600 dark:text-gray-300">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className="
                          inline-flex
                          items-center
                          px-3
                          py-1
                          rounded-full
                          bg-blue-100
                          text-blue-700
                          text-xs
                          font-bold
                        "
                      >
                        {s.cycleId?.name}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <div className="font-semibold text-gray-800 dark:text-white">
                        {s.name}
                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-center gap-3">

                        <button
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-emerald-100
                            text-emerald-700
                            flex
                            items-center
                            justify-center
                            hover:scale-105
                            transition
                          "
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-red-100
                            text-red-700
                            flex
                            items-center
                            justify-center
                            hover:scale-105
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

                  <td colSpan="4" className="px-6 py-16">

                    <div className="flex flex-col items-center justify-center text-center">

                      <div
                        className="
                          w-20
                          h-20
                          rounded-full
                          bg-red-100
                          text-red-600
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <School className="w-10 h-10" />
                      </div>

                      <h2 className="mt-5 text-xl font-bold text-gray-700 dark:text-white">
                        Aucune section trouvée
                      </h2>

                      <p className="text-sm text-gray-500 mt-2">
                        Aucun résultat correspond à votre recherche.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ========================================================= */}
        {/* PAGINATION */}
        {/* ========================================================= */}

        {totalPages > 1 && (

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-4
              px-6
              py-5
              border-t
              border-gray-100
              dark:border-gray-800
            "
          >

            <div className="text-sm text-gray-500">

              Affichage de{" "}

              <span className="font-bold text-gray-800 dark:text-white">
                {paginatedSections.length}
              </span>

              {" "}sur{" "}

              <span className="font-bold text-gray-800 dark:text-white">
                {filteredSections.length}
              </span>

              {" "}section(s)

            </div>

            <div className="flex items-center gap-2">

              {/* PREV */}

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
                className="
                  h-11
                  px-4
                  rounded-xl
                  border
                  border-gray-200
                  dark:border-gray-700
                  flex
                  items-center
                  gap-2
                  disabled:opacity-40
                  dark:text-white
                "
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </button>

              {/* PAGES */}

              {[...Array(totalPages)].map((_, i) => (

                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`
                    w-11
                    h-11
                    rounded-xl
                    text-sm
                    font-bold
                    transition-all

                    ${
                      currentPage === i + 1
                        ? "bg-sky-900 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  {i + 1}
                </button>

              ))}

              {/* NEXT */}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
                className="
                  h-11
                  px-4
                  rounded-xl
                  border
                  border-gray-200
                  dark:border-gray-700
                  flex
                  items-center
                  gap-2
                  disabled:opacity-40
                  dark:text-white
                "
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};
export default Section;