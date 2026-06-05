import React from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Save,
  Wallet,
  CalendarDays,
  Layers3,
  FileText,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const tranches = [
  "1ère Tranche",
  "2ème Tranche",
  "3ème Tranche",
];

const NewPaid = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      paymentMode: "mensuel",
    },
  });

  const paymentMode = watch("paymentMode");

  const onSubmit = async (data) => {

    console.log(data);

    // 👉 API PAYMENT

    alert("Paiement enregistré avec succès");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div
        className="
          bg-gradient-to-r
          from-sky-900
          to-sky-700
          rounded-3xl
          p-6
          text-white
          shadow-sm
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
          "
        >

          {/* TITLE */}
          <div className="flex items-center gap-4">

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-white/10
                border
                border-white/20
                flex
                items-center
                justify-center
              "
            >
              <Wallet size={36} />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Nouveau paiement
              </h1>

              <p className="text-blue-100 mt-1">
                Enregistrement d’un paiement scolaire
              </p>

            </div>

          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
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

        </div>

      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)}>

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
          "
        >

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-6">

            {/* MODE DE PAIEMENT */}
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                p-6
                border
                border-gray-100
                dark:border-gray-700
                shadow-sm
              "
            >

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-800
                  dark:text-white
                  mb-5
                "
              >
                Mode de paiement
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* MENSUEL */}
                <label className="cursor-pointer">

                  <input
                    type="radio"
                    value="mensuel"
                    {...register("paymentMode")}
                    className="hidden peer"
                  />

                  <div
                    className="
                      h-16
                      rounded-2xl
                      border
                      border-gray-200
                      dark:border-gray-700
                      bg-gray-50
                      dark:bg-gray-900
                      flex
                      items-center
                      justify-center
                      gap-3
                      peer-checked:bg-sky-600
                      peer-checked:text-white
                      peer-checked:border-sky-600
                      transition
                    "
                  >
                    <CalendarDays size={20} />
                    Mensuel
                  </div>

                </label>

                {/* TRANCHE */}
                <label className="cursor-pointer">

                  <input
                    type="radio"
                    value="tranche"
                    {...register("paymentMode")}
                    className="hidden peer"
                  />

                  <div
                    className="
                      h-16
                      rounded-2xl
                      border
                      border-gray-200
                      dark:border-gray-700
                      bg-gray-50
                      dark:bg-gray-900
                      flex
                      items-center
                      justify-center
                      gap-3
                      peer-checked:bg-green-600
                      peer-checked:text-white
                      peer-checked:border-green-600
                      transition
                    "
                  >
                    <Layers3 size={20} />
                    Par tranche
                  </div>

                </label>

                {/* INSCRIPTION */}
                <label className="cursor-pointer">

                  <input
                    type="radio"
                    value="inscription"
                    {...register("paymentMode")}
                    className="hidden peer"
                  />

                  <div
                    className="
                      h-16
                      rounded-2xl
                      border
                      border-gray-200
                      dark:border-gray-700
                      bg-gray-50
                      dark:bg-gray-900
                      flex
                      items-center
                      justify-center
                      gap-3
                      peer-checked:bg-purple-600
                      peer-checked:text-white
                      peer-checked:border-purple-600
                      transition
                    "
                  >
                    <FileText size={20} />
                    Inscription
                  </div>

                </label>

              </div>

            </div>

            {/* INFORMATIONS */}
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                p-6
                border
                border-gray-100
                dark:border-gray-700
                shadow-sm
              "
            >

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-800
                  dark:text-white
                  mb-5
                "
              >
                Informations du paiement
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* MOIS */}
                {paymentMode === "mensuel" && (
                  <div>

                    <label
                      className="
                        text-sm
                        font-medium
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      Mois concerné
                    </label>

                    <div className="relative mt-2">

                      <CalendarDays
                        size={18}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                        "
                      />

                      <select
                        {...register("month", {
                          required: "Veuillez choisir un mois",
                        })}
                        className="
                          w-full
                          h-12
                          rounded-2xl
                          border
                          border-gray-200
                          dark:border-gray-700
                          bg-gray-50
                          dark:bg-gray-900
                          pl-11
                          pr-4
                          outline-none
                          focus:ring-2
                          focus:ring-sky-500
                        "
                      >

                        <option value="">
                          Choisir un mois
                        </option>

                        {months.map((month) => (
                          <option key={month}>
                            {month}
                          </option>
                        ))}

                      </select>

                    </div>

                    {errors.month && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.month.message}
                      </p>
                    )}

                  </div>
                )}

                {/* TRANCHE */}
                {paymentMode === "tranche" && (
                  <div>

                    <label
                      className="
                        text-sm
                        font-medium
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      Tranche concernée
                    </label>

                    <div className="relative mt-2">

                      <Layers3
                        size={18}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                        "
                      />

                      <select
                        {...register("tranche", {
                          required: "Veuillez choisir une tranche",
                        })}
                        className="
                          w-full
                          h-12
                          rounded-2xl
                          border
                          border-gray-200
                          dark:border-gray-700
                          bg-gray-50
                          dark:bg-gray-900
                          pl-11
                          pr-4
                          outline-none
                          focus:ring-2
                          focus:ring-green-500
                        "
                      >

                        <option value="">
                          Choisir une tranche
                        </option>

                        {tranches.map((tranche) => (
                          <option key={tranche}>
                            {tranche}
                          </option>
                        ))}

                      </select>

                    </div>

                    {errors.tranche && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.tranche.message}
                      </p>
                    )}

                  </div>
                )}

                {/* MONTANT */}
                <div>

                  <label
                    className="
                      text-sm
                      font-medium
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Montant payé
                  </label>

                  <div className="relative mt-2">

                    <DollarSign
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
                      type="number"
                      placeholder="Ex: 150000"
                      {...register("amount", {
                        required: "Montant obligatoire",
                      })}
                      className="
                        w-full
                        h-12
                        rounded-2xl
                        border
                        border-gray-200
                        dark:border-gray-700
                        bg-gray-50
                        dark:bg-gray-900
                        pl-11
                        pr-4
                        outline-none
                        focus:ring-2
                        focus:ring-sky-500
                      "
                    />

                  </div>

                  {errors.amount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.amount.message}
                    </p>
                  )}

                </div>

              </div>

              {/* MOTIF */}
              <div className="mt-5">

                <label
                  className="
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Motif du paiement
                </label>

                <div className="relative mt-2">

                  <FileText
                    size={18}
                    className="
                      absolute
                      left-4
                      top-4
                      text-gray-400
                    "
                  />

                  <textarea
                    rows={4}
                    placeholder="Ex: Paiement frais scolaires..."
                    {...register("motif", {
                      required: "Motif obligatoire",
                    })}
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-gray-200
                      dark:border-gray-700
                      bg-gray-50
                      dark:bg-gray-900
                      pl-11
                      pr-4
                      py-3
                      outline-none
                      resize-none
                      focus:ring-2
                      focus:ring-sky-500
                    "
                  />

                </div>

                {errors.motif && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.motif.message}
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* RESUME */}
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                p-6
                border
                border-gray-100
                dark:border-gray-700
                shadow-sm
              "
            >

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-800
                  dark:text-white
                  mb-5
                "
              >
                Résumé
              </h2>

              <div className="space-y-4">

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    p-4
                    rounded-2xl
                    bg-gray-50
                    dark:bg-gray-900
                  "
                >

                  <span className="text-gray-500">
                    Mode choisi
                  </span>

                  <span className="font-semibold text-gray-800 dark:text-white">

                    {paymentMode === "mensuel" && "Mensuel"}

                    {paymentMode === "tranche" && "Par tranche"}

                    {paymentMode === "inscription" && "Inscription"}

                  </span>

                </div>

                <div
                  className="
                    p-4
                    rounded-2xl
                    bg-blue-50
                    text-blue-700
                    text-sm
                  "
                >
                  Les paiements seront automatiquement liés
                  à l’élève et à l’année scolaire.
                </div>

              </div>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                h-14
                rounded-2xl
                bg-sky-700
                hover:bg-sky-800
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                transition
              "
            >

              <Save size={18} />

              {isSubmitting
                ? "Enregistrement..."
                : "Enregistrer le paiement"}

            </button>

          </div>

        </div>

      </form>

    </div>
  );
};

export default NewPaid;