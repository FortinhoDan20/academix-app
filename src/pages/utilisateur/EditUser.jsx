import React from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Save,
  User2,
  Mail,
  Phone,
 Lock,
  ShieldCheck,
  School2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles = [
  "Super Admin",
  "Administrateur",
  "Comptable",
  "Secrétaire",
  "Opérateur",
];

const schools = [
  "Complexe Scolaire Les Élites",
  "Institut Nzambe Malamu",
  "Collège Saint Pierre",
];

const EditUser = () => {

  const navigate = useNavigate();

  // 👉 DONNÉES SIMULÉES
  const userData = {
    fullName: "Jean Mukendi",
    email: "jean@gmail.com",
    phone: "+243999000111",
    username: "jean.mukendi",
    sexe: "Masculin",
    role: "Administrateur",
    school: "Complexe Scolaire Les Élites",
    status: "Actif",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: userData,
  });

  const onSubmit = async (data) => {
    console.log(data);

    // 👉 API UPDATE USER

    alert("Utilisateur modifié avec succès");
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
          shadow-sm
          text-white
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
              <User2 size={35} />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Modifier utilisateur
              </h1>

              <p className="text-blue-100 mt-1">
                Modification des informations utilisateur
              </p>

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/users")}
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

            {/* INFOS PERSONNELLES */}
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                p-6
                shadow-sm
                border
                border-gray-100
                dark:border-gray-700
              "
            >

              <div className="mb-6">

                <h2
                  className="
                    text-xl
                    font-bold
                    text-gray-800
                    dark:text-white
                  "
                >
                  Informations personnelles
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Modifier les données principales de l’utilisateur
                </p>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* NOM */}
                <div>

                  <label
                    className="
                      text-sm
                      font-medium
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Nom complet
                  </label>

                  <div className="relative mt-2">

                    <User2
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
                      {...register("fullName", {
                        required: "Nom obligatoire",
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

                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}

                </div>

                {/* EMAIL */}
                <div>

                  <label
                    className="
                      text-sm
                      font-medium
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Email
                  </label>

                  <div className="relative mt-2">

                    <Mail
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
                      type="email"
                      {...register("email")}
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

                </div>

                {/* PHONE */}
                <div>

                  <label
                    className="
                      text-sm
                      font-medium
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Téléphone
                  </label>

                  <div className="relative mt-2">

                    <Phone
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
                      {...register("phone")}
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

                </div>

                {/* USERNAME */}
                <div>

                  <label
                    className="
                      text-sm
                      font-medium
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Nom utilisateur
                  </label>

                  <div className="relative mt-2">

                    <User2
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
                      {...register("username")}
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

                </div>

              </div>

            </div>

            {/* SEXE */}
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                p-6
                shadow-sm
                border
                border-gray-100
                dark:border-gray-700
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
                Sexe
              </h2>

              <div className="grid grid-cols-2 gap-4">

                <label className="cursor-pointer">

                  <input
                    type="radio"
                    value="Masculin"
                    {...register("sexe")}
                    className="hidden peer"
                  />

                  <div
                    className="
                      h-14
                      rounded-2xl
                      border
                      border-gray-200
                      dark:border-gray-700
                      bg-gray-50
                      dark:bg-gray-900
                      flex
                      items-center
                      justify-center
                      peer-checked:bg-sky-600
                      peer-checked:text-white
                      peer-checked:border-sky-600
                      transition
                    "
                  >
                    Masculin
                  </div>

                </label>

                <label className="cursor-pointer">

                  <input
                    type="radio"
                    value="Féminin"
                    {...register("sexe")}
                    className="hidden peer"
                  />

                  <div
                    className="
                      h-14
                      rounded-2xl
                      border
                      border-gray-200
                      dark:border-gray-700
                      bg-gray-50
                      dark:bg-gray-900
                      flex
                      items-center
                      justify-center
                      peer-checked:bg-pink-600
                      peer-checked:text-white
                      peer-checked:border-pink-600
                      transition
                    "
                  >
                    Féminin
                  </div>

                </label>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* ROLE */}
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                p-6
                shadow-sm
                border
                border-gray-100
                dark:border-gray-700
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
                Permissions
              </h2>

              {/* ROLE */}
              <div className="mb-5">

                <label
                  className="
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Rôle utilisateur
                </label>

                <div className="relative mt-2">

                  <ShieldCheck
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
                    {...register("role")}
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

                    {roles.map((role) => (
                      <option key={role}>
                        {role}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

              {/* SCHOOL */}
              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  École
                </label>

                <div className="relative mt-2">

                  <School2
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
                    {...register("school")}
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

                    {schools.map((school) => (
                      <option key={school}>
                        {school}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

            </div>

            {/* PASSWORD */}
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                p-6
                shadow-sm
                border
                border-gray-100
                dark:border-gray-700
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
                Sécurité
              </h2>

              <label
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-300
                "
              >
                Nouveau mot de passe
              </label>

              <div className="relative mt-2">

                <Lock
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
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
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

              <p className="text-xs text-gray-500 mt-2">
                Laissez vide si vous ne souhaitez pas modifier le mot de passe.
              </p>

            </div>

            {/* SAVE BUTTON */}
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
                ? "Modification..."
                : "Enregistrer les modifications"}

            </button>

          </div>

        </div>

      </form>

    </div>
  );
};

export default EditUser;