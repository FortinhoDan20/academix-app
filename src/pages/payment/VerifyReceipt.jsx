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
          <div className="text-3xl">❌</div>
          <div className="text-red-600 font-bold text-lg mt-2">
            Reçu invalide
          </div>
          <p className="text-gray-600 mt-2">
            Ce reçu n’existe pas ou a été annulé.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">

      {/* CARD */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER COLORÉ */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 text-center text-white">
          <h1 className="text-lg font-bold uppercase">
            {detailsRecu?.schoolId?.SchoolName}
          </h1>
          <p className="text-xs opacity-90">
            Vérification officielle du reçu
          </p>
        </div>

        {/* STATUS SUCCESS */}
        <div className="text-center mt-5">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold animate-pulse">
            ✔ Paiement validé
          </div>
        </div>

        {/* SUMMARY CARD */}
        <div className="mt-5 mx-5 bg-gray-50 rounded-xl p-4 text-sm space-y-2">

          <div className="flex justify-between">
            <span className="text-gray-500">Nom</span>
            <span className="font-medium">
              {detailsRecu?.registerId?.studentId?.nom}{" "}
              {detailsRecu?.registerId?.studentId?.postnom}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Matricule</span>
            <span>{detailsRecu?.registerId?.studentId?.matricule}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Niveau</span>
            <span>{level || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Classe</span>
            <span>{detailsRecu?.registerId?.classroomId?.name}</span>
          </div>

          {option && (
            <div className="flex justify-between">
              <span className="text-gray-500">Option</span>
              <span>{option}</span>
            </div>
          )}
        </div>

        {/* PAYMENT CARD */}
        <div className="mx-5 mt-4 bg-blue-50 rounded-xl p-4 text-sm space-y-2">

          <div className="flex justify-between">
            <span>Reçu</span>
            <span className="font-bold">
              {detailsRecu?.paymentNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Motif</span>
            <span>{detailsRecu?.typeFee}</span>
          </div>

          <div className="flex justify-between">
            <span>Montant</span>
            <span className="text-blue-700 font-bold">
              ${detailsRecu?.amountPaid}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Date de paiement</span>
            <span>
              {moment(detailsRecu?.createdAt).format("DD/MM/YYYY HH:mm")}
            </span>
          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center text-xs text-gray-500 py-5">
          ✔ Document officiel généré automatiquement
        </div>

      </div>
    </div>
  );
};

export default VerifyReceipt;