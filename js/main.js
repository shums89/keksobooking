import { renderAnnouncements } from './announcement.js';
import { createAnnouncements } from './data.js';
import { switchMapState } from './map.js';
import { getRandomArrayElement } from './util.js';
import './form.js';

const announcements = createAnnouncements();

renderAnnouncements(getRandomArrayElement(announcements));

switchMapState(true);

