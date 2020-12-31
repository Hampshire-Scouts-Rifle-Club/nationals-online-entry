import ShootingEvent from './ShootingEvent';

export const knockout: ShootingEvent = {
  id: 'knockout',
  title: 'Knockout',
  description: 'Description for the knockout event',
  slots: 1,
  cost: 0,
};

export const mainEvent: ShootingEvent = {
  id: 'mainevent',
  title: 'Main event',
  description: 'Description for the main event',
  slots: 3,
  cost: 22,
};

export const ownRifle6yd: ShootingEvent = {
  id: 'ownrifle6yd',
  title: 'Own rifle 6yd',
  description: 'Description for own rifle 6yd',
  slots: 1,
  cost: 4,
};

export const ownRifle10mOpen: ShootingEvent = {
  id: 'ownrifle10mopen',
  title: 'Own rifle 10m - Open',
  description: 'Description for Own rifle 10m - Open',
  slots: 1,
  cost: 6.5,
};

export const ownRifle10mSporter: ShootingEvent = {
  id: 'ownrifle10msporter',
  title: 'Own rifle 10m - Sporter',
  description: 'Description for Own rifle 10m - Sporter',
  slots: 1,
  cost: 6.5,
};

export const ownPistol: ShootingEvent = {
  id: 'ownpistol',
  title: 'Own pistol',
  description: 'Description for Own pistol',
  slots: 1,
  cost: 4,
};

export const vintageRifle: ShootingEvent = {
  id: 'vintagerifle',
  title: 'Vintage rifle',
  description: 'Description for Vintage rifle',
  slots: 1,
  cost: 4,
};

export const beginnersSmallBore: ShootingEvent = {
  id: 'beginnerssmallbore',
  title: 'Beginners small bore experience',
  description: 'Description for ',
  slots: 1,
  cost: 8,
};

export const smallBore: ShootingEvent = {
  id: 'smallbore',
  title: 'Small bore - Class A or X',
  description: '',
  slots: 1,
  cost: 9.5,
};

export const beginnersTargetSprint: ShootingEvent = {
  id: 'beginnerstargetsprint',
  title: 'Beginners target sprint experience',
  description: 'Description for Beginners target sprint experience',
  slots: 1,
  cost: 4,
};

export const targetSprint: ShootingEvent = {
  id: 'targetsprint',
  title: 'Target sprint - Class A or X',
  description: 'Description for Target sprint - Class A or X',
  slots: 1,
  cost: 4,
};

export const fullBore: ShootingEvent = {
  id: 'fullbore',
  title: 'Full bore rifle experience',
  description: 'Description for Full bore rifle experience',
  slots: 2,
  cost: 16.5,
};

export const advancedFieldTarget: ShootingEvent = {
  id: 'advancedfieldtarget',
  title: 'Advanced field target',
  description: 'Description for Advanced field target',
  slots: 2,
  cost: 4,
};

export const threePositionOpen: ShootingEvent = {
  id: '3popen',
  title: 'Three position rifle - Open',
  description: 'Description for Three position rifle - Open',
  slots: 2,
  cost: 10,
};

export const threePositionSporter: ShootingEvent = {
  id: '3psporter',
  title: 'Three position rifle - Sporter',
  description: 'Description for Three position rifle - Sporter',
  slots: 2,
  cost: 10,
};

export const AllEvents = [
  knockout,
  mainEvent,
  ownRifle6yd,
  ownRifle10mOpen,
  ownRifle10mSporter,
  ownPistol,
  vintageRifle,
  beginnersSmallBore,
  smallBore,
  beginnersTargetSprint,
  targetSprint,
  fullBore,
  advancedFieldTarget,
  threePositionOpen,
  threePositionSporter,
];
