import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newRegisterPaid } from "../../features/payment/paymentSlice";
import {
  X,
  CreditCard,
  LucideLoader2,
  CheckCircle2,
  CalendarDays,
  Wallet,
} from "lucide-react";
import { Loader2 } from "lucide-react";

const PaymentModal = ({ open, onClose, student }) => {
  const [amountPaid, setamountPaid] = useState("");
  const [month, setMonth] = useState("");
  const [paymentMode, setPaymentMode] = useState("mensuel");
  const [tranche, setTranche] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  if (!open) return null;

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!amountPaid || amountPaid <= 0) {
        toast.error("Veuillez entrer un montant valide");
        return;
      }

      setLoading(true);

      const typeFee = student?.registrationFeePaid
        ? "frais scolaire"
        : "inscription";

      const FormData = {
        registerId: student?._id,
        amountPaid: Number(amountPaid),
        typeFee,
        paymentMode,
        month: month ? Number(month) : null,
        tranche: tranche || null
      };



      dispatch(newRegisterPaid({ FormData, navigate, toast }));
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
                {student?.registrationFeePaid === true
                  ? "Paiement des Frais scolaire"
                  : "Paiement des Frais d'inscription"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
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
              <label className="block mb-1 text-sm font-medium">Classe</label>
              <input
                value={`${student?.classroomId?.name || ""} ${student?.cycleId?.name || ""}`}
                readOnly
                className="w-full border rounded-xl p-3 bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Élève</label>
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
                value={
                  student?.registrationFeePaid
                    ? student?.reste
                    : student?.fraisInscription
                }
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
          {student?.registrationFeePaid && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Mode de paiement
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Paiement mensuel */}
                <label
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
                ${
                  paymentMode === "mensuel"
                    ? "border-sky-600 bg-sky-50 shadow-md"
                    : "border-gray-200 hover:border-sky-300 hover:bg-gray-50"
                }`}
                >
                  <input
                    type="radio"
                    value="mensuel"
                    checked={paymentMode === "mensuel"}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="hidden"
                  />

                  <div
                    className={`p-3 rounded-xl ${
                      paymentMode === "mensuel"
                        ? "bg-sky-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <CalendarDays size={24} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Paiement mensuel
                    </h3>
                    <p className="text-sm text-gray-500">
                      Régler les frais mois par mois.
                    </p>
                  </div>

                  {paymentMode === "mensuel" && (
                    <div className="w-5 h-5 rounded-full bg-sky-600 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </label>

                {/* Paiement par tranche */}
                <label
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
                  ${
                    paymentMode === "tranche"
                      ? "border-emerald-600 bg-emerald-50 shadow-md"
                      : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    value="tranche"
                    checked={paymentMode === "tranche"}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="hidden"
                  />

                  <div
                    className={`p-3 rounded-xl ${
                      paymentMode === "tranche"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Wallet size={24} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Paiement par tranche
                    </h3>
                    <p className="text-sm text-gray-500">
                      Régler les frais en plusieurs tranches.
                    </p>
                  </div>

                  {paymentMode === "tranche" && (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}
          {student?.registrationFeePaid && paymentMode === "mensuel" && (
            <div>
              <label className="block mb-1 text-sm font-medium">
                Mois de paiement
              </label>

              <select
                className="w-full border rounded-xl p-3"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Choisir le mois</option>

                {months.map((m, i) => (
                  <option key={i} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          )}

          {student?.registrationFeePaid && paymentMode === "tranche" && (
            <div>
              <label className="block mb-1 text-sm font-medium">
                Tranche de paiement
              </label>

              <select
                className="w-full border rounded-xl p-3"
                value={tranche}
                onChange={(e) => setTranche(e.target.value)}
              >
                <option value="">Choisir la tranche</option>

                <option value="1ère tranche">1ère tranche</option>
                <option value="2ème tranche">2ème tranche</option>
                <option value="3ème tranche">3ème tranche</option>
              </select>
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium">
              Motif de paiement
            </label>

            <input
              value={
                student?.registrationFeePaid === true
                  ? "Frais scolaire"
                  : "Frais d'inscription"
              }
              readOnly
              className="w-full border rounded-xl p-3 bg-gray-100"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={18} />
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-700 hover:to-green-700 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Validation...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  Valider le paiement
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
