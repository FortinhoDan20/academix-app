import React, { useState } from "react";

const StudentInfo = ({ inscriptions }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = inscriptions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(inscriptions.length / itemsPerPage);

  return (
    <div className="px-6 pb-8">

      <div
        className="
          rounded-3xl
          bg-white dark:bg-gray-900
          border border-gray-100 dark:border-gray-800
          shadow-[0_12px_40px_rgba(15,23,42,0.08)]
          hover:shadow-[0_20px_55px_rgba(15,23,42,0.12)]
          transition-all duration-300
          overflow-hidden
        "
      >

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">

          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              📚 Historique des inscriptions
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Toutes les inscriptions effectuées par l'élève.
            </p>
          </div>

          <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-xl shadow-sm">
            <span className="font-semibold text-blue-900 dark:text-blue-300">
              {inscriptions.length} inscription(s)
            </span>
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg">

                <th className="px-6 py-4 w-16">N°</th>
                <th className="px-6 py-4 text-left">Année</th>
                <th className="px-6 py-4 text-left">Cycle</th>
                <th className="px-6 py-4 text-left">Section</th>
                <th className="px-6 py-4 text-left">Option</th>
                <th className="px-6 py-4 text-left">Classe</th>
                <th className="px-6 py-4 text-center">Statut</th>

              </tr>
            </thead>

            <tbody>

              {currentItems.length > 0 ? (
                currentItems.map((i, index) => (
                  <tr
                    key={index}
                    className={`
                      transition-all duration-300
                      hover:bg-blue-50 dark:hover:bg-slate-800
                      ${
                        index % 2 === 0
                          ? "bg-white dark:bg-gray-900"
                          : "bg-gray-50/60 dark:bg-gray-800/40"
                      }
                    `}
                  >

                    <td className="px-6 py-4 font-semibold text-gray-400">
                      {indexOfFirstItem + index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-200">
                      {i.year}
                    </td>

                    <td className="px-6 py-4">{i.cycle}</td>

                    <td className="px-6 py-4">{i.section}</td>

                    <td className="px-6 py-4">{i.option || "-"}</td>

                    <td className="px-6 py-4">{i.class}</td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`
                          inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold shadow-md
                          ${
                            i.status === "Active"
                              ? "bg-green-100 text-green-700 ring-1 ring-green-300"
                              : "bg-gray-100 text-gray-600 ring-1 ring-gray-300"
                          }
                        `}
                      >
                        {i.status}
                      </span>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    Aucune inscription disponible.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        {inscriptions.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50 dark:bg-gray-900">

            <p className="text-sm text-gray-500">
              Affichage {indexOfFirstItem + 1} -{" "}
              {Math.min(indexOfLastItem, inscriptions.length)} sur{" "}
              {inscriptions.length}
            </p>

            <div className="flex items-center gap-2">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-blue-900 hover:text-white transition"
              >
                Précédent
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`
                    w-10 h-10 rounded-lg transition
                    ${
                      currentPage === i + 1
                        ? "bg-blue-900 text-white"
                        : "border hover:bg-blue-100"
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-blue-900 hover:text-white transition"
              >
                Suivant
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default StudentInfo;