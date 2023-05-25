export interface ShootingEvent {
  id: string;
  title: string;
  summary: string;
  description: string[];
  slots: number;
  cost: number;
  excludes?: string;
  minAge?: number;
}
