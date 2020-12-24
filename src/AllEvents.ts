import ShootingEvent from './ShootingEvent';

function createEvent(
  id: string,
  title: string,
  description: string,
  slots: number,
  cost: number
): ShootingEvent {
  return {
    id,
    title,
    description,
    slots,
    cost,
  };
}

const AllEvents = [
  createEvent(
    'knockout',
    'Knockout',
    'Description for the knockout event',
    1,
    0
  ),
  createEvent(
    'mainevent',
    'Main event',
    'Description for the main event',
    3,
    22
  ),
  createEvent(
    'ownrifle6yd',
    'Own rifle 6yd',
    'Description for own rifle 6yd',
    1,
    4
  ),
  createEvent(
    'ownrifle10mopen',
    'Own rifle 10m - Open',
    'Description for Own rifle 10m - Open',
    1,
    6.5
  ),
  createEvent(
    'ownrifle10msporter',
    'Own rifle 10m - Sporter',
    'Description for Own rifle 10m - Sporter',
    1,
    6.5
  ),
  createEvent('ownpistol', 'Own pistol', 'Description for Own pistol', 1, 4),
  createEvent(
    'vintagerifle',
    'Vintage rifle',
    'Description for Vintage rifle',
    1,
    4
  ),
  createEvent(
    'beginnerssmallbore',
    'Beginners small bore experience',
    'Description for ',
    1,
    8
  ),
  createEvent('smallbore', 'Small bore - Class A or X', '', 1, 9.5),
  createEvent(
    'beginnerstargetsprint',
    'Beginners target sprint experience',
    'Description for Beginners target sprint experience',
    1,
    4
  ),
  createEvent(
    'targetsprint',
    'Target sprint - Class A or X',
    'Description for Target sprint - Class A or X',
    1,
    4
  ),
  createEvent(
    'fullbore',
    'Full bore rifle experience',
    'Description for Full bore rifle experience',
    2,
    16.5
  ),
  createEvent(
    'advancedfieldtarget',
    'Advanced field target',
    'Description for Advanced field target',
    2,
    4
  ),
  createEvent(
    '3popen',
    'Three position rifle - Open',
    'Description for Three position rifle - Open',
    2,
    10
  ),
  createEvent(
    '3psporter',
    'Three position rifle - Sporter',
    'Description for Three position rifle - Sporter',
    2,
    10
  ),
];

export default AllEvents;
