import { renderAnnouncements } from './announcement.js';
import { createAnnouncements } from './data.js';
import { switchFormState } from './form.js';
import { createMap, switchMapState } from './map.js';
import { getRandomArrayElement } from './util.js';

const announcements = createAnnouncements();

// renderAnnouncements(getRandomArrayElement(announcements));

switchMapState(false);
switchFormState(false);

createMap();

