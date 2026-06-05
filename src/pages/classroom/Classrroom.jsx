import React, { useEffect, useMemo, useState } from "react";
import {
  School,
  Plus,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClassrooms } from "../../features/classroom/classroomSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;

const Classrroom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { classrooms, loading } = useSelector(
    (state) => state.classroom
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllClassrooms());
  }, [dispatch]);

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(
    (classrooms?.length || 0) / ITEMS_PER_PAGE
  );

  const data = useMemo(() => {
    if (!classrooms) return [];

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return classrooms.slice(start, start + ITEMS_PER_PAGE);
  }, [classrooms, currentPage]);

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-14 h-14 border-4 border-blue-300 border-t-blue-900 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <School className="text-blue-600" />
          Gestion des classes
        </h1>

        <button
          onClick={() => navigate("/add-classroom")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      {/* TABLE CONTAINER ERP */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border overflow-hidden">

        {/* SCROLL AREA */}
        <div className="overflow-auto max-h-[70vh]">

          <table className="w-full min-w-[1000px] text-sm">

            {/* HEADER STICKY */}
            <thead className="bg-blue-900 text-white uppercase text-xs sticky top-0 z-10">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Classe</th>
                <th className="p-4 text-left">Cycle</th>
                <th className="p-4 text-left">Section</th>
                <th className="p-4 text-left">Option</th>
                <th className="p-4 text-left">maximum de place</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {data.length > 0 ? (
                
                data.map((c, i) => (
                  <tr
                    key={c._id}
                    className="
                      border-b
                      dark:border-gray-700
                      hover:bg-blue-50
                      dark:hover:bg-gray-800
                      transition
                      odd:bg-gray-50
                      dark:odd:bg-gray-950
                    "
                  >

                    {/* INDEX */}
                    <td className="p-4 font-medium text-gray-600">
                      {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                    </td>

                    {/* CLASS NAME */}
                    <td className="p-4 font-semibold text-gray-800 dark:text-white">
                      {c.name}
                    </td>

                    {/* CYCLE */}
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs rounded-full  text-blue-700">
                        {c.cycleId?.name || "-"}
                      </span>
                    </td>

                    {/* SECTION */}
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {c.sectionId?.name || "-"}
                      </span>
                    </td>

                    {/* OPTION */}
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                        {c.optionId?.name || "-"}
                      </span>
                    </td>

                    {/* Nombre de classe */}
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                        {c.nombrePlace}
                      </span>
                    </td>


                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex justify-center gap-2">

                        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                          <Eye size={16} />
                        </button>

                        <button className="p-2 rounded-md hover:bg-blue-200 text-blue-600">
                          <Pencil size={16} />
                        </button>

                        <button className="p-2 rounded-md hover:bg-red-200 text-red-600">
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Aucune classe disponible
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

        {/* PAGINATION ERP STYLE */}
        <div className="flex items-center justify-between p-4 border-t dark:border-gray-700">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="flex items-center gap-2 px-3 py-2 border rounded disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Précédent
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-md text-sm ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex items-center gap-2 px-3 py-2 border rounded disabled:opacity-40"
          >
            Suivant
            <ChevronRight size={16} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default Classrroom;