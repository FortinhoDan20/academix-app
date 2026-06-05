import React from "react";
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Users,
  Layers3,
  School2,
  BookOpen,
  DoorOpen,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const schoolStats = [
  {
    title: "Total élèves",
    value: "1,245",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Cycles",
    value: "4",
    icon: Layers3,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Sections",
    value: "8",
    icon: BookOpen,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Salles",
    value: "32",
    icon: DoorOpen,
    color: "bg-purple-100 text-purple-600",
  },
];

const structures = [
  {
    cycle: "Maternelle",
    section: "-",
    option: "-",
    classrooms: 5,
  },
  {
    cycle: "Primaire",
    section: "-",
    option: "-",
    classrooms: 12,
  },
  {
    cycle: "Humanités",
    section: "Scientifique",
    option: "Math-Physique",
    classrooms: 4,
  },
  {
    cycle: "Humanités",
    section: "Scientifique",
    option: "Biologie-Chimie",
    classrooms: 3,
  },
  {
    cycle: "Humanités",
    section: "Littéraire",
    option: "Latin-Philo",
    classrooms: 2,
  },
  {
    cycle: "Orientation",
    section: "-",
    option: "-",
    classrooms: 6,
  },
];

const DetailsSchool = () => {

  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="
        bg-white
        dark:bg-gray-800
        rounded-3xl
        shadow-sm
        border
        border-gray-100
        dark:border-gray-700
        p-6
      ">

        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
        ">

          {/* LEFT */}
          <div className="flex items-start gap-4">

            <div className="
              w-20
              h-20
              rounded-3xl
              bg-sky-100
              flex
              items-center
              justify-center
            ">
              <School2
                size={40}
                className="text-sky-700"
              />
            </div>

            <div>

              <h1 className="
                text-3xl
                font-bold
                text-gray-800
                dark:text-white
              ">
                Complexe Scolaire Les Élites
              </h1>

              <p className="
                text-gray-500
                mt-1
              ">
                Établissement scolaire agréé
              </p>

              <div className="
                flex
                flex-wrap
                items-center
                gap-4
                mt-4
                text-sm
                text-gray-600
                dark:text-gray-300
              ">

                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  +243 999 000 111
                </div>

                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  elites@gmail.com
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  Kinshasa / Limete
                </div>

              </div>

            </div>

          </div>

          {/* BTN */}
          <button
            onClick={() => navigate("/list-school")}
            className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              bg-gray-100
              dark:bg-gray-700
              hover:bg-gray-200
              dark:hover:bg-gray-600
              transition
              cursor-pointer
            "
          >
            <ArrowLeft size={18} />
            Retour
          </button>

        </div>

      </div>

      {/* STATS */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-5
      ">

        {schoolStats.map((item, index) => {

          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                p-5
                shadow-sm
                border
                border-gray-100
                dark:border-gray-700
              "
            >

              <div className="
                flex
                items-center
                justify-between
              ">

                <div>

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    {item.title}
                  </p>

                  <h2 className="
                    text-3xl
                    font-bold
                    mt-2
                    text-gray-800
                    dark:text-white
                  ">
                    {item.value}
                  </h2>

                </div>

                <div className={`
                  w-14
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${item.color}
                `}>
                  <Icon size={28} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* INFORMATIONS */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      ">

        {/* SCHOOL INFO */}
        <div className="
          xl:col-span-1
          bg-white
          dark:bg-gray-800
          rounded-3xl
          shadow-sm
          border
          border-gray-100
          dark:border-gray-700
          p-6
        ">

          <div className="flex items-center gap-3 mb-6">

            <div className="
              w-12
              h-12
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
            ">
              <Building2 className="text-blue-600" />
            </div>

            <div>
              <h2 className="
                text-lg
                font-bold
                text-gray-800
                dark:text-white
              ">
                Informations générales
              </h2>

              <p className="text-sm text-gray-500">
                Détails administratifs
              </p>
            </div>

          </div>

          <div className="space-y-5">

            <div>
              <p className="text-sm text-gray-500">
                Promoteur
              </p>

              <h3 className="
                font-semibold
                text-gray-800
                dark:text-white
              ">
                Jean Mukendi
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <h3 className="
                font-semibold
                text-gray-800
                dark:text-white
              ">
                elites@gmail.com
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Téléphone
              </p>

              <h3 className="
                font-semibold
                text-gray-800
                dark:text-white
              ">
                +243 999 000 111
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Adresse
              </p>

              <h3 className="
                font-semibold
                text-gray-800
                dark:text-white
              ">
                Kinshasa / Limete Industriel
              </h3>
            </div>

          </div>

        </div>

        {/* TABLE */}
        <div className="
          xl:col-span-2
          bg-white
          dark:bg-gray-800
          rounded-3xl
          shadow-sm
          border
          border-gray-100
          dark:border-gray-700
          overflow-hidden
        ">

          {/* HEADER */}
          <div className="
            p-6
            border-b
            border-gray-100
            dark:border-gray-700
            flex
            items-center
            gap-3
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
              <GraduationCap className="text-green-600" />
            </div>

            <div>

              <h2 className="
                text-lg
                font-bold
                text-gray-800
                dark:text-white
              ">
                Structure pédagogique
              </h2>

              <p className="text-sm text-gray-500">
                Cycles, sections et salles de classe
              </p>

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="
                bg-sky-900
                text-white
              ">

                <tr>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Cycle
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Section
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Option
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold">
                    Salles
                  </th>

                </tr>

              </thead>

              <tbody>

                {structures.map((item, index) => (

                  <tr
                    key={index}
                    className="
                      border-b
                      border-gray-100
                      dark:border-gray-700
                      hover:bg-gray-50
                      dark:hover:bg-gray-700/40
                      transition
                    "
                  >

                    <td className="
                      px-5
                      py-4
                      font-medium
                      text-gray-800
                      dark:text-white
                    ">
                      {item.cycle}
                    </td>

                    <td className="
                      px-5
                      py-4
                      text-gray-700
                      dark:text-gray-300
                    ">
                      {item.section}
                    </td>

                    <td className="
                      px-5
                      py-4
                      text-gray-700
                      dark:text-gray-300
                    ">
                      {item.option}
                    </td>

                    <td className="
                      px-5
                      py-4
                      text-center
                    ">

                      <span className="
                        px-3
                        py-1
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        text-sm
                        font-semibold
                      ">
                        {item.classrooms}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DetailsSchool;