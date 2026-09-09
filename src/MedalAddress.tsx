import { useCallback, useState } from 'react';
import { Button, Skeleton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { HeadedSection } from './HeadedSection';
import { AddButton } from './AddButton';
import { AddMedalAddressDialog } from './AddMedalAddressDialog';
import { buildAddressLines, PostalAddress } from './PostalAddress';

interface MedalAddressProps {
  medalPostalAddress: PostalAddress;
  setMedalPostalAddress: (medalPostalAddress: PostalAddress) => void;
  showPlaceHolder: boolean;
  isEntryLocked: boolean;
}

export function MedalAddress({
  medalPostalAddress,
  setMedalPostalAddress,
  showPlaceHolder,
  isEntryLocked,
}: MedalAddressProps): JSX.Element {
  const [isMedalAddressDialogOpen, setIsMedalAddressDialogOpen] =
    useState(false);

  const handleClose = useCallback(() => {
    setIsMedalAddressDialogOpen(false);
  }, []);

  if (showPlaceHolder) {
    return (
      <HeadedSection title="Address for Medals">
        <Skeleton variant="text" />
      </HeadedSection>
    );
  }

  function buildMedalAddressElement() {
    const addressLines = buildAddressLines(medalPostalAddress);
    const hasMedalAddress = addressLines.length > 0;

    if (!hasMedalAddress) {
      return isEntryLocked ? (
        <Typography color="gray">No address given.</Typography>
      ) : (
        <AddButton onClick={() => setIsMedalAddressDialogOpen(true)}>
          Add Address for Medals
        </AddButton>
      );
    }

    return (
      <div key="medaladdress">
        {addressLines.map((line, index) => (
          <Typography key={`${index}-${line}`} variant="body2">
            {line}
          </Typography>
        ))}
        {!isEntryLocked && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsMedalAddressDialogOpen(true)}
            style={{ margin: 1 }}
          >
            <EditIcon />
            Edit
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <HeadedSection title="Address for Medals">
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Every competitor receives a medal for taking part. We post the whole
          team&apos;s medals to one address after the competition.
        </Typography>
        {buildMedalAddressElement()}
      </HeadedSection>

      <AddMedalAddressDialog
        open={isMedalAddressDialogOpen}
        handleClose={handleClose}
        medalPostalAddress={medalPostalAddress}
        setMedalPostalAddress={setMedalPostalAddress}
      />
    </>
  );
}
