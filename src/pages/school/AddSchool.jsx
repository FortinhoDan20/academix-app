import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddSchool = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const { register, handleSubmit } = useForm();

  const steps = [
    "École",
    "Promoteur",
    "Compte"
  ];

  // ✅ SUBMIT FINAL
  const onSubmit = (data) => {

    // 🔒 bloque submit avant la dernière étape
    if (step !== 4) return;

    console.log(data);

    alert("École créée avec succès");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
      >

        {/* HEADER */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">

          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Création d’une école
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Ajoutez une nouvelle école sur la plateforme
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/list-school")}
              className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition cursor-pointer"
            >
              <ArrowLeft size={18} />
              Retour
            </button>

          </div>

          {/* STEP INDICATOR */}
          <div className="flex items-center justify-between mt-8">

            {steps.map((s, i) => (

              <div
                key={i}
                className="flex items-center flex-1"
              >

                <div className="flex flex-col items-center relative">

                  {/* CIRCLE */}
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      text-sm font-bold transition-all duration-300
                      ${
                        step >= i + 1
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                      }
                    `}
                  >
                    {i + 1}
                  </div>

                  {/* TITLE */}
                  <span
                    className={`
                      mt-2 text-sm font-medium
                      ${
                        step >= i + 1
                          ? "text-blue-600"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {s}
                  </span>

                </div>

                {/* LINE */}
                {i !== steps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-1 mx-3 rounded-full transition-all
                      ${
                        step > i + 1
                          ? "bg-blue-600"
                          : "bg-gray-200 dark:bg-gray-700"
                      }
                    `}
                  />
                )}

              </div>
            ))}

          </div>

        </div>

        {/* FORM */}
        <form

          onSubmit={handleSubmit(onSubmit)}

          // 🔒 bloque Enter partout
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}

          className="p-6"
        >

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 && (

              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >

                <div className="mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Informations de l’école
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Renseignez les informations principales de l’établissement.
                  </p>
                </div>

                {/* NOM ECOLE */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">

                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Nom de l’école
                  </label>

                  <input
                    {...register("schoolName")}
                    placeholder="Collège Saint Agathe"
                    className="
                      w-full p-3 rounded-xl
                      bg-white dark:bg-gray-700
                      border border-gray-200 dark:border-gray-600
                      text-gray-800 dark:text-white
                      outline-none transition
                      focus:ring-2 focus:ring-blue-500
                    "
                  />

                </div>

                {/* PHONE + EMAIL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">

                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Téléphone
                    </label>

                    <input
                      {...register("phone")}
                      placeholder="+243..."
                      className="
                        w-full p-3 rounded-xl
                        bg-white dark:bg-gray-700
                        border border-gray-200 dark:border-gray-600
                        text-gray-800 dark:text-white
                        outline-none transition
                        focus:ring-2 focus:ring-blue-500
                      "
                    />

                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">

                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Email
                    </label>

                    <input
                      {...register("email")}
                      placeholder="school@mail.com"
                      className="
                        w-full p-3 rounded-xl
                        bg-white dark:bg-gray-700
                        border border-gray-200 dark:border-gray-600
                        text-gray-800 dark:text-white
                        outline-none transition
                        focus:ring-2 focus:ring-blue-500
                      "
                    />

                  </div>

                </div>

                {/* ADRESSE */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">

                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Adresse
                  </label>

                  <input
                    {...register("address")}
                    placeholder="Adresse complète"
                    className="
                      w-full p-3 rounded-xl
                      bg-white dark:bg-gray-700
                      border border-gray-200 dark:border-gray-600
                      text-gray-800 dark:text-white
                      outline-none transition
                      focus:ring-2 focus:ring-blue-500
                    "
                  />

                </div>

              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (

              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >

                <div className="mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Informations du promoteur
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Ajoutez les informations du responsable de l’école.
                  </p>
                </div>

                {/* NOM */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">

                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Nom promoteur
                  </label>

                  <input
                    {...register("promoterName")}
                    placeholder="Nom complet"
                    className="
                      w-full p-3 rounded-xl
                      bg-white dark:bg-gray-700
                      border border-gray-200 dark:border-gray-600
                      text-gray-800 dark:text-white
                      outline-none transition
                      focus:ring-2 focus:ring-blue-500
                    "
                  />

                </div>

                {/* SEXE */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">

                  <label className="block text-sm font-medium text-gray-500 mb-3">
                    Sexe
                  </label>

                  <div className="grid grid-cols-2 gap-4">

                    <label className="cursor-pointer">

                      <input
                        type="radio"
                        value="M"
                        {...register("sexe")}
                        className="hidden peer"
                      />

                      <div className="
                        p-3 rounded-xl border text-center
                        transition-all duration-200
                        peer-checked:bg-blue-600
                        peer-checked:text-white
                        peer-checked:border-blue-600
                      ">
                        Masculin
                      </div>

                    </label>

                    <label className="cursor-pointer">

                      <input
                        type="radio"
                        value="F"
                        {...register("sexe")}
                        className="hidden peer"
                      />

                      <div className="
                        p-3 rounded-xl border text-center
                        transition-all duration-200
                        peer-checked:bg-pink-600
                        peer-checked:text-white
                        peer-checked:border-pink-600
                      ">
                        Féminin
                      </div>

                    </label>

                  </div>

                </div>

              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (

              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >

                <div className="mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Compte utilisateur
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Création du compte administrateur de l’école.
                  </p>
                </div>

                {/* USERNAME */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">

                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Nom utilisateur
                  </label>

                  <input
                    {...register("username")}
                    placeholder="username"
                    className="
                      w-full p-3 rounded-xl
                      bg-white dark:bg-gray-700
                      border border-gray-200 dark:border-gray-600
                      text-gray-800 dark:text-white
                      outline-none transition
                      focus:ring-2 focus:ring-blue-500
                    "
                  />

                </div>

                {/* PASSWORD */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">

                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Mot de passe
                  </label>

                  <input
                    type="password"
                    {...register("password")}
                    placeholder="********"
                    className="
                      w-full p-3 rounded-xl
                      bg-white dark:bg-gray-700
                      border border-gray-200 dark:border-gray-600
                      text-gray-800 dark:text-white
                      outline-none transition
                      focus:ring-2 focus:ring-blue-500
                    "
                  />

                </div>

                {/* INFO */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">

                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Le compte sera automatiquement créé avec le rôle :
                    <span className="font-semibold">
                      {" "}Administrateur école
                    </span>
                  </p>

                </div>

              </motion.div>
            )}

          </AnimatePresence>

          {/* FOOTER */}
          <div className="flex justify-between mt-8">

            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="
                  px-5 py-2.5 rounded-xl
                  bg-gray-200 dark:bg-gray-700
                  text-gray-700 dark:text-gray-200
                  hover:bg-gray-300 dark:hover:bg-gray-600
                  transition
                "
              >
                Retour
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (

              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="
                  px-5 py-2.5 rounded-xl
                  bg-blue-600 hover:bg-blue-700
                  text-white
                  flex items-center gap-2
                  transition
                  shadow-md hover:shadow-lg
                "
              >
                Suivant
                <ArrowRight size={16} />
              </button>

            ) : (

              <button
                type="submit"
                className="
                  px-5 py-2.5 rounded-xl
                  bg-green-600 hover:bg-green-700
                  text-white
                  flex items-center gap-2
                  transition
                  shadow-md hover:shadow-lg
                "
              >
                <Save size={16} />
                Créer l’école
              </button>

            )}

          </div>

        </form>

      </motion.div>
    </div>
  );
};

export default AddSchool;