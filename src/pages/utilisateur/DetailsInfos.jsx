import React from "react";
import {
  ArrowLeft,
  User2,
  Mail,
  Phone,
  ShieldCheck,
  School2,
  CalendarDays,
  MapPin,
  BadgeCheck,
  CircleUserRound,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DetailsInfos = () => {

  const navigate = useNavigate();

  // 👉 DONNÉES SIMULÉES
  const user = {
    fullName: "Jean Mukendi",
    username: "jean.mukendi",
    email: "jean@gmail.com",
    phone: "+243 999 000 111",
    role: "Administrateur",
    sexe: "Masculin",
    school: "Complexe Scolaire Les Élites",
    city: "Kinshasa",
    status: "Actif",
    createdAt: "15 Mai 2026",
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="
        bg-gradient-to-r
        from-sky-900
        to-sky-700
        rounded-3xl
        p-6
        shadow-sm
        text-white
      ">

        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
        ">

          {/* USER INFO */}
          <div className="flex items-center gap-5">

            {/* AVATAR */}
            <div className="
              w-24
              h-24
              rounded-3xl
              bg-white/10
              backdrop-blur-sm
              flex
              items-center
              justify-center
              border
              border-white/20
            ">
              <User2 size={45} />
            </div>

            {/* INFOS */}
            <div>

              <h1 className="
                text-3xl
                font-bold
              ">
                {user.fullName}
              </h1>

              <p className="
                text-blue-100
                mt-1
              ">
                @{user.username}
              </p>

              <div className="
                flex
                flex-wrap
                gap-3
                mt-4
              ">

                <span className="
                  px-3
                  py-1
                  rounded-full
                  bg-white/10
                  text-sm
                  border
                  border-white/20
                ">
                  {user.role}
                </span>

                <span className="
                  px-3
                  py-1
                  rounded-full
                  bg-green-500/20
                  text-sm
                  border
                  border-green-300/20
                ">
                  {user.status}
                </span>

              </div>

            </div>

          </div>

          {/* ACTIONS */}
          <div className="
            flex
            flex-wrap
            items-center
            gap-3
          ">

            <button
              onClick={() => navigate("/users")}
              className="
                px-5
                py-3
                rounded-2xl
                bg-white/10
                hover:bg-white/20
                border
                border-white/10
                flex
                items-center
                gap-2
                transition
              "
            >
              <ArrowLeft size={18} />
              Retour
            </button>

            <button
             onClick={() => navigate("/edit-user")}
              className="
                px-5
                py-3
                rounded-2xl
                bg-white
                text-sky-800
                hover:bg-gray-100
                font-medium
                flex
                items-center
                gap-2
                transition
              "
            >
              <Pencil size={18} />
              Modifier
            </button>

          </div>

        </div>

      </div>

      {/* CARDS */}
      <div className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
      ">

        {/* LEFT SIDE */}
        <div className="
          lg:col-span-1
          space-y-6
        ">

          {/* PROFILE CARD */}
          <div className="
            bg-white
            dark:bg-gray-800
            rounded-3xl
            p-6
            shadow-sm
            border
            border-gray-100
            dark:border-gray-700
          ">

            <div className="
              flex
              items-center
              gap-3
              mb-6
            ">

              <div className="
                w-12
                h-12
                rounded-2xl
                bg-blue-100
                flex
                items-center
                justify-center
              ">
                <CircleUserRound className="text-blue-600" />
              </div>

              <div>

                <h2 className="
                  text-lg
                  font-bold
                  text-gray-800
                  dark:text-white
                ">
                  Profil utilisateur
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  Informations personnelles
                </p>

              </div>

            </div>

            {/* CONTENT */}
            <div className="space-y-5">

              <div>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  Nom complet
                </p>

                <h3 className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                ">
                  {user.fullName}
                </h3>

              </div>

              <div>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  Sexe
                </p>

                <h3 className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                ">
                  {user.sexe}
                </h3>

              </div>

              <div>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  Téléphone
                </p>

                <h3 className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                ">
                  {user.phone}
                </h3>

              </div>

              <div>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  Ville
                </p>

                <h3 className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                ">
                  {user.city}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="
          lg:col-span-2
          space-y-6
        ">

          {/* ACCOUNT CARD */}
          <div className="
            bg-white
            dark:bg-gray-800
            rounded-3xl
            p-6
            shadow-sm
            border
            border-gray-100
            dark:border-gray-700
          ">

            <div className="
              flex
              items-center
              gap-3
              mb-6
            ">

              <div className="
                w-12
                h-12
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
              ">
                <ShieldCheck className="text-green-600" />
              </div>

              <div>

                <h2 className="
                  text-lg
                  font-bold
                  text-gray-800
                  dark:text-white
                ">
                  Informations du compte
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  Accès et permissions utilisateur
                </p>

              </div>

            </div>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            ">

              {/* EMAIL */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  mb-2
                ">
                  <Mail size={16} />
                  <span className="text-sm">
                    Email
                  </span>
                </div>

                <h3 className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                ">
                  {user.email}
                </h3>

              </div>

              {/* USERNAME */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  mb-2
                ">
                  <User2 size={16} />
                  <span className="text-sm">
                    Nom utilisateur
                  </span>
                </div>

                <h3 className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                ">
                  @{user.username}
                </h3>

              </div>

              {/* ROLE */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  mb-2
                ">
                  <ShieldCheck size={16} />
                  <span className="text-sm">
                    Rôle
                  </span>
                </div>

                <h3 className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                ">
                  {user.role}
                </h3>

              </div>

              {/* STATUS */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  mb-2
                ">
                  <BadgeCheck size={16} />
                  <span className="text-sm">
                    Statut
                  </span>
                </div>

                <span className="
                  px-3
                  py-1
                  rounded-full
                  bg-green-100
                  text-green-700
                  text-sm
                  font-semibold
                ">
                  {user.status}
                </span>

              </div>

            </div>

          </div>

          {/* SCHOOL CARD */}
          <div className="
            bg-white
            dark:bg-gray-800
            rounded-3xl
            p-6
            shadow-sm
            border
            border-gray-100
            dark:border-gray-700
          ">

            <div className="
              flex
              items-center
              gap-3
              mb-6
            ">

              <div className="
                w-12
                h-12
                rounded-2xl
                bg-purple-100
                flex
                items-center
                justify-center
              ">
                <School2 className="text-purple-600" />
              </div>

              <div>

                <h2 className="
                  text-lg
                  font-bold
                  text-gray-800
                  dark:text-white
                ">
                  École associée
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  Établissement rattaché
                </p>

              </div>

            </div>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            ">

              {/* SCHOOL */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  mb-2
                ">
                  <School2 size={16} />
                  <span className="text-sm">
                    Nom école
                  </span>
                </div>

                <h3 className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                ">
                  {user.school}
                </h3>

              </div>

              {/* DATE */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  mb-2
                ">
                  <CalendarDays size={16} />
                  <span className="text-sm">
                    Créé le
                  </span>
                </div>

                <h3 className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                ">
                  {user.createdAt}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DetailsInfos;