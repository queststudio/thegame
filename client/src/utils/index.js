import { saveAs } from 'file-saver'
import { readAsText } from 'promise-file-reader'

export const downloadAsJson = subj => {
  const json = JSON.stringify(subj)
  const blob = new Blob([json], { type: 'application/json' })

  saveAs(blob, 'save')
}

export async function loadJson(file) {
  if (file.name.endsWith('.json')) {
    return readAsText(file).then(content => JSON.parse(content))
  }
  return Promise.reject(new Error('File type is not json'))
}

export const guid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getQueryString = (field, url) => {
  var href = url ? url : window.location.href
  var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i')
  var string = reg.exec(href)
  return string ? string[1] : null
}
