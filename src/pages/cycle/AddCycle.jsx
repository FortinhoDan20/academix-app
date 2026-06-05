import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addNewCycle } from "../../features/cycle/cycleSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddCycle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
    };

    dispatch(addNewCycle({ finalData, navigate, toast }));

    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-8">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          max-w-3xl
          mx-auto
          bg-white
          dark:bg-gray-900
          rounded-3xl
          overflow-hidden
          shadow-2xl
        "
      >

        {/* HEADER */}

        <div
          className="
            bg-gradient-to-r
            from-sky-900
            to-sky-700
            px-8
            py-8
            text-white
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <GraduationCap size={28} />
                </div>

                <div>

                  <h1 className="text-3xl font-bold">
                    Nouveau Cycle
                  </h1>

                  <p className="text-sky-100 mt-1">
                    Ajouter un cycle scolaire dans Academix ERP
                  </p>

                </div>

              </div>

            </div>

            <button
              onClick={() => navigate("/cycle-list")}
              className="
                flex
                items-center
                gap-2
                bg-white/10
                hover:bg-white/20
                px-4
                py-2
                rounded-xl
                transition
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
          className="p-8"
        >

          <div
            className="
              bg-gray-50
              dark:bg-gray-800/50
              border
              dark:border-gray-700
              rounded-2xl
              p-6
            "
          >

            <div className="mb-6">

              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                Informations du cycle
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Exemple : Maternelle, Primaire, Humanité...
              </p>

            </div>

            {/* NOM */}

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-300
                "
              >
                Nom du cycle
              </label>

              <div className="relative">

                <GraduationCap
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  placeholder="Ex : Humanité"
                  {...register("name", {
                    required: "Le nom du cycle est obligatoire",
                    minLength: {
                      value: 2,
                      message:
                        "Le nom doit contenir au moins 2 caractères",
                    },
                  })}
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-xl
                    border
                    bg-white
                    dark:bg-gray-900
                    dark:border-gray-700
                    dark:text-white
                    focus:ring-2
                    focus:ring-sky-500
                    outline-none
                    transition
                  "
                />

              </div>

              {errors.name && (

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-red-500
                    text-sm
                  "
                >

                  <AlertCircle size={16} />

                  <span>{errors.name.message}</span>

                </div>

              )}

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex justify-end mt-8">

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                flex
                items-center
                gap-3
                bg-sky-900
                hover:bg-sky-800
                disabled:opacity-50
                text-white
                px-8
                py-4
                rounded-2xl
                shadow-lg
                transition
              "
            >

              <Save size={18} />

              {isSubmitting
                ? "Création..."
                : "Créer le cycle"}

            </button>

          </div>

        </form>

      </motion.div>

    </div>
  );
};

export default AddCycle;