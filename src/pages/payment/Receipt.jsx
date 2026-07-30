import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRegisterRecu } from "../../features/payment/paymentSlice";
import moment from "moment";
import { motion } from "framer-motion";

const Receipt = () => {
  const [qrImage, setQrImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, detailsRecu } = useSelector((state) => state.payment);

  console.log("details recu :", detailsRecu)

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    if (id) dispatch(getRegisterRecu(id));
  }, [dispatch, id]);

  // =========================
  // QR CODE
  // =========================
  useEffect(() => {
    if (!detailsRecu?.paymentNumber) return;

    const qrValue = `https://academix-app-673b.onrender.com/verify-receipt/${detailsRecu._id}`;

    QRCode.toDataURL(qrValue)
      .then(setQrImage)
      .catch(console.error);
  }, [detailsRecu?.paymentNumber]);

  // =========================
  // PRINT THERMAL
  // =========================
  const handlePrint = () => {
    if (!detailsRecu) return;

    const r = detailsRecu;
    const WinPrint = window.open("", "", "width=350,height=650");

    if (!WinPrint) {
      alert("Popup bloqué");
      return;
    }

    const option = r?.registerId?.optionId?.name;
    const level = r?.registerId?.cycleId?.name;
    const classroom = r?.registerId?.classroomId?.name;

    WinPrint.document.write(`
      <html>
        <head>
          <title>Reçu caisse</title>
          <style>
            @page { size: 80mm auto; margin: 0; }

            body {
              font-family: monospace;
              font-size: 12px;
              margin: 0;
              padding: 10px;
              width: 80mm;
            }

            .center { text-align: center; }
            .bold { font-weight: bold; }
            .uppercase { text-transform: uppercase; }

            .line {
              border-top: 1px dashed #000;
              margin: 8px 0;
            }

            .row {
              display: flex;
              justify-content: space-between;
            }

            .total {
              font-weight: bold;
            }

            img {
              width: 120px;
              height: 120px;
            }

            .footer {
              text-align: center;
              margin-top: 10px;
              font-size: 11px;
            }
          </style>
        </head>

        <body onload="window.print()">

          <div class="center bold uppercase">
            ${r?.schoolId?.SchoolName || "SCHOOL"}
          </div>

          <div class="center">REÇU DE CAISSE</div>

          <div class="line"></div>

          <div class="row">
            <span>Reçu</span>
            <span>${r?.paymentNumber || ""}</span>
          </div>

          <div class="row">
            <span>Date</span>
            <span>${moment(r?.createdAt).format("DD/MM/YYYY HH:mm")}</span>
          </div>

          <div class="line"></div>

          <div class="bold">ÉLÈVE</div>

          <div>
            ${r?.registerId?.studentId?.nom || ""} 
            ${r?.registerId?.studentId?.postnom || ""} 
            ${r?.registerId?.studentId?.prenom || ""}
          </div>

          <div>Matricule: ${r?.registerId?.studentId?.matricule || ""}</div>

          <div>Niveau: ${level || "-"}</div>
          <div>Classe: ${classroom || "-"}</div>

          ${option ? `<div>Option: ${option}</div>` : ""}

          <div class="line"></div>

          <div class="row total">
            <span>Motif</span>
            <span>${r?.typeFee || ""}</span>
          </div>

          <div class="row total">
            <span>Montant</span>
            <span>${r?.amountPaid || 0} $</span>
          </div>

          <div class="line"></div>

          <div class="center">
            <div>Scanner pour vérification</div>
            <img src="${qrImage || ""}" />
          </div>
          <div class="line"></div>

          <div class="row" style="margin-top:10px;">
            <div>
              <div class="bold">Parent ou tuteur</div>
              <div style="margin-top:30px;">___________</div>
            </div>

            <div style="text-align:right;">
              <div class="bold">Direction</div>
              <div style="margin-top:30px;">___________</div>
            </div>
          </div>

          <div class="line"></div>

          <div class="footer">
            Merci pour votre paiement<br/>
            ACADEMIX ERP SCHOOL
          </div>

          <script>
            window.onafterprint = () => window.close();
          </script>

        </body>
      </html>
    `);

    WinPrint.document.close();
    WinPrint.focus();
  };



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
  // =========================
  // LOADING
  // =========================
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
  if (!detailsRecu) return <div className="p-6">Aucun reçu</div>;

  const option = detailsRecu?.registerId?.optionId?.name;
  const level = detailsRecu?.registerId?.cycleId?.name;

 return (
  <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

    {/* PREVIEW */}
    <div className="bg-white w-[340px] p-5 shadow-2xl rounded-2xl border border-gray-200 text-[12px] font-mono">

      {/* HEADER */}
      <div className="text-center mb-3">
        <h1 className="font-bold text-sm uppercase text-gray-800">
          {detailsRecu?.schoolId?.SchoolName || "Établissement"}
        </h1>

        <p className="text-gray-500 text-[11px]">
          Reçu de caisse officiel
        </p>
      </div>

      <div className="border-t border-dashed border-gray-400 my-2"></div>

      {/* INFOS REÇU */}
      <div className="space-y-1">

        <div className="flex justify-between">
          <span className="text-gray-600">N° Reçu</span>
          <span className="font-semibold text-gray-800">
            {detailsRecu?.paymentNumber || "-"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Date</span>
          <span className="text-gray-800">
            {detailsRecu?.createdAt
              ? moment(detailsRecu.createdAt).format("DD/MM/YYYY HH:mm")
              : "-"}
          </span>
        </div>

      </div>

      <div className="border-t border-dashed border-gray-400 my-3"></div>

      {/* ÉLÈVE */}
      <div className="mb-2">

        <div className="font-bold text-gray-800 mb-1">ÉLÈVE</div>

        <div className="font-semibold text-gray-900 uppercase">
          {detailsRecu?.registerId?.studentId?.nom} {" "}
          {detailsRecu?.registerId?.studentId?.postnom} {" "}
          {detailsRecu?.registerId?.studentId?.prenom}
        </div>

        <div className="text-gray-700">
          Matricule : {detailsRecu?.registerId?.studentId?.matricule || "-"}
        </div>

        <div className="text-gray-700">
          Niveau : {level || "-"}
        </div>

        <div className="text-gray-700">
          Classe : {detailsRecu?.registerId?.classroomId?.name || "-"}
        </div>

        {option && (
          <div className="text-gray-700">
            Option : {option}
          </div>
        )}

      </div>

      <div className="border-t border-dashed border-gray-400 my-3"></div>

      {/* PAIEMENT */}
      <div className="mb-2">

        <div className="font-bold text-gray-800 mb-1">PAIEMENT</div>

        <div className="flex justify-between py-0.5">
          <span className="text-gray-600">Motif</span>
          <span className="font-medium text-right max-w-[180px]">
            {detailsRecu?.typeFee || "-"}
          </span>
        </div>

        <div className="flex justify-between py-0.5">
          <span className="text-gray-600">Mode</span>
          <span className="font-medium">
            {detailsRecu?.paymentMode?.toLowerCase() === "tranche"
              ? "Par tranche"
              : "Mensuel"}
          </span>
        </div>

        {/* TRANCHE */}
        {detailsRecu?.paymentMode?.toLowerCase() === "tranche" && (
          <div className="flex justify-between py-0.5">
            <span className="text-gray-600">Tranche payée</span>
            <span className="font-medium">
              {detailsRecu?.tranche || "-"}
            </span>
          </div>
        )}

        {/* MOIS */}
        {["mois", "mensuel"].includes(
          detailsRecu?.paymentMode?.toLowerCase()
        ) && (
          <div className="flex justify-between py-0.5">
            <span className="text-gray-600">Mois</span>
            <span className="font-medium">
              {getMonthName(detailsRecu?.month)}
            </span>
          </div>
        )}

        <div className="flex justify-between py-1 mt-1 border-t border-gray-200">
          <span className="font-semibold text-gray-800">Montant payé</span>
          <span className="font-bold text-green-700">
            ${Number(detailsRecu?.amountPaid || 0).toLocaleString("fr-FR")}
          </span>
        </div>

        {detailsRecu?.typeFee === "frais scolaire" && (
          <div className="flex justify-between py-1">
            <span className="font-semibold text-gray-800">Reste à payer</span>
            <span className="font-bold text-red-600">
              ${Number(detailsRecu?.registerId?.reste || 0).toLocaleString("fr-FR")}
            </span>
          </div>
        )}

      </div>

      <div className="border-t border-dashed border-gray-400 my-3"></div>

      {/* QR CODE */}
      {qrImage && (
        <div className="flex flex-col items-center gap-1">

          <img
            src={qrImage}
            alt="QR Code"
            className="w-[120px] h-[120px]"
          />

          <p className="text-[10px] text-gray-500 text-center">
            Scanner pour vérifier l’authenticité du reçu
          </p>

        </div>
      )}

      <div className="border-t border-dashed border-gray-400 my-3"></div>

      {/* FOOTER */}
      <div className="text-center text-[10px] text-gray-500 leading-relaxed">
        Merci pour votre paiement.<br />
        Document généré automatiquement par <span className="font-semibold">ACADEMIX ERP SCHOOL</span>.
      </div>

    </div>

    {/* BUTTONS */}
    <div className="flex gap-4 mt-6">

      <button
        onClick={handlePrint}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md transition-all duration-200"
      >
        🖨️ Imprimer
      </button>

      <button
        onClick={() => navigate("/register-nofeepaid")}
        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl shadow-md transition-all duration-200"
      >
        ↩️ Retour
      </button>

    </div>

  </div>
);
};

export default Receipt;