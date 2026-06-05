import React, { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  School2,
  Users,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const schoolsData = [
  {
    id: 1,
    name: "Complexe Scolaire Les Élites",
    promoter: "Jean Mukendi",
    phone: "+243 999 000 111",
    email: "elites@gmail.com",
    city: "Kinshasa",
    students: 1240,
    status: "Actif",
  },
  {
    id: 2,
    name: "Institut Nzambe Malamu",
    promoter: "Sarah Kanku",
    phone: "+243 888 111 222",
    email: "institut@gmail.com",
    city: "Lubumbashi",
    students: 860,
    status: "Actif",
  },
  {
    id: 3,
    name: "Collège Saint Pierre",
    promoter: "David Ilunga",
    phone: "+243 811 222 333",
    email: "saintpierre@gmail.com",
    city: "Goma",
    students: 430,
    status: "Suspendu",
  },
];

const School = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-4
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            text-sky-900
            dark:text-white
          ">
            Liste des écoles
          </h1>

          <p className="
            text-sm
            text-gray-500
            mt-1
          ">
            Gestion complète des établissements scolaires
          </p>

        </div>

        {/* BTN */}
        <button
          onClick={() => navigate("/add-new-school")}
          className="
            flex
            items-center
            gap-2
            bg-sky-900
            hover:bg-sky-800
            text-white
            px-5
            py-3
            rounded-2xl
            shadow-lg
            transition
            cursor-pointer
          "
        >
          <Plus size={18} />
          Nouvelle école
        </button>

      </div>

      {/* STATS */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
      ">

        {/* CARD */}
        <div className="
          bg-white
          dark:bg-gray-800
          rounded-3xl
          p-5
          shadow-sm
          border
          border-gray-100
          dark:border-gray-700
        ">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total écoles
              </p>

              <h2 className="
                text-3xl
                font-bold
                mt-2
                text-gray-800
                dark:text-white
              ">
                24
              </h2>

            </div>

            <div className="
              w-14
              h-14
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
            ">
              <School2 className="text-blue-600" />
            </div>

          </div>

        </div>

        {/* CARD */}
        <div className="
          bg-white
          dark:bg-gray-800
          rounded-3xl
          p-5
          shadow-sm
          border
          border-gray-100
          dark:border-gray-700
        ">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total élèves
              </p>

              <h2 className="
                text-3xl
                font-bold
                mt-2
                text-gray-800
                dark:text-white
              ">
                12,540
              </h2>

            </div>

            <div className="
              w-14
              h-14
              rounded-2xl
              bg-green-100
              flex
              items-center
              justify-center
            ">
              <Users className="text-green-600" />
            </div>

          </div>

        </div>

        {/* CARD */}
        <div className="
          bg-white
          dark:bg-gray-800
          rounded-3xl
          p-5
          shadow-sm
          border
          border-gray-100
          dark:border-gray-700
        ">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Écoles actives
              </p>

              <h2 className="
                text-3xl
                font-bold
                mt-2
                text-gray-800
                dark:text-white
              ">
                20
              </h2>

            </div>

            <div className="
              w-14
              h-14
              rounded-2xl
              bg-purple-100
              flex
              items-center
              justify-center
            ">
              <Filter className="text-purple-600" />
            </div>

          </div>

        </div>

      </div>

      {/* TABLE CONTAINER */}
      <div className="
        bg-white
        dark:bg-gray-800
        rounded-3xl
        shadow-sm
        border
        border-gray-100
        dark:border-gray-700
        overflow-hidden
      ">

        {/* TOPBAR */}
        <div className="
          p-5
          border-b
          border-gray-100
          dark:border-gray-700
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
        ">

          {/* SEARCH */}
          <div className="relative w-full lg:w-96">

            <Search
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
              size={18}
            />

            <input
              type="text"
              placeholder="Rechercher une école..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-11
                pr-4
                py-3
                rounded-2xl
                border
                border-gray-300
                dark:border-gray-600
                bg-gray-50
                dark:bg-gray-700
                text-gray-800
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-sky-500
              "
            />

          </div>

          {/* FILTER BTN */}
          <button
            className="
              px-4
              py-3
              rounded-2xl
              bg-gray-100
              dark:bg-gray-700
              hover:bg-gray-200
              dark:hover:bg-gray-600
              flex
              items-center
              gap-2
              transition
            "
          >
            <Filter size={18} />
            Filtres
          </button>

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
                  École
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Promoteur
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Téléphone
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Ville
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Élèves
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Statut
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {schoolsData.map((school) => (

                <tr
                  key={school.id}
                  className="
                    border-b
                    border-gray-100
                    dark:border-gray-700
                    hover:bg-gray-50
                    dark:hover:bg-gray-700/40
                    transition
                  "
                >

                  {/* SCHOOL */}
                  <td className="px-5 py-4">

                    <div>

                      <p className="
                        font-semibold
                        text-gray-800
                        dark:text-white
                      ">
                        {school.name}
                      </p>

                      <p className="
                        text-sm
                        text-gray-500
                      ">
                        {school.email}
                      </p>

                    </div>

                  </td>

                  {/* PROMOTEUR */}
                  <td className="
                    px-5 py-4
                    text-gray-700
                    dark:text-gray-200
                  ">
                    {school.promoter}
                  </td>

                  {/* PHONE */}
                  <td className="
                    px-5 py-4
                    text-center
                    text-gray-700
                    dark:text-gray-200
                  ">
                    {school.phone}
                  </td>

                  {/* CITY */}
                  <td className="
                    px-5 py-4
                    text-center
                    text-gray-700
                    dark:text-gray-200
                  ">
                    {school.city}
                  </td>

                  {/* STUDENTS */}
                  <td className="
                    px-5 py-4
                    text-center
                    font-semibold
                    text-gray-800
                    dark:text-white
                  ">
                    {school.students}
                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-4 text-center">

                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          school.status === "Actif"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {school.status}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="px-5 py-4">

                    <div className="
                      flex
                      items-center
                      justify-center
                      gap-2
                    ">

                      <button
                        className="
                          w-9 h-9
                          rounded-xl
                          bg-blue-100
                          hover:bg-blue-200
                          text-blue-600
                          flex
                          items-center
                          justify-center
                          transition
                        "
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        className="
                          w-9 h-9
                          rounded-xl
                          bg-yellow-100
                          hover:bg-yellow-200
                          text-yellow-600
                          flex
                          items-center
                          justify-center
                          transition
                        "
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="
                          w-9 h-9
                          rounded-xl
                          bg-red-100
                          hover:bg-red-200
                          text-red-600
                          flex
                          items-center
                          justify-center
                          transition
                        "
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default School;