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
  Layers3,
  BookOpen,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { getAllOptions } from "../../features/option/optionSlice";

const sortOptions = [
  { value: "createdAt", label: "Date de création" },
  { value: "name", label: "Nom de l’option" },
];

const ITEMS_PER_PAGE = 5;

const Option = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(sortOptions[0]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const { options, loading, error } = useSelector(
    (state) => state.option
  );

  useEffect(() => {
    dispatch(getAllOptions());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | FILTER + SORT
  |--------------------------------------------------------------------------
  */

  const filteredOptions = useMemo(() => {
    if (!options) return [];

    let data = [...options];

    // SEARCH
    data = data.filter(
      (opt) =>
        opt.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        opt.section?.name
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
  }, [options, search, sortField, sortOrder]);

  /*
  |--------------------------------------------------------------------------
  | PAGINATION
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.ceil(
    filteredOptions.length / ITEMS_PER_PAGE
  );

  const paginatedOptions = useMemo(() => {
    const start =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredOptions.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredOptions, currentPage]);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
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

          <h2 className="mt-5 text-xl font-bold text-gray-700 dark:text-white">
            Chargement des options...
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Veuillez patienter
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-100 text-blue-700">
              <School className="w-6 h-6" />
            </div>

            Gestion des options
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Liste complète des options scolaires
          </p>
        </div>

        <button
          onClick={() => navigate("/add-option")}
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
            shadow-md
            transition
          "
        >
          <Plus className="w-5 h-5" />
          Nouvelle option
        </button>
      </div>

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total options
              </p>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {options?.length || 0}
              </h2>
            </div>

            <div className="p-3 rounded-2xl bg-blue-100 text-blue-700">
              <Layers3 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Résultats affichés
              </p>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {filteredOptions.length}
              </h2>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 rounded-2xl p-4">
          {error}
        </div>
      )}

      {/* ================================================= */}
      {/* FILTER BAR */}
      {/* ================================================= */}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <div className="flex flex-col xl:flex-row gap-4">
          {/* SEARCH */}

          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Rechercher une option..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                pl-10
                pr-4
                py-3
                rounded-xl
                border
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
            <Listbox
              value={sortField}
              onChange={setSortField}
            >
              <div className="relative">
                <Listbox.Button
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    rounded-xl
                    border
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
                    mt-2
                    w-full
                    rounded-xl
                    bg-white
                    dark:bg-gray-700
                    shadow-xl
                    overflow-hidden
                    z-50
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
            onClick={() =>
              setSortOrder(
                sortOrder === "asc"
                  ? "desc"
                  : "asc"
              )
            }
            className="
              px-5
              py-3
              rounded-xl
              border
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

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="bg-sky-900 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">
                  #
                </th>

                <th className="px-6 py-4 text-left">
                  Section
                </th>

                <th className="px-6 py-4 text-left">
                  Option
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedOptions.length > 0 ? (
                paginatedOptions.map(
                  (opt, index) => (
                    <motion.tr
                      key={opt._id}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        border-b
                        dark:border-gray-700
                        hover:bg-sky-50
                        dark:hover:bg-gray-700/40
                        transition
                      "
                    >
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">
                        {(currentPage - 1) *
                          ITEMS_PER_PAGE +
                          index +
                          1}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className="
                            inline-flex
                            items-center
                            px-3
                            py-1
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            
                            font-semibold
                          "
                        >
                          {opt.sectionId?.name}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">
                        {opt.name}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            className="
                              p-2
                              rounded-xl
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
                              rounded-xl
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
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-14 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="p-4 rounded-full bg-red-100 text-red-600">
                        <School className="w-8 h-8" />
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
                        Aucune option trouvée
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Aucun résultat ne correspond à
                        votre recherche.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================================================= */}
        {/* PAGINATION */}
        {/* ================================================= */}

        {totalPages > 1 && (
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
              px-6
              py-5
              border-t
              dark:border-gray-700
            "
          >
            <div className="text-sm text-gray-500">
              Affichage de{" "}
              <span className="font-semibold">
                {paginatedOptions.length}
              </span>{" "}
              élément(s)
            </div>

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
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  border
                  disabled:opacity-40
                "
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </button>

              {/* NUMBERS */}

              {[...Array(totalPages)].map(
                (_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setCurrentPage(i + 1)
                    }
                    className={`
                      w-10
                      h-10
                      rounded-xl
                      font-semibold
                      transition
                      ${
                        currentPage === i + 1
                          ? "bg-sky-900 text-white"
                          : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                      }
                    `}
                  >
                    {i + 1}
                  </button>
                )
              )}

              {/* NEXT */}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  border
                  disabled:opacity-40
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
export default Option;