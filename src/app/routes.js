import { routes as clients } from './clients';
import { routes as contracts } from './contracts';
import { routes as cars } from './objectsOfEvaluation/cars';
import { routes as flats } from './objectsOfEvaluation/flats';

export default [ ...clients, ...contracts, ...cars, ...flats ];
