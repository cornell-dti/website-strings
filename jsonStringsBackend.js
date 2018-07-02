import StringsBackend from './stringsBackend';

import HomeJSON from './home.json';
import AssetsJSON from './assets.json';

const DEFAULT_CONTEXT = 'default';

const searchKey = function(key, json) {
  let val = json[key];

  if (typeof val === 'undefined' || val === null) {
    let keys = key.split('.');

    let currentChild = json;

    for (let childKey of keys) {
      if (
        typeof currentChild[childKey] === 'undefined' ||
        currentChild[childKey] === null
      ) {
        currentChild = null;
        break;
      }
      currentChild = currentChild[childKey];
    }

    if (typeof currentChild !== 'undefined' && currentChild !== null) {
      val = currentChild;
    }
  }

  return val;
};

export default class JSONStringsBackend extends StringsBackend {
  getDefaultContext() {
    return DEFAULT_CONTEXT;
  }

  _getString(key, context) {
    switch (context) {
      case DEFAULT_CONTEXT:
      case 'home':
        return searchKey(key, HomeJSON);
      case 'assets':
        // TODO should we error out if null?
        return `/static/${searchKey(key, AssetsJSON)}`;
      default:
        return null;
    }
  }
}
