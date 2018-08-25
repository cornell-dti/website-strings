import StringsBackend from './stringsBackend';

import HomeJSON from './home.json';
import AssetsJSON from './assets.json';
import ApplyJSON from './apply.json';
import InitiativesJSON from './initiatives.json';
import TeamJSON from './team.json';
import ProjectsJSON from './projects.json';
import SponsorJSON from './projects.json';

const DEFAULT_CONTEXT = 'default';

const searchKey = function (key, json) {
  let val = json[key];

  let path = '';

  const replacements = [];

  if (typeof val === 'undefined' || val === null) {
    const keys = key.split('.');

    let currentChild = json;

    for (const childKey of keys) {
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
    path = `/${key.split('.').join('/')}/`; // todo
  }

  if (typeof val === 'string') {
    if (path !== null && val.startsWith('~')) {
      val = `${path}${val.substring(1)}`;
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
  } else if (typeof val === 'object') {
    val = Object.keys(val);
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
      case 'apply':
        return searchKey(key, ApplyJSON);
      case 'projects':
        return searchKey(key, ProjectsJSON);
      case 'initiatives':
        return searchKey(key, InitiativesJSON);
      case 'team':
        return searchKey(key, TeamJSON);
      case 'sponsor':
        return searchKey(key, SponsorJSON);
      default:
        return null;
    }
  }

  _exists(key, context) {
    const str = this._getString(key, context);
    return typeof str !== 'undefined' && str !== null;
  }

  _getChildrenKeysFor(key, context) {
    switch (context) {
      case DEFAULT_CONTEXT:
      case 'home':
        return searchKey(key, HomeJSON);
      case 'assets':
        // TODO should we error out if null?
        return searchKey(key, AssetsJSON);
      case 'apply':
        return searchKey(key, ApplyJSON);
      default:
        return null;
    }
  }
}
