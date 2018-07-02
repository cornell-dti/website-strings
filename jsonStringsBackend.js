import StringsBackend from './stringsBackend';

import HomeJSON from './home.json';

const DEFAULT_CONTEXT = 'default';

export default class JSONStringsBackend extends StringsBackend {
  getDefaultContext() {
    return DEFAULT_CONTEXT;
  }

  _getString(key, context) {
    switch (context) {
      case DEFAULT_CONTEXT:
      case 'home':
        return HomeJSON[key];
      default:
        return null;
    }
  }
}
