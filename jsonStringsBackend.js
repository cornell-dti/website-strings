import StringsBackend from './stringsBackend';

import HomeJSON from './home.json';
import AssetsJSON from './assets.json';

const DEFAULT_CONTEXT = 'default';

const searchKey = function(key, json) {
  let val = json[key];

  let path = '';

  let replacements = [];

  if (typeof val === 'undefined' || val === null) {
    let keys = key.split('.');

    let currentChild = json;

    for (let childKey of keys) {
      if (
        typeof currentChild[childKey] === 'undefined' ||
        currentChild[childKey] === null
      ) {
        if (typeof currentChild['*'] !== 'undefined') {
          path += `/${childKey}`;
          replacements.push(childKey);
          currentChild = currentChild['*'];

          continue;
        } else {
          currentChild = null;
          path = null;
          break;
        }
      }

      path += `/${childKey}`;
      currentChild = currentChild[childKey];
    }

    if (typeof currentChild !== 'undefined' && currentChild !== null) {
      val = currentChild;
    }
  } else {
    path = `/${key.split('.').join('/')}/`; //todo
  }

  let replacementIndex = 1;
  let newStr = val.replace(
    `$${replacementIndex}$`,
    replacements[replacementIndex - 1]
  );

  replacementIndex++;

  while (val !== newStr) {
    val = newStr;

    newStr = val.replace(
      `$${replacementIndex}$`,
      replacements[replacementIndex - 1]
    );

    replacementIndex++;
  }

  if (path !== null && val.startsWith('~')) {
    val = `${path}${val.substring(1)}`;
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
