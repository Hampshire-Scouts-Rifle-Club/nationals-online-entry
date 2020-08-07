import React from 'react';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

function Camping() {
  function handleClickOpen() {
  }

  return (
    <HeadedSection title="Camping">
      <AddButton onClick={() => handleClickOpen()}>Book Camping Space</AddButton>
    </HeadedSection>
  );
}

export default Camping;
