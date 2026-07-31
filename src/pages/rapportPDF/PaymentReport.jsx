import React, { useEffect, useState } from 'react';
import { Printer, FileText } from 'lucide-react';

const PaymentReport = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);

  // Chargement des données depuis sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('paymentReportData');

    if (stored) {
      const parsed = JSON.parse(stored);
      setPayments(parsed.payments || []);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // ======================
  // IMPRESSION DANS UNE NOUVELLE FENÊTRE
  // ======================
  const handleExportPDF = () => {
    const printWindow = window.open('', );

    if (!printWindow) {
      alert('Veuillez autoriser les popups pour imprimer le rapport.');
      return;
    }

    const rows = payments
      .map(
        (p, index) => `
        <tr>
          <td style="text-align:center;">${index + 1}</td>
          <td>
            ${p?.registerId?.studentId?.nom || ''} 
            ${p?.registerId?.studentId?.postnom || ''}
          </td>
          <td style="text-align:center;">${p?.registerId?.classroomId?.name || '-'}</td>
          <td style="text-align:center;">${p?.paymentNumber || '-'}</td>
          <td style="text-align:right;font-weight:bold;color:#15803d;">
            ${Number(p?.amountPaid || 0).toLocaleString('fr-FR')} $
          </td>
        </tr>
      `
      )
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Rapport des paiements</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              color: #1f2937;
            }

            .header {
              text-align: center;
              margin-bottom: 30px;
            }

            .header h1 {
              margin: 0;
              color: #0f172a;
              font-size: 28px;
            }

            .header p {
              margin-top: 6px;
              color: #64748b;
            }

            .info {
              margin-bottom: 20px;
              font-size: 14px;
              line-height: 1.6;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }

            th {
              background: #0f172a;
              color: white;
              padding: 12px;
              border: 1px solid #cbd5e1;
              font-size: 14px;
            }

            td {
              border: 1px solid #cbd5e1;
              padding: 10px;
              font-size: 14px;
            }

            tr:nth-child(even) {
              background: #f8fafc;
            }

            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #64748b;
            }

            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>

        <body>

          <div class="header">
            <h1>RAPPORT DES PAIEMENTS SCOLAIRES</h1>
            <p>État détaillé des paiements des élèves</p>
          </div>

          <div class="info">
            <strong>Date :</strong> ${new Date().toLocaleDateString('fr-FR')}
            <br/>
            <strong>Nombre de paiements :</strong> ${payments.length}
          </div>

          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Élève</th>
                <th>Classe</th>
                <th>Reçu</th>
                <th>Montant</th>
              </tr>
            </thead>

            <tbody>
              ${rows}
            </tbody>
          </table>

          <div class="footer">
            Academix ERP • Rapport généré automatiquement le
            ${new Date().toLocaleString('fr-FR')}
          </div>

        </body>
      </html>
    `);

    printWindow.document.close();

    // Ouvre la boîte d'impression automatiquement
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  // ======================
  // LOADING PAGE
  // ======================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-sm border border-gray-100">
          <div className="mx-auto w-16 h-16 rounded-full border-4 border-sky-200 border-t-sky-700 animate-spin"></div>

          <h2 className="mt-6 text-xl font-bold text-gray-800">
            Génération du rapport
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Préparation des données de paiement...
          </p>
        </div>
      </div>
    );
  }

  // ======================
  // PAS DE DONNÉES
  // ======================
  if (payments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
            <FileText className="text-red-600" size={28} />
          </div>

          <h2 className="text-xl font-bold text-red-600">
            Rapport impossible
          </h2>

          <p className="mt-3 text-gray-500">
            Aucune donnée de paiement disponible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-lg w-full">
        <div className="w-20 h-20 mx-auto rounded-full bg-sky-100 flex items-center justify-center mb-6">
          <FileText className="text-sky-700" size={34} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Rapport prêt
        </h1>

        <p className="mt-3 text-gray-500">
          Cliquez sur le bouton ci-dessous pour ouvrir le document dans une nouvelle fenêtre et l’imprimer.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-700 border border-sky-100">
          <span className="font-semibold">{payments.length}</span>
          paiement(s) prêt(s) à être imprimé(s)
        </div>

        <button
          onClick={handleExportPDF}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-900 to-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
        >
          <Printer size={18} />
          Ouvrir et imprimer le rapport
        </button>
      </div>
    </div>
  );
};

export default PaymentReport;