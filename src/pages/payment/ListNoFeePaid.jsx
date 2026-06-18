import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import {
  AlertCircle,
  Search,
  User,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PaymentModal from "./PaymentModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { allRegistersNofeePaid } from "../../features/register/registerSlice";

const ListNoFeePaid = () => {
  const students = [
    {
      id: 1,
      matricule: "25001",
      nom: "VIHAMBA WENGESE",
      prenom: "FORTINHO",
      classe: "7ème A",
      cycle: "Humanité",
      annee: "2025-2026",
      date: "15/06/2026",
    },
    {
      id: 2,
      matricule: "25002",
      nom: "KABILA MUTOMBO",
      prenom: "Grace",
      classe: "5ème B",
      cycle: "Secondaire",
      annee: "2025-2026",
      date: "15/06/2026",
    },
    {
      id: 3,
      matricule: "25003",
      nom: "TSHIBOLA KALALA",
      prenom: "David",
      classe: "3ème A",
      cycle: "Primaire",
      annee: "2024-2025",
      date: "14/06/2026",
    },
    {
      id: 4,
      matricule: "25004",
      nom: "KASONGA",
      prenom: "Patrick",
      classe: "7ème A",
      cycle: "Humanité",
      annee: "2025-2026",
      date: "12/06/2026",
    },
    {
      id: 5,
      matricule: "25005",
      nom: "MUTOMBO",
      prenom: "Sarah",
      classe: "5ème B",
      cycle: "Secondaire",
      annee: "2024-2025",
      date: "11/06/2026",
    },
    {
      id: 6,
      matricule: "25006",
      nom: "MBUYI",
      prenom: "Christian",
      classe: "3ème A",
      cycle: "Primaire",
      annee: "2025-2026",
      date: "10/06/2026",
    },
  ];

const [search, setSearch] = useState("");
const [selectedClass, setSelectedClass] = useState("");
const [selectedYear, setSelectedYear] = useState("");
const [selectedCycle, setSelectedCycle] = useState("");
const [openModal, setOpenModal] = useState(false);
const [selectedStudent, setSelectedStudent] = useState(null);
const { registers, loading, error } = useSelector((state) => state.register);
const [currentPage, setCurrentPage] = useState(1);
  

const dispatch = useDispatch();


const itemsPerPage = 5;

const classes = [
    ...new Set(
      registers
        ?.map((student) => student?.classroomId?.name)
        .filter(Boolean)
    ),
  ];

const years = [
  ...new Set(
    registers
      ?.map((student) => student?.yearId?.year)
      .filter(Boolean)
  ),
];

const cycles = [
  ...new Set(
    registers
      ?.map((student) => student?.cycleId?.name)
      .filter(Boolean)
  ),
];

 
const filteredStudents = useMemo(() => {
  return registers.filter((student) => {
    const searchValue = search.toLowerCase();

    const matchSearch =
      student?.studentId?.nom
        ?.toLowerCase()
        ?.includes(searchValue) ||
      student?.studentId?.postnom
        ?.toLowerCase()
        ?.includes(searchValue) ||
      student?.studentId?.prenom
        ?.toLowerCase()
        ?.includes(searchValue) ||
      student?.studentId?.matricule
        ?.toLowerCase()
        ?.includes(searchValue);

    const matchClass =
      !selectedClass ||
      student?.classroomId?.name === selectedClass;

    const matchYear =
      !selectedYear ||
      student?.yearId?.year === selectedYear;

    const matchCycle =
      !selectedCycle ||
      student?.cycleId?.name === selectedCycle;

    return (
      matchSearch &&
      matchClass &&
      matchYear &&
      matchCycle
    );
  });
}, [
  registers,
  search,
  selectedClass,
  selectedYear,
  selectedCycle,
]);

useEffect(() => {
  setCurrentPage(1);
}, [
  search,
  selectedClass,
  selectedYear,
  selectedCycle,
]);

const totalPages = Math.ceil(
  filteredStudents.length / itemsPerPage
);

const startIndex =
  (currentPage - 1) * itemsPerPage;

const currentStudents = filteredStudents.slice(
  startIndex,
  startIndex + itemsPerPage
);

const todayCount = filteredStudents.filter(
  (student) =>
    moment(student?.createdAt).format("DD/MM/YYYY") ===
    moment().format("DD/MM/YYYY")
).length;



useEffect(() => {
      dispatch(allRegistersNofeePaid());

    }, [dispatch]);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <PaymentModal
        open={openModal}
        student={selectedStudent}
        onClose={() => setOpenModal(false)}
      />
      {/* HEADER */}

      <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Frais d'inscription non payés
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Liste des élèves enregistrés mais non encore passés à la caisse
            </p>
          </div>

          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-semibold">
            {filteredStudents.length} en attente
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">En attente</p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {filteredStudents.length}
              </h2>
            </div>

            <AlertCircle size={40} className="text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Aujourd'hui</p>

              <h2 className="text-3xl font-bold text-sky-700 mt-2">
                {filteredStudents.filter((s) => s.date === "15/06/2026").length}
              </h2>
            </div>

            <User size={40} className="text-sky-700" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Paiement attendu</p>

              <h2 className="text-3xl font-bold text-emerald-600 mt-2">100%</h2>
            </div>

            <CreditCard size={40} className="text-emerald-600" />
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        {/* FILTRES */}

        <div className="p-5 border-b">
         <div className="grid md:grid-cols-4 gap-4">
            {/* Recherche */}

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un élève..."
                className="
                  w-full
                  pl-10
                  pr-4
                  py-3
                  border
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-sky-500
                "
              />
            </div>
            {/* cycle */ }
            <select
              value={selectedCycle}
              onChange={(e) => setSelectedCycle(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="">Tous les cycles</option>

              {cycles.map((cycle) => (
                <option key={cycle} value={cycle}>
                  {cycle}
                </option>
              ))}
            </select>
            {/* Classe */}

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="
                border
                rounded-xl
                px-4
                py-3
              "
            >
              <option value="">Toutes les classes</option>

              {classes.map((classe) => (
                <option key={classe} value={classe}>
                  {classe}
                </option>
              ))}
            </select>

            {/* Année */}

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="
                border
                rounded-xl
                px-4
                py-3
              "
            >
              <option value="">Toutes les années</option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLEAU */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4">Matricule</th>

                <th className="text-left p-4">Élève</th>

                <th className="text-left p-4">Classe</th>

                <th className="text-left p-4">Cycle</th>

                <th className="text-left p-4">Année</th>

                <th className="text-left p-4">Date inscription</th>

                <th className="text-center p-4">Statut</th>

                <th className="text-center p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{student?.studentId?.matricule}</td>

                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{student?.studentId?.nom}</p>
                      <p className="font-semibold">{student?.studentId?.postnom}</p>

                      <p className="text-sm text-gray-500">{student?.studentId?.prenom}</p>
                    </div>
                  </td>

                  <td className="p-4">{student?.classroomId?.name}</td>

                  <td className="p-4">{student?.cycleId?.name}</td>

                  <td className="p-4">{student?.yearId?.year}</td>

                  <td className="p-4">{moment(student?.createdAt).format("DD/MM/YYYY HH:mm")}</td>

                  <td className="text-center p-4">
                    <span
                      className="
                        px-3 py-1
                        rounded-full
                        bg-red-100
                        text-red-700
                        text-xs
                        font-semibold
                      "
                    >
                      Non payé
                    </span>
                  </td>

                  <td className="text-center p-4">
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setOpenModal(true);
                      }}
                      className="
                        px-4
                        py-2
                        rounded-xl
                        bg-sky-900
                        hover:bg-sky-800
                        text-white
                    "
                    >
                      Encaisser
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        <div className="flex items-center justify-between p-5 border-t">
          <p className="text-sm text-gray-500">
            Page {currentPage} sur {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="
                px-3 py-2
                border
                rounded-lg
                disabled:opacity-50
              "
            >
              <ChevronLeft size={18} />
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="
                px-3 py-2
                border
                rounded-lg
                disabled:opacity-50
              "
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNoFeePaid;
