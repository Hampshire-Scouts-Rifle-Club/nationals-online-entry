import { useCallback, useState } from "react";
import "./CampHelpers.css";
import { HeadedSection } from "./HeadedSection";
import { AddButton } from "./AddButton";
import { CampHelper, EmptyCampHelper } from "./CampHelper";
import { CampHelpersList } from "./CampHelpersList";
import { AddCampHelperDialog } from "./AddCampHelperDialog";

type CampHelperProps = {
  campHelpers: CampHelper[];
  setCampHelpers: (allCampHelpers: CampHelper[]) => void;
};

export function CampHelpers({
  campHelpers,
  setCampHelpers,
}: CampHelperProps): JSX.Element {
  const [isAddCampHelperOpen, setIsAddCampHelperOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setIsAddCampHelperOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsAddCampHelperOpen(false);
  }, []);

  const addCampHelper = useCallback(
    (newCampHelper: CampHelper) => {
      // alert(JSON.stringify(newShooter, null, 2));
      setCampHelpers(campHelpers.concat(newCampHelper));
    },
    [campHelpers, setCampHelpers]
  );

  return (
    <>
      <HeadedSection title="Camp Helpers (not shooting)">
        <CampHelpersList campHelpers={campHelpers} />
        <AddButton onClick={() => handleClickOpen()}>Add Camp Helper</AddButton>
      </HeadedSection>
      <AddCampHelperDialog
        open={isAddCampHelperOpen}
        campHelper={EmptyCampHelper}
        handleClose={handleClose}
        addCampHelper={addCampHelper}
      />
    </>
  );
}
