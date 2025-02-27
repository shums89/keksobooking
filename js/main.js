import { switchFormState } from './form.js';
import { loadMap, switchMapState } from './map.js';

switchMapState(false);
switchFormState(false);

loadMap();
