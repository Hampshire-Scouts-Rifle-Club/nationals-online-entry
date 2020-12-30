export type CampBooking = {
  numberOfCampers: number;
  estimatedArrivalTime: string;
  anyOtherInfo: string;
};

export const EmptyCampBooking: CampBooking = {
  numberOfCampers: 0,
  estimatedArrivalTime: '',
  anyOtherInfo: '',
};
