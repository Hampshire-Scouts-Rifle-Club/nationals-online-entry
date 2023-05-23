import { ShootingEvent } from './ShootingEvent';

export const knockout: ShootingEvent = {
  id: 'knockout',
  title: 'Knockout',
  summary:
    'Shoulder to shoulder, the first to shoot down 5 targets goes through to the next round. Using springer rifles, limited to 2 minutes and 10 pellets',
  description: [
    'There will be two classes of Reactive Target Knockout: Senior and Junior.',
    'In all rounds before the semi-finals, shooters will compete shoulder to shoulder to be the first to hit all of their own set of five reactive targets. The first to hit all five targets wins the tie. Both time and pellets will be limited (to 2 minutes and 10 pellets respectively).',
    'If neither shooter has hit all five targets at the end of the time allowed the shooter who has hit more will be the winner. If both have hit the same number of targets then the shooter with more pellets remaining will be the winner. If this does not resolve the tie, the matter will be decided by the toss of a coin.',
    'The semi-finals and final of the Knockout will be as above except that they will be shot over ten targets with limits of four minutes and 20 pellets. A tie will be decided as above except that a tie which is unresolved after both target and pellet counts will be decided by a re-shoot over one series of five targets. Should a tie still exist, targets will be reset again and the winner will be the first to hit a single target.',
    'The Knockout Range staff may agree to pairs of competitors in the later rounds of that competition shooting at mutually convenient alternative times.',
  ],
  slots: 1,
  cost: 0,
};

export const airRifle6yd: ShootingEvent = {
  id: 'airrifle6yd',
  title: 'Air rifle 6yd',
  summary: '6yd Air Rifle using Pre-charged Air Rifles',
  description: [
    'The course of fire is 15 shots; 5 at each of three Air 7 cards. The best 2 cards will be taken for the competition score (i.e. ex-100). Rifles will be supplied. They will be pre-charged with dioptre sights: Air Arms S200Ts for under-12s and Air-Arms MPR Sporters for all others.',
    'The team event score in the Main event 6yds standing Air Rifle competition will be the aggregate of the best four individual scores by members of the same Scout Group provided that the team shall comprise at least three competitors aged under 14.',
  ],
  slots: 1,
  cost: 0,
};

export const airPistol6yd: ShootingEvent = {
  id: 'airpistol6yd',
  title: 'Air pistol 6yd',
  summary: '',
  description: [
    'The Pistol competition will be fired on Air 8 Targets. Scores shall be based on the best two of three cards. (i.e. ex 100). In all Pistol events competitors aged 13 and over shall shoot using only one hand. Those aged under 13 may support the pistol with two hands. Pistols will be supplied.',
  ],
  slots: 1,
  cost: 0,
};

export const fieldTarget: ShootingEvent = {
  id: 'fieldTarget',
  title: 'Field target',
  summary: '',
  description: [
    'The Field Target event is a timed shoot at various distances. It is an Outdoor shoot. Scores shall be ex 50 for the purposes of the aggregate competition. There will be Senior and Junior Classes, with a trophy awarded in each class. Ties for medal places shall be decided by shoot-off.',
  ],
  slots: 1,
  cost: 0,
};

const ownAirgunRule =
  'The Own Airgun Classes are open to Main Event Competitors, Range Staff and Adults and Young Leaders camping with Groups. Entrants supply their own rifles and pistols. Some classes require use of own ammunition. All airguns brought to the site must comply with POR Rule 9.37, must not require a Firearms Certificate, must be transported in accordance with the Law and POR and handed to the Competition Armoury promptly on arrival. The case is to be labelled at an end edge (all detail on same end) with the type and serial number of the airgun and the owner’s Group/Unit. A list showing serial numbers and the names of those permitted to withdraw each from the Armoury is to be prepared in duplicate and one copy handed in with the guns. The Leader in charge should keep the other copy. No guns of any type other than those to be used in the competition may be brought onto the site without the express permission of the Organiser (this prohibition includes replicas & toys).';
const ownAirgunRule2 =
  'Rifles, pistols and ammunition must comply with NSRA rules and Scout POR and no airgun requiring a Firearm Certificate may be used. Laser sights are not permitted. Telescopic sights are not permitted except in Advanced Field Target (see below). Own pellets may be used in Own Airgun classes but in paper target events must be flat headed “wad cutters” made of lead.';

