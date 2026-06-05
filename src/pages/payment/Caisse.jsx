import React, { useState } from "react";
import { Search, User, DollarSign, CheckCircle } from "lucide-react";

const mockStudents = [
  {
    id: "ST001",
    name: "Jean Paul",
    class: "1ère A",
    cycle: "Primaire",
    totalFees: 200000,
    paid: 50000,
  },
];

const Caisse = () => {
  const [query, setQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("mensuel");

  const handleSearch = () => {
    const found = mockStudents.find(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.id.toLowerCase() === query.toLowerCase()
    );

    setSelectedStudent(found || null);
  };

  const handlePayment = () => {
    if (!selectedStudent || !amount) return;
    alert("Paiement enregistré ✔");
  };

  const reste = selectedStudent
    ? selectedStudent.totalFees - selectedStudent.paid
    : 0;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border shadow-sm">
        <h1 className="text-3xl font-bold text-sky-900 flex items-center gap-2">
          <DollarSign />
          Caisse scolaire
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Encaissement des frais élèves
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border flex gap-2 shadow-sm">

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher élève (nom ou matricule)"
          className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-sky-900 dark:bg-gray-800"
        />

        <button
          onClick={handleSearch}
          className="bg-sky-900 hover:bg-sky-800 text-white px-5 rounded-xl flex items-center gap-2 transition"
        >
          <Search size={16} />
          Rechercher
        </button>

      </div>

      {/* CONTENT */}
      {selectedStudent ? (
        <div className="grid md:grid-cols-2 gap-6">

          {/* STUDENT CARD */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm">

            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white">
              <User size={18} />
              Informations élève
            </h2>

            <div className="mt-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><b>Nom:</b> {selectedStudent.name}</p>
              <p><b>Classe:</b> {selectedStudent.class}</p>
              <p><b>Cycle:</b> {selectedStudent.cycle}</p>

              <div className="mt-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                <p><b>Total:</b> {selectedStudent.totalFees} FC</p>
                <p><b>Payé:</b> {selectedStudent.paid} FC</p>
                <p className="text-red-500 font-bold mt-1">
                  Reste: {reste} FC
                </p>
              </div>
            </div>
          </div>

          {/* PAYMENT CARD */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm space-y-4">

            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Encaissement
            </h2>

            {/* MODE */}
            <div>
              <label className="text-sm text-gray-500">Mode de paiement</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full mt-1 p-3 border rounded-xl dark:bg-gray-800 focus:ring-2 focus:ring-sky-900"
              >
                <option value="mensuel">Mensuel</option>
                <option value="tranche">Par tranche</option>
                <option value="inscription">Frais inscription</option>
              </select>
            </div>

            {/* AMOUNT */}
            <div>
              <label className="text-sm text-gray-500">Montant payé</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ex: 50000"
                className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-sky-900 dark:bg-gray-800"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handlePayment}
              className="w-full bg-sky-900 hover:bg-sky-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <CheckCircle size={18} />
              Valider paiement
            </button>

          </div>

        </div>
      ) : (
        <div className="text-center p-10 text-gray-500 border rounded-2xl bg-white dark:bg-gray-900">
          Aucun élève sélectionné
        </div>
      )}
    </div>
  );
};

export default Caisse;