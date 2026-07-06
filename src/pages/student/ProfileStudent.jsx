import { GraduationCap } from "lucide-react";
import { User } from "lucide-react";
import { School } from "lucide-react";
import { Phone } from "lucide-react";
import React from "react";

const ProfileStudent = ({ student }) => {
  return (
    <div className="px-6 pb-8">
      <div
        className="
      rounded-3xl
      bg-white dark:bg-gray-900
      border border-gray-100 dark:border-gray-800
      shadow-xl shadow-slate-200/60
      dark:shadow-black/40
      overflow-hidden
  "
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Avatar */}
            <div
              className="
            w-32 h-32
            rounded-full
            bg-white
            shadow-2xl
            flex items-center justify-center
            ring-8 ring-white/20
        "
            >
              <span className="text-5xl font-bold text-blue-900">
                {student?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>

            {/* Nom */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-white">{student.name}</h2>

              <p className="mt-2 text-blue-100">Dossier scolaire de l'élève</p>
            </div>
          </div>
        </div>

        {/* Informations */}
        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {/* Téléphone */}

            <div
              className="
            group
            rounded-2xl
            bg-white dark:bg-gray-800
            border border-gray-100 dark:border-gray-700
            shadow-lg
            hover:shadow-2xl
            transition-all
            duration-300
            hover:-translate-y-1
            p-5
        "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                h-14 w-14
                rounded-xl
                bg-blue-100
                dark:bg-blue-900/30
                flex items-center justify-center
                shadow-md
                group-hover:scale-110
                transition
            "
                >
                  <Phone className="text-blue-900 dark:text-blue-400" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Téléphone
                  </p>

                  <p className="mt-1 font-bold text-lg dark:text-white">
                    {student.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Cycle */}

            <div
              className="
            group
            rounded-2xl
            bg-white dark:bg-gray-800
            border
            shadow-lg
            hover:shadow-2xl
            transition-all
            duration-300
            hover:-translate-y-1
            p-5
        "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                h-14 w-14
                rounded-xl
                bg-green-100
                dark:bg-green-900/30
                flex items-center justify-center
                shadow-md
                group-hover:scale-110
                transition
            "
                >
                  <GraduationCap className="text-green-700 dark:text-green-400" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Cycle
                  </p>

                  <p className="mt-1 font-bold text-lg dark:text-white">
                    {student.cycle}
                  </p>
                </div>
              </div>
            </div>

            {/* Classe */}

            <div
              className="
            group
            rounded-2xl
            bg-white dark:bg-gray-800
            border
            shadow-lg
            hover:shadow-2xl
            transition-all
            duration-300
            hover:-translate-y-1
            p-5
        "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                h-14 w-14
                rounded-xl
                bg-purple-100
                dark:bg-purple-900/30
                flex items-center justify-center
                shadow-md
                group-hover:scale-110
                transition
            "
                >
                  <School className="text-purple-700 dark:text-purple-400" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Classe
                  </p>

                  <p className="mt-1 font-bold text-lg dark:text-white">
                    {student.class}
                  </p>
                </div>
              </div>
            </div>

            {/* Matricule */}

            <div
              className="
            group
            rounded-2xl
            bg-white dark:bg-gray-800
            border
            shadow-lg
            hover:shadow-2xl
            transition-all
            duration-300
            hover:-translate-y-1
            p-5
        "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                h-14 w-14
                rounded-xl
                bg-orange-100
                dark:bg-orange-900/30
                flex items-center justify-center
                shadow-md
                group-hover:scale-110
                transition
            "
                >
                  <User className="text-orange-700 dark:text-orange-400" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Matricule
                  </p>

                  <p className="mt-1 font-bold text-lg dark:text-white">
                    {student.matricule}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStudent;
