/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShootingEvent = /* GraphQL */ `
  query GetShootingEvent($id: ID!) {
    getShootingEvent(id: $id) {
      id
      title
      description
      slots
      price
    }
  }
`;
export const listShootingEvents = /* GraphQL */ `
  query ListShootingEvents(
    $filter: TableShootingEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShootingEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        slots
        price
      }
      nextToken
    }
  }
`;
export const getShooter = /* GraphQL */ `
  query GetShooter($id: ID!) {
    getShooter(id: $id) {
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
export const listShooters = /* GraphQL */ `
  query ListShooters(
    $filter: TableShooterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShooters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
