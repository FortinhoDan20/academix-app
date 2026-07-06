import React, { useState } from "react";
import { FileText } from "lucide-react";
import { Download } from "lucide-react";

const FolderStudent = ({ documents = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentDocs = documents.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(documents.length / itemsPerPage);

  return (
    <div className="px-6 pb-8">
      <div className="rounded-3xl bg-white dark:bg-gray-900 border shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-5 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              📁 Dossier scolaire
            </h2>

            <p className="text-sm text-gray-500">
              Liste des documents de l'élève
            </p>
          </div>

          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            {documents.length} document(s)
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 grid md:grid-cols-3 gap-4">
          {currentDocs.length === 0 ? (
            <p className="text-center text-gray-500 col-span-3">
              Aucun document disponible
            </p>
          ) : (
            currentDocs.map((doc, i) => (
              <div
                key={i}
                className="
                  flex items-center gap-3
                  p-4 rounded-xl
                  border
                  bg-white dark:bg-gray-800
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >

                <div
                  className="
                        flex items-center justify-between
                        p-4 rounded-2xl
                        border border-gray-100 dark:border-gray-700
                        bg-white dark:bg-gray-800

                        shadow-sm
                        hover:shadow-md
                        hover:-translate-y-1

                        transition-all duration-300
                    "
                >
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        p-3 rounded-xl
                        bg-blue-100 dark:bg-blue-900/30
                        text-blue-900 dark:text-blue-300
                    "
                    >
                      <FileText size={20} />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {doc.name}
                      </p>

                      <p className="text-xs text-gray-500">{doc.type}</p>
                    </div>
                  </div>

                </div>
                  {/* RIGHT BUTTON */}
                  <a
                    href={doc.url}
                    download
                    className="
                        flex items-center gap-2

                        px-2 py-2
                        rounded-xl

                        bg-blue-900 text-white
                        hover:bg-blue-800

                        shadow-md
                        hover:shadow-lg

                        transition-all duration-300
                    "
                  >
                    <Download size={10} />
                    Télécharger
                  </a>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {documents.length > itemsPerPage && (
          <div className="flex justify-between items-center px-6 py-4 border-t">
            <p className="text-sm text-gray-500">
              {indexOfFirst + 1} - {Math.min(indexOfLast, documents.length)} sur{" "}
              {documents.length}
            </p>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-40"
              >
                Prev
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderStudent;
