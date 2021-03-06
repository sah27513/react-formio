import * as constants from './constants';
import actions from './actions';
import reducers from './reducers';
import routes from './routes';
import selectors from './selectors';

export default class {
  constants = constants;

  constructor(config) {
    const defaultConfig = {
      parents: [],
      rootSelector: state => state
    };

    this.config = Object.assign(defaultConfig, config);

    this.actions = actions(this);
    this.selectors = selectors(this.config);
    this.reducers = reducers(this.config);
    this.getRoutes = (childRoutes) => routes(this.config, childRoutes);
  }

  getBasePath(params) {
    let path = '/';

    this.config.parents.forEach(parent => {
      path += parent + '/' + params[parent + 'Id'] + '/';
    });

    return path;
  }
}
