import StringsBackend from './stringsBackend';

export default class StringsFrontend {
  constructor(backend) {
    if (typeof backend === 'undefined' || backend === null) {
      throw new Error(
        'Undefined or null passed for backend to a StringsFrontend instance.'
      );
    }

    if (backend instanceof StringsBackend) {
      this.backend = backend;
    } else {
      throw new Error('Backend passed is not an instance of StringsBackend');
    }
  }

  get(key, context) {
    return this.backend.getString(key, context);
  }

  exists(key, context) {
    return this.backend.exists(key, context);
  }

  childrenOf(key, context) {
    return this.backend.getChildrenKeysFor(key, context);
  }
}
