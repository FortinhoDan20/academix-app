import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Eye,
  EyeOff,
  Lock,
  User,
  Loader2,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { signIn } from "../../features/auth/authSlice";

const initialState = {
  nomUtilisateur: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formValue, setFormValue] = useState(initialState);

  const [errors, setErrors] = useState({});

  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { nomUtilisateur, password } = formValue;

  /* ================= INPUT CHANGE ================= */

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    let newErrors = {};

    if (!nomUtilisateur.trim()) {
      newErrors.nomUtilisateur =
        "Le nom utilisateur est obligatoire";
    }

    if (!password.trim()) {
      newErrors.password =
        "Le mot de passe est obligatoire";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
      toast.error("Aucune connexion Internet");
      return;
    }

    if (!validate()) return;

    console.log("data :", formValue)

    dispatch(
      signIn({
        formValue,
        navigate,
        toast,
      })
    );  
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        dark:bg-gray-950
        flex
        items-center
        justify-center
        p-6
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          w-full
          max-w-6xl
          bg-white
          dark:bg-gray-900
          rounded-[35px]
          overflow-hidden
          shadow-2xl
          grid
          lg:grid-cols-2
        "
      >
        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div
          className="
            hidden
            lg:flex
            flex-col
            justify-between
            bg-sky-950
            p-12
            relative
            overflow-hidden
          "
        >
          {/* EFFECT */}

          <div
            className="
              absolute
              top-0
              right-0
              w-80
              h-80
              bg-blue-500/20
              rounded-full
              blur-3xl
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-0
              w-80
              h-80
              bg-indigo-500/20
              rounded-full
              blur-3xl
            "
          />

          {/* LOGO */}

          <div className="relative z-10">
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-white/10
                backdrop-blur-xl
                flex
                items-center
                justify-center
                mb-8
              "
            >
              <GraduationCap
                size={42}
                className="text-white"
              />
            </div>

            <h1
              className="
                text-5xl
                font-bold
                text-white
                leading-tight
              "
            >
              ERP <br />
              Academix
            </h1>

            <p
              className="
                text-blue-100
                mt-6
                text-lg
                leading-relaxed
                max-w-md
              "
            >
              Plateforme intelligente de gestion
              scolaire, inscriptions, paiements,
              rapports et statistiques avancées.
            </p>
          </div>

          {/* FEATURES */}

          <div className="relative z-10 space-y-5">
            <Feature text="Gestion complète des élèves" />
            <Feature text="Paiements & caisse intelligente" />
            <Feature text="Rapports et statistiques" />
            <Feature text="Architecture SaaS multi-écoles" />
          </div>
        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div
          className="
            p-8
            md:p-14
            flex
            flex-col
            justify-center
          "
        >
          {/* MOBILE LOGO */}

          <div className="lg:hidden flex justify-center mb-8">
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-sky-950
                flex
                items-center
                justify-center
              "
            >
              <GraduationCap
                size={38}
                className="text-white"
              />
            </div>
          </div>

          {/* TITLE */}

          <div className="mb-10 text-center lg:text-left">
            <h2
              className="
                text-4xl
                font-bold
                text-gray-800
                dark:text-white
              "
            >
              Connexion
            </h2>

            <p className="text-gray-500 mt-3">
              Connectez-vous à votre espace scolaire
            </p>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* ================================================= */}
            {/* USERNAME */}
            {/* ================================================= */}

            <div className="space-y-2">
              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-200
                "
              >
                Nom utilisateur
              </label>

              <div
                className={`
                  group
                  relative
                  flex
                  items-center
                  h-[64px]
                  bg-white
                  dark:bg-gray-900
                  border-2
                  rounded-2xl
                  px-5
                  transition-all
                  duration-300
                  hover:border-sky-800
                  focus-within:border-sky-900
                  focus-within:shadow-[0_0_0_4px_rgba(15,23,42,0.08)]

                  ${
                    errors.nomUtilisateur
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }
                `}
              >
                {/* ICON */}

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-sky-50
                    dark:bg-sky-950/30
                    flex
                    items-center
                    justify-center
                    mr-4
                    transition
                    group-focus-within:bg-sky-900
                  "
                >
                  <User
                    size={20}
                    className="
                      text-sky-900
                      group-focus-within:text-white
                    "
                  />
                </div>

                {/* INPUT */}

                <input
                  type="text"
                  name="nomUtilisateur"
                  value={nomUtilisateur}
                  onChange={onInputChange}
                  placeholder="admin"
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-[15px]
                    font-medium
                    text-gray-800
                    dark:text-white
                    placeholder:text-gray-400
                  "
                />
              </div>

              {errors.nomUtilisateur && (
                <p className="text-red-500 text-sm">
                  {errors.nomUtilisateur}
                </p>
              )}
            </div>

            {/* ================================================= */}
            {/* PASSWORD */}
            {/* ================================================= */}

            <div className="space-y-2">
              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-200
                "
              >
                Mot de passe
              </label>

              <div
                className={`
                  group
                  relative
                  flex
                  items-center
                  h-[64px]
                  bg-white
                  dark:bg-gray-900
                  border-2
                  rounded-2xl
                  px-5
                  transition-all
                  duration-300
                  hover:border-sky-800
                  focus-within:border-sky-900
                  focus-within:shadow-[0_0_0_4px_rgba(15,23,42,0.08)]

                  ${
                    errors.password
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-700"
                  }
                `}
              >
                {/* ICON */}

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-sky-50
                    dark:bg-sky-950/30
                    flex
                    items-center
                    justify-center
                    mr-4
                    transition
                    group-focus-within:bg-sky-900
                  "
                >
                  <Lock
                    size={20}
                    className="
                      text-sky-900
                      group-focus-within:text-white
                    "
                  />
                </div>

                {/* INPUT */}

                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  placeholder="********"
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-[15px]
                    font-medium
                    text-gray-800
                    dark:text-white
                    placeholder:text-gray-400
                  "
                />

                {/* TOGGLE */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                    hover:text-sky-900
                    transition
                  "
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password}
                </p>
              )}
            </div>

            {/* OPTIONS */}

            <div
              className="
                flex
                items-center
                justify-between
                text-sm
              "
            >
              <label
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-600
                  dark:text-gray-300
                "
              >
                <input type="checkbox" />
                Se souvenir de moi
              </label>

              <button
                type="button"
                className="
                  text-sky-900
                  font-medium
                  hover:underline
                "
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-sky-950
                hover:bg-sky-900
                disabled:opacity-70
                text-white
                py-4
                rounded-2xl
                font-semibold
                transition-all
                duration-300
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-1
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          {/* FOOTER */}

          <div
            className="
              mt-10
              text-center
              text-sm
              text-gray-500
            "
          >
            © 2026 ERP Scolaire SaaS • Tous droits réservés
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

/* ================================================= */
/* FEATURE */
/* ================================================= */

const Feature = ({ text }) => (
  <div
    className="
      flex
      items-center
      gap-3
      text-blue-100
    "
  >
    <div
      className="
        w-2.5
        h-2.5
        rounded-full
        bg-blue-300
      "
    />

    <span className="text-sm">
      {text}
    </span>
  </div>
);