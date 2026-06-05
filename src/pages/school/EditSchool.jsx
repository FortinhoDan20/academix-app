import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  School2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditSchool = () => {

  const navigate = useNavigate();

  // 👉 DONNÉES EXISTANTES (simulation backend)
  const schoolData = {
    schoolName: "Complexe Scolaire Les Élites",
    email: "elites@gmail.com",
    phone: "+243 999 000 111",
    address: "Kinshasa / Limete",
    website: "www.eliteschool.cd",
    promoter: "Jean Mukendi",
    sexe: "M",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: schoolData,
  });

  const onSubmit = async (data) => {

    console.log("UPDATED SCHOOL :", data);

    // 👉 API UPDATE
    // await api.put(`/school/${id}`, data)

    alert("Informations modifiées avec succès");

  };

  return (
    <div className="
      min-h-screen
      bg-gray-100
      dark:bg-gray-900
      p-6
    ">

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          max-w-5xl
          mx-auto
          bg-white
          dark:bg-gray-800
          rounded-3xl
          shadow-sm
          overflow-hidden
          border
          border-gray-100
          dark:border-gray-700
        "
      >

        {/* HEADER */}
        <div className="
          bg-gradient-to-r
          from-sky-900
          to-sky-700
          p-6
          text-white
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-4
          ">

            <div className="flex items-center gap-4">

              <div className="
                w-16
                h-16
                rounded-2xl
                bg-white/20
                flex
                items-center
                justify-center
              ">
                <School2 size={32} />
              </div>

              <div>

                <h1 className="
                  text-2xl
                  font-bold
                ">
                  Modifier l’école
                </h1>

                <p className="
                  text-sm
                  text-blue-100
                  mt-1
                ">
                  Mise à jour des informations administratives
                </p>

              </div>

            </div>

            {/* BTN */}
            <button
              onClick={() => navigate("/list-school")}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-2xl
                bg-white/10
                hover:bg-white/20
                transition
                cursor-pointer
              "
            >
              <ArrowLeft size={18} />
              Retour
            </button>

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-8"
        >

          {/* SECTION ÉCOLE */}
          <div>

            <div className="
              flex
              items-center
              gap-3
              mb-5
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
                <School2 className="text-blue-600" />
              </div>

              <div>

                <h2 className="
                  text-lg
                  font-bold
                  text-gray-800
                  dark:text-white
                ">
                  Informations de l’école
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  Données générales de l’établissement
                </p>

              </div>

            </div>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            ">

              {/* NOM */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <label className="
                  text-sm
                  font-medium
                  text-gray-600
                  dark:text-gray-300
                ">
                  Nom de l’école
                </label>

                <input
                  type="text"
                  {...register("schoolName", {
                    required: "Nom obligatoire",
                  })}
                  className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-700
                    text-gray-800
                    dark:text-white
                    outline-none
                    focus:ring-2
                    focus:ring-sky-500
                  "
                />

                {errors.schoolName && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.schoolName.message}
                  </p>
                )}

              </div>

              {/* EMAIL */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <label className="
                  text-sm
                  font-medium
                  text-gray-600
                  dark:text-gray-300
                  flex
                  items-center
                  gap-2
                ">
                  <Mail size={16} />
                  Email
                </label>

                <input
                  type="email"
                  {...register("email")}
                  className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-700
                    text-gray-800
                    dark:text-white
                    outline-none
                    focus:ring-2
                    focus:ring-sky-500
                  "
                />

              </div>

              {/* PHONE */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <label className="
                  text-sm
                  font-medium
                  text-gray-600
                  dark:text-gray-300
                  flex
                  items-center
                  gap-2
                ">
                  <Phone size={16} />
                  Téléphone
                </label>

                <input
                  type="text"
                  {...register("phone")}
                  className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-700
                    text-gray-800
                    dark:text-white
                    outline-none
                    focus:ring-2
                    focus:ring-sky-500
                  "
                />

              </div>

              {/* WEBSITE */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <label className="
                  text-sm
                  font-medium
                  text-gray-600
                  dark:text-gray-300
                  flex
                  items-center
                  gap-2
                ">
                  <Globe size={16} />
                  Site web
                </label>

                <input
                  type="text"
                  {...register("website")}
                  className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-700
                    text-gray-800
                    dark:text-white
                    outline-none
                    focus:ring-2
                    focus:ring-sky-500
                  "
                />

              </div>

              {/* ADRESSE */}
              <div className="
                md:col-span-2
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <label className="
                  text-sm
                  font-medium
                  text-gray-600
                  dark:text-gray-300
                  flex
                  items-center
                  gap-2
                ">
                  <MapPin size={16} />
                  Adresse
                </label>

                <input
                  type="text"
                  {...register("address")}
                  className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-700
                    text-gray-800
                    dark:text-white
                    outline-none
                    focus:ring-2
                    focus:ring-sky-500
                  "
                />

              </div>

            </div>

          </div>

          {/* PROMOTEUR */}
          <div>

            <div className="
              flex
              items-center
              gap-3
              mb-5
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
                <User className="text-green-600" />
              </div>

              <div>

                <h2 className="
                  text-lg
                  font-bold
                  text-gray-800
                  dark:text-white
                ">
                  Informations du promoteur
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  Responsable principal de l’école
                </p>

              </div>

            </div>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            ">

              {/* PROMOTEUR */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <label className="
                  text-sm
                  font-medium
                  text-gray-600
                  dark:text-gray-300
                ">
                  Nom promoteur
                </label>

                <input
                  type="text"
                  {...register("promoter")}
                  className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-700
                    text-gray-800
                    dark:text-white
                    outline-none
                    focus:ring-2
                    focus:ring-sky-500
                  "
                />

              </div>

              {/* SEXE */}
              <div className="
                bg-gray-50
                dark:bg-gray-700/40
                p-5
                rounded-2xl
              ">

                <label className="
                  text-sm
                  font-medium
                  text-gray-600
                  dark:text-gray-300
                ">
                  Sexe
                </label>

                <div className="
                  flex
                  gap-4
                  mt-3
                ">

                  <label className="flex-1 cursor-pointer">

                    <input
                      type="radio"
                      value="M"
                      {...register("sexe")}
                      className="hidden peer"
                    />

                    <div className="
                      p-3
                      text-center
                      rounded-xl
                      border
                      border-gray-300
                      dark:border-gray-600
                      peer-checked:bg-blue-600
                      peer-checked:text-white
                      transition
                    ">
                      Masculin
                    </div>

                  </label>

                  <label className="flex-1 cursor-pointer">

                    <input
                      type="radio"
                      value="F"
                      {...register("sexe")}
                      className="hidden peer"
                    />

                    <div className="
                      p-3
                      text-center
                      rounded-xl
                      border
                      border-gray-300
                      dark:border-gray-600
                      peer-checked:bg-pink-600
                      peer-checked:text-white
                      transition
                    ">
                      Féminin
                    </div>

                  </label>

                </div>

              </div>

            </div>

          </div>

          {/* FOOTER */}
          <div className="
            flex
            justify-end
            pt-4
            border-t
            border-gray-100
            dark:border-gray-700
          ">

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                flex
                items-center
                gap-2
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-3
                rounded-2xl
                transition
                disabled:opacity-50
                cursor-pointer
              "
            >
              <Save size={18} />

              {isSubmitting
                ? "Modification..."
                : "Enregistrer les modifications"}
            </button>

          </div>

        </form>

      </motion.div>

    </div>
  );
};

export default EditSchool;