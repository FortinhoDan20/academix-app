import { useState } from "react";
import axios from "axios";
import { X, CreditCard } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newRegisterPaid } from "../../features/payment/paymentSlice";

const PaymentModal = ({ open, onClose, student }) => {
  const [amountPaid, setamountPaid] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amountPaid || amountPaid <= 0) {
      toast.error("Veuillez entrer un montant valide");
      return;
    }

      setLoading(true);

      const data = {
        registerId: student?._id,
        amountPaid: Number(amountPaid),
        typeFee: "Frais d'inscription",
      };

     

       dispatch(newRegisterPaid({ data, navigate, toast }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 relative">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-sky-100">
              <CreditCard className="text-sky-700" />
            </div>

            <div>
              <h2 className="font-bold text-xl">Encaissement</h2>
              <p className="text-sm text-gray-500">
                Paiement des frais d'inscription
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X />
          </button>
        </div>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-1 text-sm font-medium">
                Matricule
              </label>
              <input
                value={student?.studentId?.matricule || ""}
                readOnly
                className="w-full border rounded-xl p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Classe
              </label>
              <input
                value={`${student?.classroomId?.name || ""} ${student?.cycleId?.name || ""}`}
                readOnly
                className="w-full border rounded-xl p-3 bg-gray-100"
              />
            </div>

          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Élève
            </label>
            <input
              value={`${student?.studentId?.nom || ""} ${student?.studentId?.postnom || ""} ${student?.studentId?.prenom || ""}`}
              readOnly
              className="w-full border rounded-xl p-3 bg-gray-100"
            />
          </div>

          {/* hidden id */}
          <input type="hidden" value={student?._id || ""} readOnly />

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-1 text-sm font-medium">
                Montant à payer $
              </label>
              <input
                value={student?.fraisInscription}
                readOnly
                className="w-full border rounded-xl p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Montant versé
              </label>
              <input
                type="number"
                placeholder="0"
                value={amountPaid}
                onChange={(e) => setamountPaid(e.target.value)}
                className="w-full border rounded-xl p-3"
              />
            </div>

          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Motif de paiement
            </label>
            <input
              value="Frais d'inscription"
              readOnly
              className="w-full border rounded-xl p-3 bg-gray-100"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-gray-200"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-green-600 text-white disabled:opacity-50"
            >
              {loading ? "Validation..." : "Valider le paiement"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default PaymentModal;