import { getData } from './api.js';
import { switchFormState } from './form.js';
import { createMap, loadMockData, switchMapState } from './map.js';

switchMapState(false);
switchFormState(false);

getData(createMap, loadMockData);
