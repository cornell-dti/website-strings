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

  get(key, context = this.backend.getDefaultContext()) {
    return this.backend.getString(key, context);
  }
}
