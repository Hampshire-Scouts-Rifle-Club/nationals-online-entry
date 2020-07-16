/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShootingEvent = /* GraphQL */ `
  mutation CreateShootingEvent($input: CreateShootingEventInput!) {
    createShootingEvent(input: $input) {
      id
      title
      description
      slots
      price
    }
  }
`;
export const updateShootingEvent = /* GraphQL */ `
  mutation UpdateShootingEvent($input: UpdateShootingEventInput!) {
    updateShootingEvent(input: $input) {
      id
      title
      description
      slots
      price
    }
  }
`;
export const deleteShootingEvent = /* GraphQL */ `
  mutation DeleteShootingEvent($input: DeleteShootingEventInput!) {
    deleteShootingEvent(input: $input) {
      id
      title
      description
      slots
      price
    }
  }
`;
export const createShooter = /* GraphQL */ `
  mutation CreateShooter($input: CreateShooterInput!) {
    createShooter(input: $input) {
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
export const updateShooter = /* GraphQL */ `
  mutation UpdateShooter($input: UpdateShooterInput!) {
    updateShooter(input: $input) {
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
export const deleteShooter = /* GraphQL */ `
  mutation DeleteShooter($input: DeleteShooterInput!) {
    deleteShooter(input: $input) {
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
