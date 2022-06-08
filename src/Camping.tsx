/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useCallback } from 'react';
import { Button, Skeleton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { HeadedSection } from './HeadedSection';
import { AddButton } from './AddButton';
import { BookCampingSpaceDialog } from './BookCampingSpaceDialog';
import { CampBooking } from './CampBooking';

interface CampBookingProps {
  campBooking: CampBooking;
  setCampBooking: (campBooking: CampBooking) => void;
  showPlaceHolder: Boolean;
  isEntryLocked: Boolean;
}

export function Camping({
  campBooking,
  setCampBooking,
  showPlaceHolder,
  isEntryLocked,
}: CampBookingProps): JSX.Element {
  const [isCampingSpaceOpen, setIsCampingSpaceOpen] = React.useState(false);

  function handleClickOpen() {
    setIsCampingSpaceOpen(true);
  }

  const handleClose = useCallback(() => {
    setIsCampingSpaceOpen(false);
  }, []);

  if (showPlaceHolder) {
    return (
      <HeadedSection title="Camping">
        <Skeleton variant="text" />
      </HeadedSection>
    );
  }
  function buildCampBookingElement() {
    const hasCampBooking = campBooking.numberOfCampers !== 0;

    if (!hasCampBooking) {
      return isEntryLocked ? (
        <Typography color="gray">No camping booked.</Typography>
      ) : (
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
