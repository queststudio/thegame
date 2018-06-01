import rest from 'rest'
import mime from 'rest/interceptor/mime'

const client = rest.wrap(mime, { mime: 'application/json' })
const waitASec = () => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve({})
    }, 1000)
  })
}

export const check = () => {
  client({ path: `/api` })
}
export const servos = servos => {
  return client({ path: `/api`, entity: { servos } })
}
