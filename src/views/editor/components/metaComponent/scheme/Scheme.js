const schemes = require.context('./', true, /.js$/)
const _exports = {}
schemes.keys().forEach(key => {
  let moudelName = key.replace(/(\.\/|\.js)/g, '')
  moudelName = moudelName.replace(moudelName[0], moudelName[0].toUpperCase())
  if(moudelName != 'Scheme') {
    const object = schemes(key).default
    Object.keys(object).forEach(objKey => {
      _exports[objKey] = object[objKey]
    })
  }
})

Object.assign(exports, _exports)