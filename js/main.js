import { switchFormState } from './form.js';
import { loadMap, switchMapState } from './map.js';
import './preview.js';

switchMapState(false);
switchFormState(false);

loadMap();
