import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  Save,
  AlertCircle,
  School2,
  BookOpen,
  Sparkles,
  Layers3,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllCycle } from "../../features/cycle/cycleSlice";
import { getAllSection } from "../../features/section/sectionSlice";
import { addNewOption } from "../../features/option/optionSlice";
import { toast } from "react-toastify";

const AddOption = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cycles, loading } = useSelector(
    (state) => state.cycle
  );

  const { sections } = useSelector(
    (state) => state.section
  );

  useEffect(() => {
    dispatch(getAllCycle());
    dispatch(getAllSection());
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
      sectionId: "",
      name: "",
    },
  });

  const selectedCycle = watch("cycleId");
  const selectedSection = watch("sectionId");
  const optionName = watch("name");

  /*
  |--------------------------------------------------------------------------
  | FILTERED SECTION
  |--------------------------------------------------------------------------
  */

  const filteredSections = useMemo(() => {
    if (!selectedCycle) return [];

    return sections.filter(
      (s) => s.cycleId?._id === selectedCycle
    );
  }, [sections, selectedCycle]);

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (data) => {
       const finalData = {
         ...data,
       };
      
           dispatch(addNewOption({ finalData, navigate, toast }));
   
   
       reset();
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
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

          <h2 className="mt-5 text-xl font-bold text-gray-700 dark:text-white">
            Chargement...
          </h2>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-10 px-4 md:px-8">

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          max-w-5xl
          mx-auto
          bg-white
          dark:bg-gray-900
          rounded-3xl
          shadow-2xl
          overflow-hidden
          border
          border-gray-100
          dark:border-gray-800
        "
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-r
            from-sky-900
            to-blue-700
            px-8
            py-8
            text-white
          "
        >

          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles className="w-40 h-40" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3">

                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur">
                  <BookOpen className="w-7 h-7" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold">
                    Nouvelle option
                  </h1>

                  <p className="text-blue-100 mt-1">
                    Création d’une option scolaire
                  </p>
                </div>

              </div>

            </div>

            <button
              onClick={() => navigate("/option-list")}
              className="
                flex
                items-center
                justify-center
                gap-2
                px-5
                py-3
                rounded-2xl
                bg-white/10
                hover:bg-white/20
                transition
                backdrop-blur
              "
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </button>

          </div>

        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-8"
        >

          {/* ================================================= */}
          {/* STEP INDICATOR */}
          {/* ================================================= */}

          <div className="grid grid-cols-3 gap-3">

            <div
              className={`
                rounded-2xl
                border
                p-4
                transition
                ${
                  selectedCycle
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200"
                }
              `}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${
                      selectedCycle
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  <School2 className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Étape 1
                  </p>

                  <h3 className="font-semibold text-sm">
                    Cycle
                  </h3>
                </div>

              </div>
            </div>

            <div
              className={`
                rounded-2xl
                border
                p-4
                transition
                ${
                  selectedSection
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-gray-50 border-gray-200"
                }
              `}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${
                      selectedSection
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  <Layers3 className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Étape 2
                  </p>

                  <h3 className="font-semibold text-sm">
                    Section
                  </h3>
                </div>

              </div>
            </div>

            <div
              className={`
                rounded-2xl
                border
                p-4
                transition
                ${
                  optionName
                    ? "bg-purple-50 border-purple-200"
                    : "bg-gray-50 border-gray-200"
                }
              `}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${
                      optionName
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Étape 3
                  </p>

                  <h3 className="font-semibold text-sm">
                    Validation
                  </h3>
                </div>

              </div>
            </div>

          </div>

          {/* ================================================= */}
          {/* CYCLE */}
          {/* ================================================= */}

          <div className="space-y-4">

            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                Sélection du cycle
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Seul le cycle Humanité peut avoir des options
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {cycles?.map((c) => {

                const isDisabled =
                  c.name?.toLowerCase() !==
                  "humanité";

                const isActive =
                  selectedCycle === c._id;

                return (
                  <label
                    key={c._id}
                    className={`
                      relative
                      rounded-2xl
                      border
                      p-4
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
                            bg-gradient-to-r
                            from-blue-600
                            to-sky-600
                            text-white
                            border-blue-600
                            shadow-xl
                            scale-[1.02]
                            cursor-pointer
                          `
                          : `
                            bg-white
                            dark:bg-gray-800
                            border-gray-200
                            dark:border-gray-700
                            hover:border-blue-400
                            hover:shadow-lg
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
                        required:
                          "Cycle obligatoire",
                      })}
                      className="hidden"
                    />

                    <div className="flex flex-col items-center gap-3">

                      <div
                        className={`
                          w-14
                          h-14
                          rounded-2xl
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
                        <School2 className="w-6 h-6" />
                      </div>

                      <div className="text-center">

                        <h3 className="font-bold text-sm">
                          {c.name}
                        </h3>

                        <p className="text-xs mt-1 opacity-80">
                          {isDisabled
                            ? "Indisponible"
                            : "Autorisé"}
                        </p>

                      </div>

                    </div>

                  </label>
                );
              })}

            </div>

            {errors.cycleId && (
              <p className="text-red-500 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.cycleId.message}
              </p>
            )}

          </div>

          {/* ================================================= */}
          {/* SECTION */}
          {/* ================================================= */}

          <div
            className="
              bg-gray-50
              dark:bg-gray-800/40
              rounded-3xl
              p-6
              border
              border-gray-100
              dark:border-gray-800
            "
          >

            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Section scolaire
            </label>

            <select
              disabled={!selectedCycle}
              className="
                w-full
                mt-3
                p-4
                rounded-2xl
                border
                bg-white
                dark:bg-gray-800
                dark:text-white
                focus:ring-4
                focus:ring-blue-100
                outline-none
                transition
                disabled:opacity-50
              "
              {...register("sectionId", {
                required:
                  "Section obligatoire",
              })}
            >
              <option value="">
                Choisir une section
              </option>

              {filteredSections.map((s) => (
                <option
                  key={s._id}
                  value={s._id}
                >
                  {s.name}
                </option>
              ))}

            </select>

            {errors.sectionId && (
              <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.sectionId.message}
              </p>
            )}

          </div>

          {/* ================================================= */}
          {/* OPTION NAME */}
          {/* ================================================= */}

          <div
            className="
              bg-gray-50
              dark:bg-gray-800/40
              rounded-3xl
              p-6
              border
              border-gray-100
              dark:border-gray-800
            "
          >

            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Nom de l’option
            </label>

            <input
              type="text"
              placeholder="Ex: Math-Physique, Bio-Chimie..."
              className="
                w-full
                mt-3
                p-4
                rounded-2xl
                border
                bg-white
                dark:bg-gray-800
                dark:text-white
                focus:ring-4
                focus:ring-blue-100
                outline-none
                transition
              "
              {...register("name", {
                required:
                  "Nom obligatoire",
              })}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.name.message}
              </p>
            )}

          </div>

          {/* ================================================= */}
          {/* BUTTON */}
          {/* ================================================= */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-gradient-to-r
              from-blue-600
              to-sky-600
              text-white
              py-4
              rounded-2xl
              text-lg
              font-bold
              hover:scale-[1.01]
              hover:shadow-xl
              transition-all
              disabled:opacity-50
            "
          >
            <Save className="w-5 h-5" />

            {isSubmitting
              ? "Création en cours..."
              : "Créer l’option"}
          </button>

        </form>

      </motion.div>
    </div>
  );
};

export default AddOption;