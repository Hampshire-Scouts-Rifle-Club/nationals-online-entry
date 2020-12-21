import React from 'react';
import './CampHelpers.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

function CampHelpers(): JSX.Element {
  function handleClickOpen() {
    // eslint-disable-next-line no-console
    console.log("Pressed 'Add Camp Helper");
  }

  return (
    <HeadedSection title="Camp Helpers (not shooting)">
      <AddButton onClick={() => handleClickOpen()}>Add Camp Helper</AddButton>
    </HeadedSection>
  );
}

export default CampHelpers;
