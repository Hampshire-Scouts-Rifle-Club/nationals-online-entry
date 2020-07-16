/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShootingEvent = /* GraphQL */ `
  subscription OnCreateShootingEvent(
    $id: ID
    $title: String
    $description: String
    $slots: Int
    $price: Float
  ) {
    onCreateShootingEvent(
      id: $id
      title: $title
      description: $description
      slots: $slots
      price: $price
    ) {
      id
      title
      description
      slots
      price
    }
  }
`;
export const onUpdateShootingEvent = /* GraphQL */ `
  subscription OnUpdateShootingEvent(
    $id: ID
    $title: String
    $description: String
    $slots: Int
    $price: Float
  ) {
    onUpdateShootingEvent(
      id: $id
      title: $title
      description: $description
      slots: $slots
      price: $price
    ) {
      id
      title
      description
      slots
      price
    }
  }
`;
export const onDeleteShootingEvent = /* GraphQL */ `
  subscription OnDeleteShootingEvent(
    $id: ID
    $title: String
    $description: String
    $slots: Int
    $price: Float
  ) {
    onDeleteShootingEvent(
      id: $id
      title: $title
      description: $description
      slots: $slots
      price: $price
    ) {
      id
      title
      description
      slots
      price
    }
  }
`;
export const onCreateShooter = /* GraphQL */ `
  subscription OnCreateShooter(
    $id: ID
    $firstName: String
    $surname: String
    $scoutGroup: String
    $ageDuringCompetition: Int
  ) {
    onCreateShooter(
      id: $id
      firstName: $firstName
      surname: $surname
      scoutGroup: $scoutGroup
      ageDuringCompetition: $ageDuringCompetition
    ) {
      id
      firstName
      surname
      scoutGroup
      ageDuringCompetition
      enteredLastYear
      isRangeOfficer
      rangeOfficerCertificate
      eventsEntered {
        id
        title
        description
        slots
        price
      }
    }
  }
`;
export const onUpdateShooter = /* GraphQL */ `
  subscription OnUpdateShooter(
    $id: ID
    $firstName: String
    $surname: String
    $scoutGroup: String
    $ageDuringCompetition: Int
  ) {
    onUpdateShooter(
      id: $id
      firstName: $firstName
      surname: $surname
      scoutGroup: $scoutGroup
      ageDuringCompetition: $ageDuringCompetition
    ) {
      id
      firstName
      surname
      scoutGroup
      ageDuringCompetition
      enteredLastYear
      isRangeOfficer
      rangeOfficerCertificate
      eventsEntered {
        id
        title
        description
        slots
        price
      }
    }
  }
`;
export const onDeleteShooter = /* GraphQL */ `
  subscription OnDeleteShooter(
    $id: ID
    $firstName: String
    $surname: String
    $scoutGroup: String
    $ageDuringCompetition: Int
  ) {
    onDeleteShooter(
      id: $id
      firstName: $firstName
      surname: $surname
      scoutGroup: $scoutGroup
      ageDuringCompetition: $ageDuringCompetition
    ) {
      id
      firstName
      surname
      scoutGroup
      ageDuringCompetition
      enteredLastYear
      isRangeOfficer
      rangeOfficerCertificate
      eventsEntered {
        id
        title
        description
        slots
        price
      }
    }
  }
`;
