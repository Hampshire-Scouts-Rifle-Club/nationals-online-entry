import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { IndividualEntry } from "./IndividualEntry";
import { ShooterSummary } from "./ShooterSummary";

interface ShootersGroupProps {
  scoutGroupName: string;
  shootersInGroup: IndividualEntry[];
  handleEdit: (entry: IndividualEntry) => void;
  isReadOnly: boolean;
}

export function ShootersGroup({
  scoutGroupName,
  shootersInGroup,
  handleEdit,
  isReadOnly,
}: ShootersGroupProps): JSX.Element {
  function buildSummaryOfShooters() {
    const allShooterSummaries = shootersInGroup.map((individualEntry) => (
      <ShooterSummary
        key={individualEntry.shooter.id}
        shooter={individualEntry.shooter}
        enteredEventIds={individualEntry.enteredEventIds}
        handleEdit={() => handleEdit(individualEntry)}
        isReadOnly={isReadOnly}
      />
    ));
    const withDividers = allShooterSummaries.map((summaryElement, index) => [
      index > 0 && (
        <Divider
          variant="middle"
          style={{ margin: "0.5rem" }}
          key={`${summaryElement.key}-Divider`}
        />
      ),
      summaryElement,
    ]);

    return withDividers;
  }

  return (
    <>
      <div
        key={`${scoutGroupName}-Header`}
        style={{
          backgroundColor: "#e0e0e0",
          marginLeft: "-0.5rem",
          marginRight: "-0.5rem",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
        >
          {scoutGroupName}
        </Typography>
      </div>
      <div style={{ marginBottom: "1rem" }} key={`${scoutGroupName}-Entrants`}>
        {buildSummaryOfShooters()}
      </div>
    </>
  );
}
