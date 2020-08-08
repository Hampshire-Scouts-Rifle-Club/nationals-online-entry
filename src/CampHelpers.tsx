import React from 'react';
import './CampHelpers.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

function CampHelpers() {
  function handleClickOpen() {}

  return (
    <HeadedSection title="Camp Helpers (not shooting)">
      <AddButton onClick={() => handleClickOpen()}>Add Camp Helper</AddButton>
    </HeadedSection>
  );
}

export default CampHelpers;
