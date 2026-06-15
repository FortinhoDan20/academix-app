import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  User,
  Users,
  GraduationCap,
  Phone,
  Calendar,
  School,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllCycle } from "../../features/cycle/cycleSlice";
import { getAllSection } from "../../features/section/sectionSlice";
import { getAllYears } from "../../features/year/yearSlice";
import { getAllOptions } from "../../features/option/optionSlice";
import { getAllClassrooms } from "../../features/classroom/classroomSlice";
import { addNewStudent } from "../../features/student/studentSlice";
import { toast } from "react-toastify";

/* ================= COMPONENT ================= */

export default function NewStudent() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const { cycles = [] } = useSelector((state) => state.cycle);

  const { sections = [] } = useSelector(
    (state) => state.section
  );

  const { allYears = [] } = useSelector(
    (state) => state.year
  );

  const { options = [] } = useSelector(
    (state) => state.option
  );

  const { classrooms = [] } = useSelector(
    (state) => state.classroom
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      cycleId: "",
      sectionId: "",
      optionId: "",
      classroomId: "",
    },
  });

  /*
  |--------------------------------------------------------------------------
  | WATCH
  |--------------------------------------------------------------------------
  */

  const selectedCycle = watch("cycleId");

  const selectedSection = watch("sectionId");

  const selectedOption = watch("optionId");

  /*
  |--------------------------------------------------------------------------
  | GET SELECTED CYCLE
  |--------------------------------------------------------------------------
  */

  const selectedCycleObj = useMemo(() => {
    return cycles?.find(
      (c) => c._id === selectedCycle
    );
  }, [cycles, selectedCycle]);

  /*
  |--------------------------------------------------------------------------
  | CHECK HUMANITE
  |--------------------------------------------------------------------------
  */

  const isHumanite =
    selectedCycleObj?.name
      ?.toLowerCase()
      ?.trim() === "humanité";

  /*
  |--------------------------------------------------------------------------
  | FILTER SECTIONS
  |--------------------------------------------------------------------------
  */

  const filteredSections = useMemo(() => {

    if (!sections?.length) return [];

    return sections.filter(
      (section) =>
        section?.cycleId?._id === selectedCycle
    );

  }, [sections, selectedCycle]);

  /*
  |--------------------------------------------------------------------------
  | FILTER OPTIONS
  |--------------------------------------------------------------------------
  */

  const filteredOptions = useMemo(() => {

    if (!options?.length) return [];

    return options.filter(
      (option) =>
        option?.sectionId?._id === selectedSection
    );

  }, [options, selectedSection]);

  /*
  |--------------------------------------------------------------------------
  | FILTER CLASSROOMS
  |--------------------------------------------------------------------------
  | - Normal cycle => classroom by cycle
  | - Humanité => classroom by option
  |--------------------------------------------------------------------------
  */

  const filteredClassrooms = useMemo(() => {

    if (!classrooms?.length) return [];

    // ================= HUMANITE =================

    if (isHumanite) {

      return classrooms.filter(
        (classroom) =>
          classroom?.optionId?._id === selectedOption
      );
    }

    // ================= AUTRES CYCLES =================

    return classrooms.filter(
      (classroom) =>
        classroom?.cycleId?._id === selectedCycle
    );

  }, [
    classrooms,
    isHumanite,
    selectedCycle,
    selectedOption,
  ]);

  /*
  |--------------------------------------------------------------------------
  | STEPS
  |--------------------------------------------------------------------------
  */

  const next = () => setStep((s) => s + 1);

  const back = () => setStep((s) => s - 1);

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const onSubmit = (data) => {
    const finalData = {
    ...data,
    sectionId: data.sectionId || null,
    optionId: data.optionId || null,
  };
    dispatch(dispatch(addNewStudent({ finalData, navigate, toast })))
    
    reset();
  };

  /*
  |--------------------------------------------------------------------------
  | FETCH DATA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    dispatch(getAllCycle());

    dispatch(getAllSection());

    dispatch(getAllYears());

    dispatch(getAllOptions());

    dispatch(getAllClassrooms());

  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          max-w-6xl
          mx-auto
          bg-white
          dark:bg-gray-900
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            bg-gradient-to-r
            from-sky-900
            to-sky-700
            px-6
            md:px-8
            py-6
            text-white
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-2xl md:text-3xl font-bold">
                Inscription élève
              </h1>

              <p className="text-sky-100 mt-1 text-sm">
                Gestion moderne des inscriptions scolaires
              </p>

            </div>

            <button
              onClick={() => navigate("/students")}
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
                text-sm
              "
            >
              <ArrowLeft size={16} />
              Retour
            </button>

          </div>

        </div>

        {/* ================= STEPPER ================= */}

        <div className="px-6 md:px-8 pt-6">

          <div className="flex items-center gap-3">

            {[
              {
                id: 1,
                label: "Élève",
                icon: User,
              },
              {
                id: 2,
                label: "Parents",
                icon: Users,
              },
              {
                id: 3,
                label: "Scolarité",
                icon: GraduationCap,
              },
            ].map((item, index) => {

              const Icon = item.icon;

              return (
                <React.Fragment key={item.id}>

                  <div className="flex items-center gap-3">

                    <div
                      className={`
                        w-11
                        h-11
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        transition
                        ${
                          step >= item.id
                            ? "bg-sky-900 text-white shadow-lg"
                            : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                        }
                      `}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="hidden md:block">

                      <p
                        className={`
                          text-sm
                          font-semibold
                          ${
                            step >= item.id
                              ? "text-sky-900 dark:text-white"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {item.label}
                      </p>

                    </div>

                  </div>

                  {index !== 2 && (

                    <div
                      className={`
                        flex-1
                        h-1
                        rounded-full
                        ${
                          step > item.id
                            ? "bg-sky-900"
                            : "bg-gray-200 dark:bg-gray-800"
                        }
                      `}
                    />

                  )}

                </React.Fragment>
              );
            })}

          </div>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-8"
        >

         {/* ================= STEP 1 ================= */}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <SectionTitle title="Informations de l'élève" icon={User} />

              <div className="grid md:grid-cols-3 gap-5">

                {/* NOM */}
                <Field label="Nom">
                  <Input
                    icon={User}
                    register={register("nom")}
                    placeholder="Ex: TSHIBOLA"
                  />
                </Field>

                {/* POSTNOM */}
                <Field label="Postnom">
                  <Input
                    icon={User}
                    register={register("postnom")}
                    placeholder="Ex: MUTOMBO"
                  />
                </Field>

                {/* PRENOM */}
                <Field label="Prénom">
                  <Input
                    icon={User}
                    register={register("prenom")}
                    placeholder="Ex: Jean"
                  />
                </Field>

                {/* DATE DE NAISSANCE */}
                <Field label="Date de naissance">
                  <Input
                    type="date"
                    icon={Calendar}
                    register={register("dateNaissance")}
                  />
                </Field>

                {/* NATIONALITE */}
                <Field label="Nationalité">
                  <Input
                    icon={Users}
                    register={register("nationalite")}
                    placeholder="Congolaise"
                  />
                </Field>

                {/* ADRESSE */}
                <Field label="Adresse">
                  <Input
                    icon={School}
                    register={register("adresse")}
                    placeholder="Quartier, avenue..."
                  />
                </Field>
              </div>

            {/* ================= SEXE COMPACT UX ================= */}
          <div className="space-y-2">

            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sexe
            </label>

            <div className="flex gap-3">

              {/* GARÇON */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="M"
                  {...register("sexe")}
                  className="hidden peer"
                />

                <div className="
                  flex items-center gap-2
                  px-57 py-5 rounded-xl border
                  bg-white dark:bg-gray-800
                  text-sm
                  transition
                  hover:border-sky-500
                  peer-checked:bg-sky-900
                  peer-checked:text-white
                  peer-checked:border-sky-900
                ">
                  <User size={26} />
                  <span>Garçon</span>
                </div>
              </label>

              {/* FILLE */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="F"
                  {...register("sexe")}
                  className="hidden peer"
                />

                <div className="
                  flex items-center gap-2
                  px-60 py-5 rounded-xl border
                  bg-white dark:bg-gray-800
                  text-sm
                  transition
                  hover:border-pink-500
                  peer-checked:bg-pink-600
                  peer-checked:text-white
                  peer-checked:border-pink-600
                ">
                  <User size={26} />
                  <span>Fille</span>
                </div>
              </label>

            </div>

          </div>

            </motion.div>
          )}

          {/* ================= STEP 2 ================= */}

          {step === 2 && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >

              <SectionTitle
                title="Informations des parents"
                icon={Users}
              />

              <div className="grid md:grid-cols-2 gap-5">

                <Field label="Nom du père">

                  <Input
                    icon={User}
                    register={register("nomPere")}
                    placeholder="Nom complet du père"
                  />

                </Field>

                <Field label="Téléphone père">

                  <Input
                    icon={Phone}
                    register={register("telephonePere")}
                    placeholder="+243..."
                  />

                </Field>

                <Field label="Nom de la mère">

                  <Input
                    icon={User}
                    register={register("nomMere")}
                    placeholder="Nom complet de la mère"
                  />

                </Field>

                <Field label="Téléphone mère">

                  <Input
                    icon={Phone}
                    register={register("telephoneMere")}
                    placeholder="+243..."
                  />

                </Field>

              </div>

            </motion.div>

          )}

          {/* ================= STEP 3 ================= */}

          {step === 3 && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-7"
            >

              <SectionTitle
                title="Informations scolaires"
                icon={School}
              />

              {/* ================= CYCLE ================= */}

              <div
                className="
                  bg-gray-50
                  dark:bg-gray-800/50
                  border
                  dark:border-gray-700
                  rounded-2xl
                  p-5
                "
              >

                <div className="flex items-center gap-2 mb-4">

                  <GraduationCap className="w-5 h-5 text-sky-700" />

                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Choisir le cycle
                  </h3>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                  {cycles?.map((c) => (

                    <label key={c._id}>

                      <input
                        type="radio"
                        value={c._id}
                        {...register("cycleId")}
                        className="hidden peer"
                      />

                      <div
                        className="
                          border
                          rounded-2xl
                          p-4
                          text-center
                          cursor-pointer
                          transition-all
                          bg-white
                          dark:bg-gray-900
                          hover:border-sky-500
                          hover:shadow-md

                          peer-checked:bg-sky-900
                          peer-checked:text-white
                          peer-checked:border-sky-900
                          peer-checked:shadow-lg
                        "
                      >

                        <p className="font-semibold text-sm">
                          {c.name}
                        </p>

                      </div>

                    </label>

                  ))}

                </div>

              </div>

              {/* ================= YEAR + CLASS ================= */}

              <div className="grid md:grid-cols-2 gap-5">

               <Field label="Année scolaire">
                  <Select {...register("yearId")}   
                    className="
                      w-full
                      p-2
                      border
                      rounded-md
                      bg-white
                      text-gray-900
                      dark:bg-gray-800
                      dark:text-white
                    ">
                    <option value="">Choisir une année</option>

                    {allYears?.map((y) => (
                      <option key={y._id} value={y._id} >
                        {y.year}
                      </option>
                    ))}
                  </Select>
                </Field>
     
                <Field label="Classe">

                  <Select register={register("classroomId")}>

                    <option value="">
                      Choisir une classe
                    </option>

                    {filteredClassrooms?.map((classroom) => (

                      <option
                        key={classroom._id}
                        value={classroom._id}
                        
                      >
                        {classroom.name}
                      </option>

                    ))}

                  </Select>

                </Field>

              </div>

              {/* ================= HUMANITE ================= */}

              {isHumanite && (

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    bg-blue-50
                    dark:bg-blue-900/10
                    border
                    border-blue-200
                    dark:border-blue-800
                    rounded-2xl
                    p-5
                    space-y-5
                  "
                >

                  <div>

                    <h3 className="font-semibold text-blue-700 dark:text-blue-300">
                      Informations Humanité
                    </h3>

                    <p className="text-sm text-blue-600/80 dark:text-blue-300/70 mt-1">
                      Sélectionnez la section puis l’option
                    </p>

                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    {/* ================= SECTION ================= */}

                    <Field label="Section">

                      <Select register={register("sectionId")}>

                        <option value="">
                          Choisir une section
                        </option>

                        {filteredSections?.map((section) => (

                          <option
                            key={section._id}
                            value={section._id}
                          >
                            {section.name}
                          </option>

                        ))}

                      </Select>

                    </Field>

                    {/* ================= OPTION ================= */}

                    <Field label="Option">

                      <Select register={register("optionId")}>

                        <option value="">
                          Choisir une option
                        </option>

                        {filteredOptions?.map((option) => (

                          <option
                            key={option._id}
                            value={option._id}
                          >
                            {option.name}
                          </option>

                        ))}

                      </Select>

                    </Field>

                  </div>

                </motion.div>

              )}

            </motion.div>

          )}

          {/* ================= ACTIONS ================= */}

          <div
            className="
              flex
              items-center
              justify-between
              pt-4
              border-t
              dark:border-gray-800
            "
          >

            {step > 1 ? (

              <button
                type="button"
                onClick={back}
                className="
                  px-5
                  py-3
                  rounded-xl
                  bg-gray-200
                  dark:bg-gray-800
                  dark:text-white
                  hover:scale-105
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
                onClick={next}
                className="
                  flex
                  items-center
                  gap-2
                  bg-sky-900
                  hover:bg-sky-800
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  shadow-lg
                  transition
                "
              >
                Suivant

                <ArrowRight size={16} />
              </button>

            ) : (

              <button
                type="submit"
                className="
                  flex
                  items-center
                  gap-2
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  shadow-lg
                  transition
                "
              >
                <Save size={16} />
                Enregistrer
              </button>

            )}

          </div>

        </form>

      </motion.div>

    </div>
  );
}

/* ================= FIELD ================= */

const Field = ({ label, children }) => (

  <div className="space-y-2">

    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>

    {children}

  </div>

);

/* ================= INPUT ================= */

const Input = ({
  icon: Icon,
  register,
  type = "text",
  placeholder,
}) => (

  <div className="relative">

    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <Icon size={18} />
    </div>

    <input
      type={type}
      {...register}
      placeholder={placeholder}
      className="
        w-full
        pl-11
        pr-4
        py-3
        rounded-xl
        border
        bg-gray-50
        dark:bg-gray-800
        dark:border-gray-700
        dark:text-white
        focus:ring-2
        focus:ring-sky-500
        outline-none
        transition
      "
    />

  </div>

);

/* ================= SELECT ================= */

const Select = ({ children, register }) => (

  <select
    {...register}
    className="
      w-full
      px-4
      py-3
      rounded-xl
      border
      bg-gray-50
      dark:bg-gray-800
      dark:border-gray-700
      dark:text-white
      focus:ring-2
      focus:ring-sky-500
      outline-none
      transition
    "
  >
    {children}
  </select>

);

/* ================= SECTION TITLE ================= */

const SectionTitle = ({ title, icon: Icon }) => (

  <div className="flex items-center gap-3">

    <div
      className="
        w-11
        h-11
        rounded-2xl
        bg-sky-100
        text-sky-700
        flex
        items-center
        justify-center
      "
    >
      <Icon size={20} />
    </div>

    <div>

      <h2 className="font-bold text-lg text-gray-800 dark:text-white">
        {title}
      </h2>

      <p className="text-sm text-gray-500">
        Veuillez compléter les informations
      </p>

    </div>

  </div>

);