import vParsemd from './parsemd'

export default {
  install(app) {
    app.directive('parsemd', vParsemd)
  },
}
