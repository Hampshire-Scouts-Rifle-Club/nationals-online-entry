/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';
import BookCampingSpaceDialog from './BookCampingSpaceDialog';

function Camping(): JSX.Element {
  const [isCampingSpaceOpen, setIsCampingSpaceOpen] = React.useState(false);

  function handleClickOpen() {
    setIsCampingSpaceOpen(true);
  }

  function handleClose() {
    setIsCampingSpaceOpen(false);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function bookCampingSpace() {}
  return (
    <>
      <HeadedSection title="Camping">
        <AddButton onClick={() => handleClickOpen()}>
          Book Camping Space
        </AddButton>
      </HeadedSection>

      <BookCampingSpaceDialog
        open={isCampingSpaceOpen}
        handleClose={handleClose}
        bookCampingSpace={bookCampingSpace}
      />
    </>
  );
}

export default Camping;
