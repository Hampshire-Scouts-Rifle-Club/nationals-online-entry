import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { ShootingEvent } from "./ShootingEvent";
import { AllEvents, AllEventsInCategories } from "./AllEventsPostal";
import { getCostString } from "./EventsSummaryBuilder";
import { InfoDialog } from "./InfoDialog";
import "./EventsSelector.css";

interface EventsSelectorProps {
  enteredEventIds: string[];
  setEnteredEventIds: (eventIds: string[]) => void;
  isMainEventLocked: boolean;
  ageOfShooter: number;
}

const eventTitleStyle = {
  width: "100%",
  flex: 1,
};

export function EventsSelector({
  enteredEventIds,
  setEnteredEventIds,
  isMainEventLocked,
  ageOfShooter,
}: EventsSelectorProps): JSX.Element {
  const [infoDialogTitle, setInfoDialogTitle] = useState("");
  const [infoDialogParagraphs, setInfoDialogParagraphs] = useState([""]);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("lg"));

  function buildEventsTable(
    events: ShootingEvent[],
    showCost: boolean,
    showAddRemove: boolean,
    key: string
  ) {
    return (
      <TableContainer sx={{ marginBottom: "1rem" }} key={key}>
        <Table size="small" aria-label="Events entered">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              {showCost && <TableCell align="right">Cost</TableCell>}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                {getEventActionButton(event.id, showAddRemove)}
                <TableCell style={eventTitleStyle}>{event.title}</TableCell>
                {showCost && (
                  <TableCell align="right">
                    {getCostString(event.cost)}
                  </TableCell>
                )}
                <TableCell>
                  <Button
                    size="small"
                    // variant="outlined"
                    color="secondary"
                    // startIcon={<HelpIcon />}
                    disabled={event.description.length === 0}
                    onClick={() => {
                      setInfoDialogTitle(event.title);
                      setInfoDialogParagraphs(event.description);
                      setIsInfoDialogOpen(true);
                    }}
                  >
                    Info
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const excludedEventIds = findExcludedEventIds(enteredEventIds);

  const ageExcludedEvents = AllEvents.filter(
    (event) => event.minAge && ageOfShooter < event.minAge
  );

  excludedEventIds.push(...ageExcludedEvents.map((event) => event.id));

  function getEventActionButton(
    eventId: string,
    showAddRemove: boolean
  ): JSX.Element {
    const isEventEntered = enteredEventIds.includes(eventId);

    const removeButton = isSmall ? (
      <IconButton
        size="small"
        color="secondary"
        onClick={() => {
          const newEnteredEventIds = enteredEventIds.filter(
            (eventIdToRemove) => eventIdToRemove !== eventId
          );
          setEnteredEventIds(newEnteredEventIds);
        }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    ) : (
      <Button
        size="small"
        color="secondary"
        startIcon={<ClearIcon />}
        onClick={() => {
          const newEnteredEventIds = enteredEventIds.filter(
            (eventIdToRemove) => eventIdToRemove !== eventId
          );
          setEnteredEventIds(newEnteredEventIds);
        }}
      >
        Remove
      </Button>
    );
    if (isEventEntered && showAddRemove) {
      return (
        <TableCell component="th" scope="row" sx={{ textAlign: "center" }}>
          {removeButton}
        </TableCell>
      );
    }

    if (!isEventEntered && showAddRemove) {
      return (
        <TableCell component="th" scope="row">
          <Button
            size="small"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => {
              const newEnteredEventIds = enteredEventIds.concat(eventId);
              setEnteredEventIds(newEnteredEventIds);
            }}
          >
            Add
          </Button>
        </TableCell>
      );
    }

    return (
      <TableCell component="th" scope="row">
        <CheckIcon fontSize="small" color="info" />
      </TableCell>
    );
  }

  // function sortEventsEnteredFirst(events: ShootingEvent[]): ShootingEvent[] {
  //   const sortGreater = 1;
  //   const sortEqual = 0;
  //   const sortLess = -1;

  //   return events.sort((eventA, eventB) => {
  //     const isEventAEntered = enteredEventIds.includes(eventA.id);
  //     const isEventBEntered = enteredEventIds.includes(eventB.id);
  //     if (isEventAEntered && !isEventBEntered) {
  //       return sortLess;
  //     }
  //     if (!isEventAEntered && isEventBEntered) {
  //       return sortGreater;
  //     }
  //     return sortEqual;
  //   });
  // }

  const categorisedEventElements: JSX.Element[] = [];
  AllEventsInCategories.forEach((eventsInCategory, categoryName) => {
    // const titleKey = `${categoryName}Title`;
    // categorisedEventElements.push(
    //   <Typography
    //     gutterBottom
    //     variant="h6"
    //     component="h2"
    //     key={titleKey}
    //     paddingX="24px"
    //   >
    //     {categoryName}
    //   </Typography>
    // );
    const isMainEvent = categoryName.startsWith("Main");
    const showAddRemoveButton = !(isMainEvent && isMainEventLocked);
    const showCost = !isMainEvent;

    const tableKey = `${categoryName}Table`;

    categorisedEventElements.push(
      buildEventsTable(
        eventsInCategory, // sortEventsEnteredFirst(eventsInCategory),
        showCost,
        showAddRemoveButton,
        tableKey
      )
    );
  });

  return (
    <>
      {categorisedEventElements}
      <InfoDialog
        title={infoDialogTitle}
        paragraphs={infoDialogParagraphs}
        isOpen={isInfoDialogOpen}
        handleClose={() => {
          setIsInfoDialogOpen(false);
        }}
      />
    </>
  );
}

function findExcludedEventIds(enteredEventIds: string[]) {
  const enteredEventIdsWithExclusions = enteredEventIds.filter((eventId) =>
    Boolean(AllEvents.find((event) => event.id === eventId)?.excludes)
  );
  const excludedEventIds = enteredEventIdsWithExclusions.map(
    (eventId) => AllEvents.find((event) => event.id === eventId)?.excludes
  );
  return excludedEventIds;
}
