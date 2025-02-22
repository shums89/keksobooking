import { switchFormState } from './form.js';
import { createMap, switchMapState } from './map.js';

switchMapState(false);
switchFormState(false);

createMap();
