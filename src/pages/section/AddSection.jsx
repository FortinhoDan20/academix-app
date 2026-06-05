import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  School2,
  Layers3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllCycle } from "../../features/cycle/cycleSlice";
import { addNewSection } from "../../features/section/sectionSlice";
import { toast } from "react-toastify";

const AddSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cycles, loading } = useSelector(
    (state) => state.cycle
  );

  useEffect(() => {
    dispatch(getAllCycle());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      cycleId: "",
      name: "",
    },
  });

  const cycleId = watch("cycleId");

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
    };
   
        dispatch(addNewSection({ finalData, navigate, toast }));


    reset();
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

          <h2 className="mt-5 text-lg font-semibold text-gray-700 dark:text-white">
            Chargement des cycles...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-8">

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >

        {/* CARD */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">

          {/* HEADER */}
          <div
            className="
              relative
              overflow-hidden
              bg-gradient-to-r
              from-sky-900
              to-blue-700
              px-6
              md:px-8
              py-7
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div className="p-3 rounded-2xl bg-white/20 backdrop-blur">
                    <Layers3 className="w-7 h-7 text-white" />
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      Nouvelle section
                    </h1>

                    <p className="text-blue-100 text-sm mt-1">
                      Ajouter une nouvelle section académique
                    </p>
                  </div>

                </div>

              </div>

              <button
                onClick={() => navigate("/section-list")}
                className="
                  flex
                  items-center
                  gap-2
                  text-white/90
                  hover:text-white
                  bg-white/10
                  hover:bg-white/20
                  px-4
                  py-2
                  rounded-xl
                  transition
                  backdrop-blur
                "
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>

            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 space-y-8"
          >

            {/* SECTION TITLE */}
            <div className="flex items-center gap-3">

              <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                <School2 className="w-5 h-5" />
              </div>

              <div>
                <h2 className="font-bold text-gray-800 dark:text-white">
                  Informations de la section
                </h2>

                <p className="text-sm text-gray-500">
                  Complétez les informations ci-dessous
                </p>
              </div>

            </div>

          {/* ================= CYCLE ================= */}
          <div>

            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Cycle scolaire
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">

              {cycles?.map((c) => {

                // ✅ Seul HUMANITÉ est actif
                const isDisabled =
                  c.name?.toLowerCase() !== "humanité";

                const isActive = cycleId === c._id;

                return (
                  <label
                    key={c._id}
                    className={`
                      relative
                      rounded-2xl
                      border
                      px-4
                      py-4
                      text-center
                      transition-all
                      duration-200

                      ${
                        isDisabled
                          ? `
                            bg-gray-100
                            dark:bg-gray-800/40
                            border-gray-200
                            dark:border-gray-700
                            opacity-50
                            cursor-not-allowed
                          `
                          : isActive
                          ? `
                            bg-blue-600
                            text-white
                            border-blue-600
                            shadow-lg
                            scale-[1.02]
                            cursor-pointer
                          `
                          : `
                            bg-white
                            dark:bg-gray-800
                            border-gray-200
                            dark:border-gray-700
                            hover:border-blue-400
                            hover:shadow-md
                            cursor-pointer
                          `
                      }
                    `}
                  >

                    <input
                      type="radio"
                      value={c._id}
                      disabled={isDisabled}
                      {...register("cycleId", {
                        required: "Cycle obligatoire",
                      })}
                      className="hidden"
                    />

                    <div className="flex flex-col items-center gap-2">

                      <div
                        className={`
                          w-11
                          h-11
                          rounded-xl
                          flex
                          items-center
                          justify-center

                          ${
                            isDisabled
                              ? "bg-gray-200 text-gray-400"
                              : isActive
                              ? "bg-white/20"
                              : "bg-blue-50 text-blue-700"
                          }
                        `}
                      >
                        <School2 className="w-5 h-5" />
                      </div>

                      <span className="font-semibold text-sm">
                        {c.name}
                      </span>

                      {/* BADGE */}
                      {isDisabled ? (
                        <span
                          className="
                            text-[10px]
                            px-2
                            py-1
                            rounded-full
                            bg-gray-300
                            text-gray-600
                            font-medium
                          "
                        >
                          indisponible
                        </span>
                      ) : (
                        <span
                          className="
                            text-[10px]
                            px-2
                            py-1
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            font-medium
                          "
                        >
                          autorisé
                        </span>
                      )}

                    </div>

                  </label>
                );
              })}

            </div>

            {errors.cycleId && (
              <p className="mt-3 text-sm text-red-500 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.cycleId.message}
              </p>
            )}

          </div>

            {/* SECTION NAME */}
            <div>

              <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Nom de la section
              </label>

              <div className="mt-3">

                <input
                  type="text"
                  placeholder="Ex: Scientifique, Littéraire..."
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    border
                    bg-gray-50
                    dark:bg-gray-800
                    dark:text-white
                    border-gray-200
                    dark:border-gray-700
                    focus:outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                    transition
                  "
                  {...register("name", {
                    required: "Nom obligatoire",
                    minLength: {
                      value: 2,
                      message: "Minimum 2 caractères",
                    },
                  })}
                />

              </div>

              {errors.name && (
                <p className="mt-3 text-sm text-red-500 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </p>
              )}

            </div>

            {/* ACTIONS */}
            <div
              className="
                flex
                flex-col-reverse
                md:flex-row
                items-center
                justify-between
                gap-4
                pt-4
                border-t
                dark:border-gray-800
              "
            >

              <button
                type="button"
                onClick={() => navigate("/section-list")}
                className="
                  w-full
                  md:w-auto
                  px-6
                  py-3
                  rounded-2xl
                  border
                  border-gray-300
                  dark:border-gray-700
                  text-gray-700
                  dark:text-gray-200
                  hover:bg-gray-100
                  dark:hover:bg-gray-800
                  transition
                "
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  md:w-auto
                  flex
                  items-center
                  justify-center
                  gap-3
                  px-8
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-sky-700
                  hover:from-blue-700
                  hover:to-sky-800
                  text-white
                  font-semibold
                  shadow-lg
                  transition
                  disabled:opacity-50
                "
              >
                <Save className="w-5 h-5" />

                {isSubmitting
                  ? "Création..."
                  : "Créer la section"}
              </button>

            </div>

          </form>

        </div>

      </motion.div>

    </div>
  );
};

export default AddSection;