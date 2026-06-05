import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllYears } from "../../features/year/yearSlice";
import { getAllCycle } from "../../features/cycle/cycleSlice";
import { addNewFees } from "../../features/fees/feesSlice";
import { toast } from "react-toastify";

const AddFees = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allYears, loading } = useSelector((state) => state.year);
  const { cycles } = useSelector((state) => state.cycle);

  useEffect(() => {
    dispatch(getAllYears());
    dispatch(getAllCycle());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      cycleId: "",
      yearId: "",
      amount: "",
      feeType: "",
      otherMotif: "",
    },
  });

  const cycleId = watch("cycleId");
  const feeType = watch("feeType");

  const onSubmit = (data) => {
        const finalData = {
    ...data,
    otherMotif: data.otherMotif || null,
  };
    dispatch(addNewFees({ finalData, navigate, toast }));
  };

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

          <p className="text-gray-500 text-sm mt-2">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">
            <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
              Nouveau frais scolaire
            </h1>

            <button
              onClick={() => navigate("/fees-list")}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-5">
            {/* ================= CYCLE (COMPACT UX) ================= */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-white">
                Cycle scolaire
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {cycles?.map((c) => {
                  const isActive = cycleId === c._id;

                  return (
                    <label
                      key={c._id}
                      className={`
                        cursor-pointer
                        border
                        rounded-lg
                        px-3 py-2
                        text-center
                        text-sm
                        transition

                        ${
                          isActive
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={c._id}
                        {...register("cycleId", { required: true })}
                        className="hidden"
                      />

                      {c.name}
                    </label>
                  );
                })}
              </div>

              {errors.cycleId && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Cycle obligatoire
                </p>
              )}
            </div>

            {/* ================= YEAR ================= */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-white">
                Année scolaire
              </label>

              <select
                className="w-full mt-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                {...register("yearId", { required: true })}
              >
                <option value="">Choisir une année</option>
                {allYears?.map((y) => (
                  <option key={y._id} value={y._id}>
                    {y.year}
                  </option>
                ))}
              </select>

              {errors.yearId && (
                <p className="text-red-500 text-xs mt-1">Année obligatoire</p>
              )}
            </div>

            {/* ================= TYPE FRAIS (CLEAN CARDS) ================= */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-white">
                Type de frais
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                {[
                  { value: "inscription", label: "Inscription" },
                  { value: "scolaire", label: "Frais scolaire" },
                  { value: "other", label: "Autre" },
                ].map((t) => {
                  const isActive = feeType === t.value;

                  return (
                    <label
                      key={t.value}
                      className={`
                        cursor-pointer
                        border
                        rounded-lg
                        p-3
                        text-center
                        text-sm
                        transition

                        ${
                          isActive
                            ? "bg-gray-100 dark:bg-gray-700 border-blue-500"
                            : "border-gray-200 dark:border-gray-700"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={t.value}
                        {...register("feeType", { required: true })}
                        className="hidden"
                      />

                      {t.label}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= MOTIF ================= */}
            {feeType === "other" && (
              <input
                type="text"
                placeholder="Motif"
                className="w-full p-3 border rounded-lg"
                {...register("otherMotif", {
                  required: feeType === "other" ? "Motif obligatoire" : false,
                })}
              />
            )}

            {/* ================= AMOUNT ================= */}
            <input
              type="number"
              placeholder="Montant"
              className="w-full p-3 border rounded-lg"
              {...register("amount", { required: true })}
            />

            {/* ================= INFO SYSTEM FEE ================= */}
            {feeType === "inscription" && (
              <div className="bg-red-50 border border-red-300 p-4 rounded-lg text-sm text-red-700 flex items-start gap-2 shadow-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 text-red-600" />

                <span>
                  <strong>Attention :</strong> un frais système de{" "}
                  <strong>5$</strong> sera ajouté automatiquement.
                </span>
              </div>
            )}
            {/* ================= BUTTON ================= */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddFees;
