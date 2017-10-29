import rest from 'rest';
import mime from 'rest/interceptor/mime';
import { getQueryString } from '../utils';

const client = rest.wrap(mime, { mime: 'application/json' });
const waitASec = () => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve({});
    }, 1000);
  });
};

export const check = () => {
  const host = getQueryString('host');
  const port = getQueryString('port');

  client({ path: `http://${host}:${port}` });
};
export const servos = servos => {
  const host = getQueryString('host');
  const port = getQueryString('port');

  return host && port
    ? client({ path: `http://${host}:${port}`, entity: { servos } })
    : waitASec();
};
