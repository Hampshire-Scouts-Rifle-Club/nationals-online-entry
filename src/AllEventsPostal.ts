import { ShootingEvent } from './ShootingEvent';

export const airRifle6ydPcp: ShootingEvent = {
  id: 'airrifle6ydPcp',
  title: 'Sporter Air Rifle 6yd - Pre-charged',
  summary: '6yd Sporter Air Rifle using Pre-charged Air Rifles',
  description: [
    '20 shots; 5 at each of four Air 7 cards. The best 2 cards will be taken for the competition score (i.e. ex-100). Rifles to have dioptre or open sights.',
    'Or',
    '30 shots; 10 at each of four Air 7 cards (two shots at each diagram). The best 2 cards will be taken for the competition score (i.e. ex-200). Rifles to have dioptre sights.',
  ],
  slots: 1,
  cost: 1,
};

export const airRifle6ydSpringer: ShootingEvent = {
  id: 'airrifle6ydSpringer',
  title: 'Sporter Air Rifle 6yd - Springer',
  summary: '6yd Sporter Air Rifle using Springer Air Rifles',
  description: [
    '20 shots; 5 at each of four Air 7 cards. The best 2 cards will be taken for the competition score (i.e. ex-100). Rifles to have dioptre or open sights.',
    'Or',
    '30 shots; 10 at each of four Air 7 cards (two shots at each diagram). The best 2 cards will be taken for the competition score (i.e. ex-200). Rifles to have dioptre sights.',
  ],
  slots: 1,
  cost: 1,
};

export const airPistol6ydPcp: ShootingEvent = {
  id: 'airPistol6ydPcp',
  title: 'Sporter Air Pistol 6yd - Pre-charged',
  summary: '6yd Sporter Air Pistol using Pre-charged Air Pistols',
  description: [
    '20 shots; 5 at each of four Air 8 cards. The best 2 cards will be taken for the competition score (i.e. ex-100). In all Pistol events competitors aged 13 and over shall shoot using only one hand. Those aged under 13 may support the pistol with two hands.',
    'Or',
    '30 shots; 5 at each of six Air 8 cards. The best 4 cards will be taken for the competition score (i.e. ex-200). In all Pistol events competitors aged 13 and over shall shoot using only one hand. Those aged under 13 may support the pistol with two hands.',
  ],
  slots: 1,
  cost: 1,
};

export const airPistol6ydSpringer: ShootingEvent = {
  id: 'airPistol6ydSpringer',
  title: 'Sporter Air Pistol 6yd - Springer',
  summary: '6yd Sporter Air Pistol using Springer Air Pistols',
  description: [
    '20 shots; 5 at each of four Air 8 cards. The best 2 cards will be taken for the competition score (i.e. ex-100). In all Pistol events competitors aged 13 and over shall shoot using only one hand. Those aged under 13 may support the pistol with two hands.',
    'Or',
    '30 shots; 5 at each of six Air 8 cards. The best 4 cards will be taken for the competition score (i.e. ex-200). In all Pistol events competitors aged 13 and over shall shoot using only one hand. Those aged under 13 may support the pistol with two hands.',
  ],
  slots: 1,
  cost: 1,
};

export const airRifle10mPcp: ShootingEvent = {
  id: 'airrifle10mPcp',
  title: 'Sporter Air Rifle 10m - Pre-charged',
  summary: '10m Sporter Air Rifle using Pre-charged Air Rifles',
  description: [
    '20 shots; 5 at each of four Air 2 or Air 3 cards. The best 2 cards will be taken for the competition score (i.e. ex-100). Rifles to have dioptre or open sights.',
    'Or',
    '30 shots; 10 at each of four Air 2 or Air 3 cards (two shots at each diagram). The best 2 cards will be taken for the competition score (i.e. ex-200). Rifles to have dioptre sights.',
  ],
  slots: 1,
  cost: 1,
};

export const airRifle10mSpringer: ShootingEvent = {
  id: 'airrifle10mSpringer',
  title: 'Sporter Air Rifle 10m - Springer',
  summary: '10m Sporter Air Rifle using Springer Air Rifles',
  description: [
    '20 shots; 5 at each of four Air 2 or Air 3 cards. The best 2 cards will be taken for the competition score (i.e. ex-100). Rifles to have dioptre or open sights.',
    'Or',
    '30 shots; 10 at each of four Air 2 or Air 3 cards (two shots at each diagram). The best 2 cards will be taken for the competition score (i.e. ex-200). Rifles to have dioptre sights.',
  ],
  slots: 1,
  cost: 1,
};

export const airPistol10mPcp: ShootingEvent = {
  id: 'airPistol10mPcp',
  title: 'Sporter Air Pistol 10m - Pre-charged',
  summary: '10m Sporter Air Pistol using Pre-charged Air Pistols',
  description: [
    '20 shots; 5 at each of four Air 8 cards. The best 2 cards will be taken for the competition score (i.e. ex-100). In all Pistol events competitors aged 13 and over shall shoot using only one hand. Those aged under 13 may support the pistol with two hands.',
    'Or',
    '30 shots; 5 at each of six Air 8 cards. The best 4 cards will be taken for the competition score (i.e. ex-200). In all Pistol events competitors aged 13 and over shall shoot using only one hand. Those aged under 13 may support the pistol with two hands.',
  ],
  slots: 1,
  cost: 1,
};

export const airPistol10mSpringer: ShootingEvent = {
  id: 'airPistol10mSpringer',
  title: 'Sporter Air Pistol 10m - Springer',
  summary: '10m Sporter Air Pistol using Springer Air Pistols',
  description: [
    '20 shots; 5 at each of four Air 8 cards. The best 2 cards will be taken for the competition score (i.e. ex-100). In all Pistol events competitors aged 13 and over shall shoot using only one hand. Those aged under 13 may support the pistol with two hands.',
    'Or',
    '30 shots; 5 at each of six Air 8 cards. The best 4 cards will be taken for the competition score (i.e. ex-200). In all Pistol events competitors aged 13 and over shall shoot using only one hand. Those aged under 13 may support the pistol with two hands.',
  ],
  slots: 1,
  cost: 1,
};

export const MainEvents: ShootingEvent[] = [];
export const PostalEvents = [
  airRifle6ydPcp,
  airRifle6ydSpringer,
  airPistol6ydPcp,
  airPistol6ydSpringer,
  airRifle10mPcp,
  airRifle10mSpringer,
  airPistol10mPcp,
  airPistol10mSpringer,
];
export const MainEventIds = MainEvents.map((event) => event.id);
export const AllEvents = [...MainEvents, ...PostalEvents];

function buildCategorisedEvents(): Map<string, ShootingEvent[]> {
  const categorisedEvents = new Map<string, ShootingEvent[]>();
  categorisedEvents.set('Postal Competition', PostalEvents);
  return categorisedEvents;
}
export const AllEventsInCategories = buildCategorisedEvents();
