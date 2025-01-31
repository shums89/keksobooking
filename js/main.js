import { renderAnnouncements } from './announcement.js';
import { createAnnouncements } from './data.js';
import { getRandomPositiveInteger } from './util.js';

const announcements = createAnnouncements();

renderAnnouncements(announcements[getRandomPositiveInteger(0, announcements.length - 1)]);

