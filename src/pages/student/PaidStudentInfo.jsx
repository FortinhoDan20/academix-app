import React, { useState } from "react";

const PaidStudentInfo = ({ payments = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(payments.length / itemsPerPage);

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b border-gray-100 dark:border-gray-800">

          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              💰 Historique des paiements
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tous les paiements effectués par l'élève.
            </p>
          </div>

          <div className="bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-xl shadow-sm">
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
              {payments.length} paiement(s)
            </span>
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>
              <tr className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white">

                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Type de frais</th>
                <th className="px-6 py-4 text-right">Montant</th>
                <th className="px-6 py-4 text-center">Statut</th>

              </tr>
            </thead>

            <tbody>

              {currentItems.length > 0 ? (
                currentItems.map((p, index) => (
                  <tr
                    key={index}
                    className={`
                      transition-all duration-300
                      hover:bg-emerald-50 dark:hover:bg-slate-800
                      ${
                        index % 2 === 0
                          ? "bg-white dark:bg-gray-900"
                          : "bg-gray-50/60 dark:bg-gray-800/40"
                      }
                    `}
                  >

                    <td className="px-6 py-4 text-gray-400 font-semibold">
                      {indexOfFirstItem + index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-200">
                      {p.date}
                    </td>

                    <td className="px-6 py-4">{p.type}</td>

                    <td className="px-6 py-4 text-right font-bold text-emerald-700 dark:text-emerald-400">
                      {p.amount} $
                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`
                          inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold shadow-md
                          ${
                            p.status === "Payé"
                              ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
                              : "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
                          }
                        `}
                      >
                        {p.status}
                      </span>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    Aucun paiement disponible.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        {payments.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50 dark:bg-gray-900">

            <p className="text-sm text-gray-500">
              Affichage {indexOfFirstItem + 1} -{" "}
              {Math.min(indexOfLastItem, payments.length)} sur{" "}
              {payments.length}
            </p>

            <div className="flex items-center gap-2">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-emerald-700 hover:text-white transition"
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
                        ? "bg-emerald-700 text-white"
                        : "border hover:bg-emerald-100"
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-emerald-700 hover:text-white transition"
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

export default PaidStudentInfo;