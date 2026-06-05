import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  School2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCycle } from "../../features/cycle/cycleSlice";
import { addNewClassroom } from "../../features/classroom/classroomSlice";
import { toast } from "react-toastify";

const sections = [
  { _id: "1", name: "Scientifique" },
  { _id: "2", name: "Littéraire" },
];

const options = [
  { _id: "1", name: "Math-Info" },
  { _id: "2", name: "Biologie-Chimie" },
  { _id: "3", name: "Latin-Philo" },
];

const AddClassroom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cycles, loading } = useSelector(
    (state) => state.cycle
  );

  const [selectedCycle, setSelectedCycle] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      cycleId: "",
      sectionId: "",
      optionId: "",
      name: "",
      nombrePlace: ""
    },
  });

  /*
  |--------------------------------------------------------------------------
  | GET CYCLES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(getAllCycle());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | RESET SECTION & OPTION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (selectedCycle?.name !== "Humanité") {
      setValue("sectionId", "");
      setValue("optionId", "");
    }
  }, [selectedCycle, setValue]);

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (data) => {
    const finalData = {
    ...data,
    sectionId: data.sectionId || null,
    optionId: data.optionId || null,
  };



    dispatch(addNewClassroom({finalData, navigate, toast }))
    /*
      Exemple :

      {
        cycleId: "687shsh",
        cycleName: "Humanité",
        sectionId: "1",
        optionId: "2",
        className: "1ère Scientifique"
      }
    */
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="
              w-16
              h-16
              border-4
              border-sky-200
              border-t-sky-900
              rounded-full
              mx-auto
            "
          />

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="
              mt-6
              text-xl
              font-semibold
              text-gray-700
              dark:text-white
            "
          >
            Chargement des cycles...
          </motion.h2>

          <p className="text-gray-500 text-sm mt-2">
            Veuillez patienter
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6">

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          max-w-2xl
          mx-auto
          bg-white
          dark:bg-gray-800
          rounded-2xl
          shadow-xl
          overflow-hidden
        "
      >

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b dark:border-gray-700">

          <div className="flex items-center gap-3">

            <div className="bg-blue-100 text-blue-700 p-2 rounded-xl">
              <School2 className="w-6 h-6" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Nouvelle salle de classe
              </h1>

              <p className="text-sm text-gray-500">
                Ajouter une nouvelle classe scolaire
              </p>
            </div>

          </div>

          <button
            onClick={() => navigate("/classroom-list")}
            className="
              flex
              items-center
              gap-1
              text-gray-500
              hover:text-blue-600
              transition
            "
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-6"
        >

          {/* CYCLE */}
          <div>

            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Cycle scolaire
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">

              {cycles?.map((c) => (

                <label
                  key={c._id}
                  onClick={() =>
                    setSelectedCycle({
                      id: c._id,
                      name: c.name,
                    })
                  }
                  className={`
                    border
                    rounded-xl
                    p-3
                    text-center
                    cursor-pointer
                    transition-all
                    duration-200
                    font-medium

                    ${
                      selectedCycle?.id === c._id
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-gray-50 dark:bg-gray-700 dark:text-white hover:border-blue-400"
                    }
                  `}
                >

                  <input
                    type="radio"
                    value={c._id}
                    className="hidden"
                    {...register("cycleId", {
                      required: "Cycle obligatoire",
                    })}
                  />

                  {c.name}

                </label>
              ))}
            </div>

            {errors.cycleId && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.cycleId.message}
              </p>
            )}

          </div>

          {/* HUMANITÉ */}
          {selectedCycle?.name === "Humanité" && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                space-y-5
                bg-blue-50
                dark:bg-gray-900
                border
                border-blue-100
                dark:border-gray-700
                p-5
                rounded-2xl
              "
            >

              {/* SECTION */}
              <div>

                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Section
                </label>

                <select
                  className="
                    w-full
                    mt-2
                    p-3
                    border
                    rounded-xl
                    bg-gray-50
                    dark:bg-gray-700
                    dark:text-white
                  "
                  {...register("sectionId", {
                    required:
                      selectedCycle?.name === "Humanité"
                        ? "Section obligatoire"
                        : false,
                  })}
                >

                  <option value="">
                    Choisir une section
                  </option>

                  {sections.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}

                </select>

                {errors.sectionId && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.sectionId.message}
                  </p>
                )}

              </div>

              {/* OPTION */}
              <div>

                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Option
                </label>

                <select
                  className="
                    w-full
                    mt-2
                    p-3
                    border
                    rounded-xl
                    bg-gray-50
                    dark:bg-gray-700
                    dark:text-white
                  "
                  {...register("optionId", {
                    required:
                      selectedCycle?.name === "Humanité"
                        ? "Option obligatoire"
                        : false,
                  })}
                >

                  <option value="">
                    Choisir une option
                  </option>

                  {options.map((o) => (
                    <option key={o._id} value={o._id}>
                      {o.name}
                    </option>
                  ))}

                </select>

                {errors.optionId && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.optionId.message}
                  </p>
                )}

              </div>

            </motion.div>
          )}

          {/* NOM CLASSE */}
          <div>

            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Nom de la classe
            </label>

            <input
              type="text"
              placeholder="Ex: 1ère A"
              className="
                w-full
                mt-2
                p-3
                border
                rounded-xl
                bg-gray-50
                dark:bg-gray-700
                dark:text-white
              "
              {...register("name", {
                required: "Nom de la classe obligatoire",
              })}
            />



          </div>

            {/* NOMBRE DE PLACE EN CLASSE */}
          <div>

            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Effectif en classe
            </label>

            <input
              type="number"
              placeholder="Ex: 000"
              className="
                w-full
                mt-2
                p-3
                border
                rounded-xl
                bg-gray-50
                dark:bg-gray-700
                dark:text-white
              "
              {...register("nombrePlace", {
                required: "Nombre de place obligatoire",
              })}
            />



          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-semibold
            "
          >

            <Save className="w-5 h-5" />

            {isSubmitting
              ? "Création..."
              : "Créer la classe"}

          </button>

        </form>
      </motion.div>
    </div>
  );
};

export default AddClassroom;