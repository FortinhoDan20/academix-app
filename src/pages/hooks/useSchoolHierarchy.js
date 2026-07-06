import { useMemo } from "react";

export const useSchoolHierarchy = ({
  cycles,
  sections,
  options,
  classrooms,
  selectedCycle,
  selectedSection,
  selectedOption,
}) => {
  /*
  |--------------------------------------------------------------------------
  | CYCLE OBJ
  |--------------------------------------------------------------------------
  */

  const selectedCycleObj = useMemo(() => {
    return cycles?.find((c) => c._id === selectedCycle);
  }, [cycles, selectedCycle]);

  /*
  |--------------------------------------------------------------------------
  | HUMANITE CHECK
  |--------------------------------------------------------------------------
  */

  const isHumanite = useMemo(() => {
    return (
      selectedCycleObj?.name?.trim()?.toLowerCase() === "humanité"
    );
  }, [selectedCycleObj]);

  /*
  |--------------------------------------------------------------------------
  | SECTIONS
  |--------------------------------------------------------------------------
  */

  const filteredSections = useMemo(() => {
    if (!selectedCycle) return [];

    return sections.filter(
      (s) => s?.cycleId?._id === selectedCycle
    );
  }, [sections, selectedCycle]);

  /*
  |--------------------------------------------------------------------------
  | OPTIONS
  |--------------------------------------------------------------------------
  */

  const filteredOptions = useMemo(() => {
    if (!selectedSection) return [];

    return options.filter(
      (o) => o?.sectionId?._id === selectedSection
    );
  }, [options, selectedSection]);

  /*
  |--------------------------------------------------------------------------
  | CLASSROOMS
  |--------------------------------------------------------------------------
  */

  const filteredClassrooms = useMemo(() => {
    if (!selectedCycle) return [];

    // HUMANITE
    if (isHumanite) {
      if (!selectedOption) return [];

      return classrooms.filter(
        (c) => c?.optionId?._id === selectedOption
      );
    }

    // NORMAL CYCLE
    return classrooms.filter(
      (c) => c?.cycleId?._id === selectedCycle
    );
  }, [
    classrooms,
    selectedCycle,
    selectedOption,
    isHumanite,
  ]);

  return {
    selectedCycleObj,
    isHumanite,
    filteredSections,
    filteredOptions,
    filteredClassrooms,
  };
};