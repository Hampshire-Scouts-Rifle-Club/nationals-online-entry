/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { HeadedSection } from './HeadedSection';
import { AddButton } from './AddButton';
import { BookCampingSpaceDialog } from './BookCampingSpaceDialog';
import { CampBooking } from './CampBooking';

type CampBookingProps = {
  campBooking: CampBooking;
  setCampBooking: (campBooking: CampBooking) => void;
};

export function Camping({
  campBooking,
  setCampBooking,
}: CampBookingProps): JSX.Element {
  const [isCampingSpaceOpen, setIsCampingSpaceOpen] = React.useState(false);

  function handleClickOpen() {
    setIsCampingSpaceOpen(true);
  }

  const handleClose = useCallback(() => {
    setIsCampingSpaceOpen(false);
  }, []);

  function buildCampBookingElement() {
    const hasCampBooking = campBooking.numberOfCampers !== 0;

    if (!hasCampBooking) {
      return (
        <AddButton onClick={() => handleClickOpen()}>
          Book Camping Space
        </AddButton>
      );
    }

    return (
      <div key="campbooking">
        <p>{`Camping for ${campBooking.numberOfCampers}`}</p>
        <p>{`Estimated arrival time ${campBooking.estimatedArrivalTime}`}</p>
        <p>{campBooking.anyOtherInfo}</p>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleClickOpen()}
          style={{ margin: 1 }}
        >
          <EditIcon />
          Edit
        </Button>
      </div>
    );
  }

  return (
    <>
      <HeadedSection title="Camping">{buildCampBookingElement()}</HeadedSection>

      <BookCampingSpaceDialog
        open={isCampingSpaceOpen}
        handleClose={handleClose}
        campBooking={campBooking}
        setCampBooking={setCampBooking}
      />
    </>
  );
}
