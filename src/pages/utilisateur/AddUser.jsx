import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  User,
  Mail,
  Shield,
  UserCog,
  Venus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ALL_ROLES = [
  {
    value: "",
    label: "Choisir un rôle",
  },
  {
    value: "super_admin",
    label: "Super Admin",
  },
  {
    value: "admin",
    label: "Administrateur",
  },
  {
    value: "manager",
    label: "Gestionnaire",
  },
  {
    value: "caissier",
    label: "Caissier",
  },
  {
    value: "secretaire",
    label: "Secrétaire",
  },
];

const AddUser = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const currentRole = user?.user?.role;

  const roles = useMemo(() => {
    if (currentRole === "super_admin") {
      return ALL_ROLES;
    }

    if (currentRole === "admin") {
      return ALL_ROLES.filter(
        (r) => r.value !== "super_admin"
      );
    }

    return ALL_ROLES.filter(
      (r) =>
        !["super_admin", "admin"].includes(r.value)
    );
  }, [currentRole]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    reset();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          max-w-5xl
          mx-auto
          bg-white
          dark:bg-slate-900
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* HEADER */}

        <div
          className="
            bg-gradient-to-r
            from-sky-900
            to-sky-700
            p-8
            text-white
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Création utilisateur
              </h1>

              <p className="text-sky-100 mt-2">
                Ajouter un nouvel utilisateur
                dans la plateforme
              </p>

            </div>

            <button
              onClick={() => navigate("/users")}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                bg-white/10
                rounded-xl
                hover:bg-white/20
                transition
              "
            >
              <ArrowLeft size={18} />
              Retour
            </button>

          </div>

        </div>

        {/* BODY */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8"
        >

          {/* USER CARD */}

          <div
            className="
              flex
              items-center
              gap-5
              mb-8
              p-5
              rounded-2xl
              bg-slate-50
              dark:bg-slate-800
            "
          >

            <div
              className="
                w-20
                h-20
                rounded-full
                bg-sky-100
                flex
                items-center
                justify-center
              "
            >
              <User
                size={35}
                className="text-sky-700"
              />
            </div>

            <div>

              <h3 className="font-bold text-lg dark:text-white">
                Nouvel utilisateur
              </h3>

              <p className="text-gray-500">
                Le mot de passe sera généré
                automatiquement puis envoyé
                par email.
              </p>

            </div>

          </div>

          {/* FORM GRID */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* NOM */}

            <InputField
              label="Nom complet"
              icon={User}
              register={register("name", {
                required: "Nom obligatoire",
              })}
              error={errors.name}
            />

            {/* EMAIL */}

            <InputField
              label="Adresse email"
              icon={Mail}
              register={register("email", {
                required: "Email obligatoire",
              })}
              error={errors.email}
            />

            {/* USERNAME */}

            <InputField
              label="Nom utilisateur"
              icon={UserCog}
              register={register(
                "nomUtilisateur",
                {
                  required:
                    "Nom utilisateur obligatoire",
                }
              )}
              error={errors.nomUtilisateur}
            />

            {/* ROLE */}

            <div>

              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Rôle
              </label>

              <div className="relative mt-2">

                <Shield
                  size={18}
                  className="
                    absolute
                    left-4
                    top-4
                    text-gray-400
                  "
                />

                <select
                  {...register("role", {
                    required:
                      "Veuillez sélectionner un rôle",
                  })}
                  className="
                    w-full
                    pl-11
                    p-3
                    rounded-xl
                    border
                    bg-gray-50
                    dark:bg-slate-800
                    dark:text-white
                  "
                >
                  {roles.map((role) => (
                    <option
                      key={role.value}
                      value={role.value}
                    >
                      {role.label}
                    </option>
                  ))}
                </select>

              </div>

            </div>

          </div>

          {/* SEXE */}

          <div className="mt-8">

            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Sexe
            </label>

            <div className="flex gap-4 mt-3">

              <label
                className="
                  flex
                  items-center
                  gap-2
                  border
                  px-5
                  py-3
                  rounded-xl
                  cursor-pointer
                "
              >
                <input
                  type="radio"
                  value="M"
                  {...register("sexe")}
                />

                <Venus size={18} />

                Masculin
              </label>

              <label
                className="
                  flex
                  items-center
                  gap-2
                  border
                  px-5
                  py-3
                  rounded-xl
                  cursor-pointer
                "
              >
                <input
                  type="radio"
                  value="F"
                  {...register("sexe")}
                />

                <Venus size={18} />

                Féminin
              </label>

            </div>

          </div>

          {/* INFO */}

          <div
            className="
              mt-8
              bg-blue-50
              border
              border-blue-200
              rounded-2xl
              p-5
            "
          >

            <div className="flex gap-3">

              <AlertCircle
                className="text-blue-600"
                size={20}
              />

              <div>

                <h4 className="font-semibold text-blue-700">
                  Information
                </h4>

                <p className="text-sm text-blue-600">
                  Après création du compte,
                  un mot de passe temporaire
                  sera envoyé automatiquement
                  à l'adresse email de
                  l'utilisateur.
                </p>

              </div>

            </div>

          </div>

          {/* BUTTON */}

          <div className="mt-8">

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                bg-sky-900
                hover:bg-sky-800
                text-white
                py-4
                rounded-2xl
                font-semibold
                transition
              "
            >
              <Save size={18} />

              {isSubmitting
                ? "Création..."
                : "Créer l'utilisateur"}
            </button>

          </div>

        </form>

      </motion.div>

    </div>
  );
};

const InputField = ({
  label,
  icon: Icon,
  register,
  error,
}) => (
  <div>

    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
      {label}
    </label>

    <div className="relative mt-2">

      <Icon
        size={18}
        className="
          absolute
          left-4
          top-4
          text-gray-400
        "
      />

      <input
        {...register}
        className="
          w-full
          pl-11
          p-3
          rounded-xl
          border
          bg-gray-50
          dark:bg-slate-800
          dark:text-white
        "
      />

    </div>

    {error && (
      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
        <AlertCircle size={14} />
        {error.message}
      </p>
    )}

  </div>
);

export default AddUser;