export const ownRifle6yd: ShootingEvent = {
  id: 'ownrifle6yd',
  title: 'Own rifle 6yd',
  summary: '',
  description: [
    'Targets: Air 7',
    'Air Rifles of “spring gun” type - no floating barrels, pre-charged, CO₂ or pneumatics.',
    'The score shall be the total of the best two out of three targets.',
    'The “Jim Dunn Memorial Trophy” is awarded in the Senior class.',
    ownAirgunRule,
    ownAirgunRule2,
  ],
  slots: 1,
  cost: 5,
};

const ownCylinderRule =
  'Compressed air cylinders brought to camp must be stored securely and kept away from young people. The filling of pre-charged rifles and pistols may be undertaken only by or under the close supervision of competent adults.';
const sharedGunLabelling =
  'Where airguns are to be shared, identify each shared gun as “Shared Gun No.1, 2, etc.” and show this on the entry form so the timetabling may avoid clashes.';
const maxSharing =
  'Rifles used in more than one class may be used on a maximum of four occasions in total.';
const airgunSharingNot3POrAFT =
  'Guns may be shared by up to four members of the same Group/Unit in the same class. If more than one user of the same shared gun qualifies for the shoulder-to-shoulder “Olympic Final” of the 10m Air Rifle or the “Own Pistol” the higher placed user of that gun shall proceed to the Final; the other user may seek to borrow another gun to do so';
// const airgunSharing3P =
//   'Guns may be shared by up to three members of the same Group/Unit in the same class.';
// const airgunSharingAFT =
//   'Guns may be shared by up to two members of the same Group/Unit in the same class.';

export const ownRifle10mOpen: ShootingEvent = {
  id: 'ownrifle10mopen',
  title: 'Own rifle 10m - Open',
  summary: '',
  description: [
    'Targets: electronic',
    'Denim jeans or camouflage clothing may not be worn. Specialist shooting clothing and footwear (consistent with ISSF rules) may be worn. An Olympic Final will be held',
    airgunSharingNot3POrAFT,
    sharedGunLabelling,
    maxSharing,
    ownCylinderRule,
    ownAirgunRule,
    ownAirgunRule2,
  ],
  slots: 1,
  cost: 8,
};

export const ownRifle10mSporter: ShootingEvent = {
  id: 'ownrifle10msporter',
  title: 'Own rifle 10m - Sporter',
  summary: '',
  description: [
    'Targets: electronic',
    'Air rifles complying with “Sporter” Rules. See http://www.sporter.org.uk/ .No specialist clothing may be worn.',
    airgunSharingNot3POrAFT,
    sharedGunLabelling,
    maxSharing,
    ownCylinderRule,
    ownAirgunRule,
    ownAirgunRule2,
  ],
  slots: 1,
  cost: 8,
};

export const ownPistol: ShootingEvent = {
  id: 'ownpistol',
  title: 'Own pistol',
  summary: '',
  description: [],
  slots: 1,
  cost: 5,
};

export const vintageRifle: ShootingEvent = {
  id: 'vintagerifle',
  title: 'Vintage rifle',
  summary: '',
  description: [],
  slots: 1,
  cost: 5,
};

export const beginnersSmallBore: ShootingEvent = {
  id: 'beginnerssmallbore',
  title: 'Beginners small bore experience',
  summary: '',
  description: [
    'Target rifles firing .22 rimfire ammunition (small bullets) at [2510BM targets](https://www.nsrashop.co.uk/products/nsra-2510bm-89-targets) 25 yards away. Firing prone (lying down) with the rifle supported on a rest.',
    'The minimum age for the small-bore shoot is 12. Hampshire Scout Rifle Club offers small-bore under “Guest Day” arrangements and the clubs’ Guest Day Registration Form must be completed for each entrant.',
    'Entrants in Class B aged over 18 shall shoot for “Honours Only”; i.e. they shall not be entitled to win any medal or trophy. Class B shall be shot with the rifle rested and assessed by group size. No sighting shots or spotting scopes shall be permitted in Class B',
    'Competitors will shoot two five-shot groups at 25 yards within one 15-minute detail. All equipment supplied. Medals will be awarded to the top three competitors aged under 18, assessed by the smallest 5-shot group.',
  ],
  slots: 1,
  cost: 9.5,
  excludes: 'smallbore',
};

export const smallBore: ShootingEvent = {
  id: 'smallbore',
  title: 'Small bore - Class A or X',
  summary: '',
  description: [],
  slots: 1,
  cost: 11.5,
  excludes: 'beginnerssmallbore',
};

