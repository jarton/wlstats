import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'lifter',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
			const Lifter = require('./containers/LifterContainer').default
      const reducer = require('./modules/lifter').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'Lifter', reducer })

      /*  Return getComponent   */
      cb(null, Lifter)

    /* Webpack named bundle   */
    }, 'lifter')
  }
})
