import React from 'react';
import './CampHelpers.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';
import { CampHelper, EmptyCampHelper } from './CampHelper';
import CampHelpersList from './CampHelpersList';
import AddCampHelperDialog from './AddCampHelperDialog';

type CampHelperProps = {
  campHelpers: CampHelper[];
  setCampHelpers: (allCampHelpers: CampHelper[]) => void;
};

function CampHelpers({
  campHelpers,
  setCampHelpers,
}: CampHelperProps): JSX.Element {
  const [isAddCampHelperOpen, setIsAddCampHelperOpen] = React.useState(false);

  function handleClickOpen() {
    setIsAddCampHelperOpen(true);
  }

  function handleClose() {
    setIsAddCampHelperOpen(false);
  }

  function addCampHelper(newCampHelper: CampHelper) {
    // alert(JSON.stringify(newShooter, null, 2));
    setCampHelpers(campHelpers.concat(newCampHelper));
  }

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

export default CampHelpers;
