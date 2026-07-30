import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getRegisterRecu } from "../../features/payment/paymentSlice";

const VerifyReceipt = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, detailsRecu } = useSelector(
    (state) => state.payment
  );

  useEffect(() => {
    if (id) dispatch(getRegisterRecu(id));
  }, [dispatch, id]);

  // Fonction mois
  const getMonthName = (month) => {
    const months = [
      "",
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

    return months[Number(month)] || "-";
  };

  const option = detailsRecu?.registerId?.optionId?.name;
  const level = detailsRecu?.registerId?.cycleId?.name;

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification du reçu...</p>
        </div>
      </div>
    );
  }

  // INVALID
  if (!detailsRecu) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
        <div className="bg-white p-6 rounded-2xl shadow text-center max-w-sm">
          <div className="text-4xl">❌</div>

          <h2 className="text-red-600 font-bold text-xl mt-3">
            Reçu invalide
          </h2>

          <p className="text-gray-600 mt-2">
            Ce reçu n’existe pas ou a été annulé.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Retour à l’accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">

      {/* CARD */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 text-center text-white">
          <h1 className="text-lg font-bold uppercase tracking-wide">
            {detailsRecu?.schoolId?.SchoolName}
          </h1>

          <p className="text-xs opacity-90 mt-1">
            Vérification officielle du reçu
          </p>
        </div>

        {/* STATUS */}
        <div className="text-center mt-5">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm shadow-sm">
            ✔ Paiement validé
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-5 mx-5 rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center text-sm">
              👤
            </div>
            <h3 className="font-bold text-gray-800 tracking-wide">ÉLÈVE</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Nom</span>
              <span className="font-medium text-right">
                {detailsRecu?.registerId?.studentId?.nom}{" "}
                {detailsRecu?.registerId?.studentId?.postnom}{" "}
                {detailsRecu?.registerId?.studentId?.prenom}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Matricule</span>
              <span className="font-medium">
                {detailsRecu?.registerId?.studentId?.matricule}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Niveau</span>
              <span className="font-medium">{level || "-"}</span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Classe</span>
              <span className="font-medium">
                {detailsRecu?.registerId?.classroomId?.name}
              </span>
            </div>

            {option && (
              <div className="flex justify-between">
                <span className="text-gray-500">Option</span>
                <span className="font-medium">{option}</span>
              </div>
            )}
          </div>
        </div>

        {/* PAYMENT */}
        <div className="mx-5 mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 text-sm">
              💳
            </div>
            <h3 className="font-bold text-blue-900 tracking-wide">PAIEMENT</h3>
          </div>

          <div className="space-y-3 text-sm">

            {/* Numéro reçu */}
            <div className="flex justify-between border-b border-blue-100 pb-2">
              <span className="text-gray-600">N° reçu</span>
              <span className="font-mono font-bold text-blue-900">
                {detailsRecu?.paymentNumber}
              </span>
            </div>

            {/* Motif */}
            <div className="flex justify-between border-b border-blue-100 pb-2">
              <span className="text-gray-600">Motif</span>
              <span className="font-medium capitalize">
                {detailsRecu?.typeFee}
              </span>
            </div>

            {/* Mode */}
            <div className="flex justify-between border-b border-blue-100 pb-2">
              <span className="text-gray-600">Mode de paiement</span>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {detailsRecu?.paymentMode?.toLowerCase() === "tranche"
                  ? "Par tranche"
                  : "Mensuel"}
              </span>
            </div>

            {/* Tranche */}
            {detailsRecu?.paymentMode?.toLowerCase() === "tranche" && (
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-gray-600">Tranche payée</span>
                <span className="font-semibold text-gray-800">
                  {detailsRecu?.tranche || "-"}
                </span>
              </div>
            )}

            {/* Mois */}
            {["mois", "mensuel"].includes(
              detailsRecu?.paymentMode?.toLowerCase()
            ) && (
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-gray-600">Mois concerné</span>
                <span className="font-semibold text-gray-800">
                  {getMonthName(detailsRecu?.month)}
                </span>
              </div>
            )}

            {/* Montant */}
            <div className="flex justify-between border-b border-blue-100 pb-2">
              <span className="text-gray-600">Montant payé</span>
              <span className="text-lg font-bold text-green-700">
                ${Number(detailsRecu?.amountPaid || 0).toLocaleString("fr-FR")}
              </span>
            </div>

            {/* Reste */}
            {detailsRecu?.typeFee === "frais scolaire" && (
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-gray-600">Reste à payer</span>
                <span className="font-bold text-red-600">
                  ${Number(detailsRecu?.registerId?.reste || 0).toLocaleString("fr-FR")}
                </span>
              </div>
            )}

            {/* Date */}
            <div className="flex justify-between">
              <span className="text-gray-600">Date de paiement</span>
              <span className="font-medium text-gray-800">
                {moment(detailsRecu?.createdAt).format("DD/MM/YYYY HH:mm")}
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-xs text-gray-500 py-5 px-4 border-t mt-5 bg-gray-50">
          <p className="font-medium text-gray-700">
            ✔ Document officiel généré automatiquement
          </p>
          <p className="mt-1">
            ACADEMIX ERP SCHOOL
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyReceipt;