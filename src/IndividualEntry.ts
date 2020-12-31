import { Shooter } from './Shooter';
import ShootingEvent from './ShootingEvent';

export type IndividualEntry = {
  shooter: Shooter;
  eventsEntered: ShootingEvent[];
};
