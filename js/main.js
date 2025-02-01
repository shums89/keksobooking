import { renderAnnouncements } from './announcement.js';
import { createAnnouncements } from './data.js';
import { switchFormState } from './form.js';
import { switchMapState } from './map.js';
import { getRandomArrayElement } from './util.js';

const announcements = createAnnouncements();

renderAnnouncements(getRandomArrayElement(announcements));

switchMapState(true);
switchFormState(true);

