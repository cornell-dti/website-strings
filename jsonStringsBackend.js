import StringsBackend from './stringsBackend';

import Home from './home.json';

const DEFAULT_CONTEXT = 'default';

export default class JSONStringsBackend extends StringsBackend {
  constructor() {
    super(DEFAULT_CONTEXT);
  }

  _getString(key, context) {
    switch (context) {
      case DEFAULT_CONTEXT:
      case 'home':
        return Home[key];
      default:
        return null;
    }
  }
}
