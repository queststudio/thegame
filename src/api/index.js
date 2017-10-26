import rest from 'rest';
import mime from 'rest/interceptor/mime';
import { HOST } from '../constants';

const client = rest.wrap(mime, { mime: 'application/json' });

export const check = () => client({ path: HOST });
export const servos = servos => client({ path: HOST, entity: { servos } });
