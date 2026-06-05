import React from "react";
import {
  User,
  Phone,
  Calendar,
  GraduationCap,
  School,
  QrCode,
  Mail,
} from "lucide-react";

const Profile = () => {

  /*
  |--------------------------------------------------------------------------
  | DEMO DATA
  |--------------------------------------------------------------------------
  */

  const student = {
    nom: "Kasongo",
    prenom: "Daniel",
    matricule: "26001",
    sexe: "Masculin",
    dateNaissance: "12/05/2010",
    telephoneParent: "+243 900 000 000",
    cycle: "Humanité",
    section: "Scientifique",
    option: "Math-Info",
    classroom: "3ème Scientifique",
    year: "2025-2026",

    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",

    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=684f5d9c4f2a6e0012ab45cd",
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-8">

      <div
        className="
          max-w-6xl
          mx-auto
          bg-white
          dark:bg-gray-900
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            bg-gradient-to-r
            from-sky-900
            to-sky-700
            px-6
            md:px-10
            py-8
            text-white
          "
        >

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* LEFT */}

            <div className="flex items-center gap-5">

              {/* PHOTO */}

              <div
                className="
                  w-32
                  h-32
                  rounded-3xl
                  overflow-hidden
                  border-4
                  border-white/30
                  shadow-xl
                  bg-white
                "
              >

                <img
                  src={student.photo}
                  alt={student.nom}
                  className="w-full h-full object-cover"
                />

              </div>

              {/* INFO */}

              <div>

                <h1 className="text-3xl md:text-4xl font-bold">
                  {student.nom} {student.prenom}
                </h1>

                <p className="text-sky-100 mt-2">
                  Matricule :{" "}
                  <span className="font-semibold">
                    {student.matricule}
                  </span>
                </p>

                <div className="flex flex-wrap gap-3 mt-4">

                  <span
                    className="
                      px-4
                      py-1.5
                      rounded-full
                      bg-white/15
                      text-sm
                    "
                  >
                    {student.cycle}
                  </span>

                  <span
                    className="
                      px-4
                      py-1.5
                      rounded-full
                      bg-white/15
                      text-sm
                    "
                  >
                    {student.classroom}
                  </span>

                </div>

              </div>

            </div>

            {/* QR CODE */}

            <div
              className="
                bg-white
                rounded-3xl
                p-4
                shadow-xl
                w-fit
              "
            >

              <img
                src={student.qrCode}
                alt="QR Code"
                className="w-40 h-40 object-contain"
              />

            </div>

          </div>

        </div>

        {/* ================= BODY ================= */}

        <div className="p-6 md:p-10">

          <div className="grid lg:grid-cols-2 gap-6">

            {/* ================= PERSONAL INFO ================= */}

            <div
              className="
                bg-gray-50
                dark:bg-gray-800/50
                rounded-3xl
                p-6
                border
                dark:border-gray-700
              "
            >

              <div className="flex items-center gap-3 mb-6">

                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-sky-100
                    text-sky-700
                    flex
                    items-center
                    justify-center
                  "
                >
                  <User size={22} />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Informations personnelles
                  </h2>

                  <p className="text-sm text-gray-500">
                    Détails de l'élève
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                <InfoItem
                  icon={User}
                  label="Nom complet"
                  value={`${student.nom} ${student.prenom}`}
                />

                <InfoItem
                  icon={Calendar}
                  label="Date de naissance"
                  value={student.dateNaissance}
                />

                <InfoItem
                  icon={Phone}
                  label="Téléphone parent"
                  value={student.telephoneParent}
                />

                <InfoItem
                  icon={School}
                  label="Sexe"
                  value={student.sexe}
                />

              </div>

            </div>

            {/* ================= SCHOOL INFO ================= */}

            <div
              className="
                bg-gray-50
                dark:bg-gray-800/50
                rounded-3xl
                p-6
                border
                dark:border-gray-700
              "
            >

              <div className="flex items-center gap-3 mb-6">

                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-green-100
                    text-green-700
                    flex
                    items-center
                    justify-center
                  "
                >
                  <GraduationCap size={22} />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Informations scolaires
                  </h2>

                  <p className="text-sm text-gray-500">
                    Cycle et orientation
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                <InfoItem
                  icon={GraduationCap}
                  label="Cycle"
                  value={student.cycle}
                />

                <InfoItem
                  icon={School}
                  label="Section"
                  value={student.section}
                />

                <InfoItem
                  icon={BookIcon}
                  label="Option"
                  value={student.option}
                />

                <InfoItem
                  icon={School}
                  label="Classe"
                  value={student.classroom}
                />

                <InfoItem
                  icon={Calendar}
                  label="Année scolaire"
                  value={student.year}
                />

              </div>

            </div>

          </div>

          {/* ================= QR BLOCK ================= */}

          <div
            className="
              mt-8
              bg-gradient-to-r
              from-sky-900
              to-sky-700
              rounded-3xl
              p-8
              text-white
            "
          >

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

              <div>

                <div className="flex items-center gap-3 mb-3">

                  <QrCode className="w-7 h-7" />

                  <h2 className="text-2xl font-bold">
                    QR Code Étudiant
                  </h2>

                </div>

                <p className="text-sky-100 max-w-xl">
                  Scanner ce QR Code pour accéder rapidement
                  au profil de l’élève dans le système scolaire.
                </p>

              </div>

              <div
                className="
                  bg-white
                  p-4
                  rounded-3xl
                  shadow-2xl
                "
              >

                <img
                  src={student.qrCode}
                  alt="QR Code"
                  className="w-44 h-44"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;

/* ================= INFO ITEM ================= */

const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => (

  <div
    className="
      flex
      items-start
      gap-4
      p-4
      rounded-2xl
      bg-white
      dark:bg-gray-900
      border
      dark:border-gray-700
    "
  >

    <div
      className="
        w-11
        h-11
        rounded-xl
        bg-gray-100
        dark:bg-gray-800
        flex
        items-center
        justify-center
        text-sky-700
      "
    >
      <Icon size={20} />
    </div>

    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <h3 className="font-semibold text-gray-800 dark:text-white mt-1">
        {value}
      </h3>

    </div>

  </div>
);

/* ================= BOOK ICON ================= */

const BookIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5A4.5 4.5 0 003 9.5v9A4.5 4.5 0 017.5 14c1.746 0 3.332.477 4.5 1.253m0-9C13.168 5.477 14.754 5 16.5 5A4.5 4.5 0 0121 9.5v9a4.5 4.5 0 00-4.5-4.5c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);