export const beginnersTargetSprint: ShootingEvent = {
  id: 'beginnerstargetsprint',
  title: 'Beginners target sprint experience',
  summary: '',
  description: [
    'Target Sprint combines running with target shooting. Run 400m, shoot down 5 targets, run another 400m, shoot down 5 targets, run a final 400m. Quickest time wins.',
    'There will be three Classes: A, B and X, and two age Groups: Junior (under 14) & Senior (Age 14 and over).',
    'Juniors may elect to shoot prone without a sling or may stand unsupported but must use the same shooting position throughout. Seniors will shoot standing unsupported.',
    'Class A and B use provided rifles to ensure fairness and equity. Class X will use own rifles compliant to ISSF/Sporter rules.',
    'Class A and X will use the ISSF standard targets (discs behind a 35 mm diameter hole). Class B will use the 45mm diameter free standing targets. In all other respects the format of the event will be the same.],',
  ],
  slots: 1,
  cost: 5,
  excludes: 'targetsprint',
};

export const targetSprint: ShootingEvent = {
  id: 'targetsprint',
  title: 'Target sprint - Class A or X',
  summary: '',
  description: [
    'Target Sprint combines running with target shooting. Run 400m, shoot down 5 targets, run another 400m, shoot down 5 targets, run a final 400m. Quickest time wins.',
    'There will be three Classes: A, B and X, and two age Groups: Junior (under 14) & Senior (Age 14 and over).',
    'Juniors may elect to shoot prone without a sling or may stand unsupported but must use the same shooting position throughout. Seniors will shoot standing unsupported.',
    'Class A and B use provided rifles to ensure fairness and equity. Class X will use own rifles compliant to ISSF/Sporter rules.',
    'Class A and X will use the ISSF standard targets (discs behind a 35 mm diameter hole). Class B will use the 45mm diameter free standing targets. In all other respects the format of the event will be the same.],',
  ],
  slots: 1,
  cost: 5,
  excludes: 'beginnerstargetsprint',
};

export const turningTarget: ShootingEvent = {
  id: 'turningTarget',
  title: 'Turning target - 30 shot live fire',
  summary: '',
  description: [
    "Turning target action is fast-paced, dynamic shooting using .22 semi-automatic scoped rifles or .38 special underlever 'cowboy' rifles.",
    "Shooters will need a sharp eye and fast reactions to achieve the best score over the timed trials. It's great fun and skilful.",
    '\nAge 14 and over:',
    '• .38 special underlever',
    '• 15 shots over three rapid-fire target exposures',
    '• Standing',
    '\nOver 12, Under 14:',
    '• Semi-automatic .22 scoped rifle',
    '• 30 shots over three rapid-fire target exposures',
    '• Hand-held, bench rested',
  ],
  slots: 1,
  cost: 14.5,
};

export const advancedFieldTarget: ShootingEvent = {
  id: 'advancedfieldtarget',
  title: 'Advanced field target',
  summary: '',
  description: [],
  slots: 2,
  cost: 5,
};

export const threePositionOpen: ShootingEvent = {
  id: '3popen',
  title: 'Three position rifle - Open',
  summary: '',
  description: [],
  slots: 2,
  cost: 12,
};

export const threePositionSporter: ShootingEvent = {
  id: '3psporter',
  title: 'Three position rifle - Sporter',
  summary: '',
  description: [],
  slots: 2,
  cost: 12,
};

export const MainEvents = [knockout, airRifle6yd, airPistol6yd, fieldTarget];
export const MainEventIds = MainEvents.map((event) => event.id);
export const OptionalEventsRifleSupplied = [
  turningTarget,
  beginnersSmallBore,
  smallBore,
  beginnersTargetSprint,
  targetSprint,
];
export const OptionalEventsOwnRifle = [
  ownRifle6yd,
  ownRifle10mOpen,
  ownRifle10mSporter,
  ownPistol,
  vintageRifle,
  advancedFieldTarget,
  threePositionOpen,
  threePositionSporter,
];
export const AllEvents = [
  ...MainEvents,
  ...OptionalEventsRifleSupplied,
  ...OptionalEventsOwnRifle,
];

function buildCategorisedEvents(): Map<string, ShootingEvent[]> {
  const categorisedEvents = new Map<string, ShootingEvent[]>();
  categorisedEvents.set(
    'Main Competition - Rifles and pistols supplied',
    MainEvents
  );
  categorisedEvents.set(
    'Optional Disciplines - Rifles supplied',
    OptionalEventsRifleSupplied
  );
  categorisedEvents.set(
    'Optional Disciplines - For those with their own guns',
    OptionalEventsOwnRifle
  );
  return categorisedEvents;
}
export const AllEventsInCategories = buildCategorisedEvents();
