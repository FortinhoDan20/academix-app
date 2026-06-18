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

    const qrValue = `https://academix-app-u8ve.onrender.com/verify-receipt/${detailsRecu._id}`;

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
      <div className="bg-white w-[320px] p-4 shadow-xl rounded-xl border text-[12px] font-mono">

        <div className="text-center font-bold uppercase">
          {detailsRecu?.schoolId?.SchoolName}
        </div>

        <div className="text-center mb-2">
          Reçu de caisse
        </div>

        <div className="border-t border-dashed my-2"></div>

        <div className="flex justify-between">
          <span>Reçu</span>
          <span>{detailsRecu?.paymentNumber}</span>
        </div>

        <div className="flex justify-between">
          <span>Date</span>
          <span>{moment(detailsRecu?.createdAt).format("DD/MM/YYYY HH:mm")}</span>
        </div>

        <div className="border-t border-dashed my-2"></div>

        <div className="font-bold">ÉLÈVE</div>

        <div>
          {detailsRecu?.registerId?.studentId?.nom}{" "}
          {detailsRecu?.registerId?.studentId?.postnom}{" "}
          {detailsRecu?.registerId?.studentId?.prenom}
        </div>

        <div>Matricule: {detailsRecu?.registerId?.studentId?.matricule}</div>

        <div>Niveau: {level || "-"}</div>
        <div>Classe: {detailsRecu?.registerId?.classroomId?.name}</div>

        {option && <div>Option: {option}</div>}

        <div className="border-t border-dashed my-2"></div>

        <div className="flex justify-between font-bold">
          <span>Motif</span>
          <span>{detailsRecu?.typeFee}</span>
        </div>

        <div className="flex justify-between font-bold">
          <span>Montant</span>
          <span>${detailsRecu?.amountPaid}</span>
        </div>

        <div className="border-t border-dashed my-2"></div>

        {qrImage && (
          <div className="flex justify-center">
            <img src={qrImage} className="w-[120px]" />
          </div>
        )}

      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6">

        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-6 py-2 rounded-xl"
        >
          🖨️ Imprimer
        </button>

        <button
          onClick={() => navigate("/register-nofeepaid")}
          className="bg-gray-600 text-white px-6 py-2 rounded-xl"
        >
          ↩️ Retour
        </button>

      </div>

    </div>
  );
};

export default Receipt;